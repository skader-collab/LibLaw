const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About LibLaw</h1>
        
        <section className="prose lg:prose-lg">
          <p className="text-lg text-gray-600 mb-6">
            LibLaw is your trusted AI-powered legal assistant, designed to make legal information
            accessible to everyone. We bridge the gap between complex legal concepts and everyday
            understanding.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We believe that everyone should have access to legal information and understanding.
            Our mission is to democratize legal knowledge by providing accurate, easy-to-understand
            legal information through innovative AI technology.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">How It Works</h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <ol className="list-decimal list-inside space-y-4 text-gray-600">
              <li>Ask your legal question in plain English</li>
              <li>Our AI analyzes your query and relevant legal information</li>
              <li>Receive a clear, understandable response</li>
              <li>Get suggestions for further reading and resources</li>
            </ol>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Important Note</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
            <p className="text-yellow-800">
              While LibLaw provides valuable legal information, it should not be considered as
              legal advice. For specific legal issues, we recommend consulting with a qualified
              legal professional.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-2">
            Have questions or feedback? We'd love to hear from you.
          </p>
          <p className="text-gray-600">
            Email: <a href="mailto:contact@liblaw.com" className="text-primary hover:underline">
              contact@liblaw.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
