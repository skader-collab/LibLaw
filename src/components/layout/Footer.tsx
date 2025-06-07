const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">LibLaw</h3>
            <p className="text-gray-600">
              Making legal advice accessible to everyone.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-primary">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="text-gray-600 hover:text-primary">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="mailto:info@liblaw.com" className="text-gray-600 hover:text-primary">
                  info@liblaw.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">© {new Date().getFullYear()} LibLaw. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
