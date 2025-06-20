from langchain_community.chat_models import ChatOpenAI 
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
from dotenv import load_dotenv
import concurrent.futures
from django.conf import settings
import logging

# Configure logging
logger = logging.getLogger(__name__)

load_dotenv()

PROMPT_TEMPLATE = """You are an expert legal assistant specializing in Liberian law.Use the following pieces of context from Liberian legal documents to answer the question. If you don't know the answer, say that you don't know and suggest consulting a qualified legal professional in Liberia.

Context: {context}

Question: {question}

Answer in a clear, professional manner, citing specific laws or documents when possible."""

class ChatView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.vector_store = None
        logger.info("ChatView initialized")
        self.setup_vectorstore()
        
    def setup_vectorstore(self):
        """Initialize the vector store with PDF documents"""
        try:
            logger.info("Starting vector store setup...")
            # Initialize embeddings with specific model
            embeddings = HuggingFaceEmbeddings(
                model_name="sentence-transformers/all-mpnet-base-v2",
                model_kwargs={'device': 'cpu'}
            )
            
            # Load PDF documents from a designated folder
            pdf_folder = os.path.join(settings.BASE_DIR, 'documents')
            logger.info(f"Looking for PDFs in: {pdf_folder}")
            documents = []
            
            # Create documents directory if it doesn't exist
            os.makedirs(pdf_folder, exist_ok=True)
            
            # Load all PDFs in the documents folder
            for filename in os.listdir(pdf_folder):
                if filename.endswith('.pdf'):
                    pdf_path = os.path.join(pdf_folder, filename)
                    logger.info(f"Loading PDF: {pdf_path}")
                    loader = PyPDFLoader(pdf_path)
                    documents.extend(loader.load())
            
            logger.info(f"Found {len(documents)} documents")
            
            if not documents:
                logger.error("No documents were loaded!")
                raise Exception("No documents found in the documents folder")
            
            # Split documents into chunks
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=200,
                separators=["\n\n", "\n", ". ", " ", ""]
            )
            splits = text_splitter.split_documents(documents)
            logger.info(f"Created {len(splits)} text chunks")
            
            # Create vector store
            logger.info("Creating vector store...")
            self.vector_store = Chroma.from_documents(
                documents=splits,
                embedding=embeddings,
                persist_directory="chroma_db"
            )
            logger.info("Vector store setup complete!")
            
        except Exception as e:
            logger.error(f"Error setting up vector store: {str(e)}", exc_info=True)
            raise

    def post(self, request):
        """Handle incoming chat requests with RAG"""
        if not request.data.get('question'):
            return Response(
                {'error': 'Question is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            # Initialize ChatOpenAI
            chat = ChatOpenAI(
                temperature=0.3,
                model_name="gpt-3.5-turbo",
                request_timeout=55,
            )
            
            if not self.vector_store:
                logger.error("Vector store not initialized")
                return Response(
                    {'error': 'Vector store not initialized'}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            # Create QA chain with custom prompt
            prompt = PromptTemplate(
                template=PROMPT_TEMPLATE,
                input_variables=["context", "question"]
            )
            
            qa_chain = RetrievalQA.from_chain_type(
                llm=chat,
                chain_type="stuff",
                retriever=self.vector_store.as_retriever(
                    search_kwargs={"k": 4}
                ),
                chain_type_kwargs={
                    "prompt": prompt,
                    "verbose": True
                }
            )
            
            # Use ThreadPoolExecutor to handle timeouts
            with concurrent.futures.ThreadPoolExecutor() as executor:
                future = executor.submit(
                    self._get_qa_response, 
                    qa_chain, 
                    request.data['question']
                )
                try:
                    response_content = future.result(timeout=55)
                    return Response({
                        'response': response_content
                    })
                except concurrent.futures.TimeoutError:
                    logger.error("Request timed out")
                    return Response(
                        {'error': 'Request timed out. Please try a shorter question.'}, 
                        status=status.HTTP_408_REQUEST_TIMEOUT
                    )
                
        except Exception as e:
            logger.error(f"Error processing request: {str(e)}", exc_info=True)
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def _get_qa_response(self, qa_chain, question):
        """Helper method to get QA response"""
        try:
            logger.info(f"Processing question: {question}")
            response = qa_chain.run(question)
            logger.info("Response generated successfully")
            return response
        except Exception as e:
            logger.error(f"Error generating response: {str(e)}", exc_info=True)
            raise
