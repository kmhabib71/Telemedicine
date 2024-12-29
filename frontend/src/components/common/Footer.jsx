const Footer = () => (
    <footer className="bg-blue-800 text-white py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        <div>
          <h3 className="font-bold text-lg">DocTime</h3>
          <p className="mt-4">
            The #1 healthcare service provider in Bangladesh with over 1 million users.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#about" className="hover:underline">About Us</a></li>
            <li><a href="#faq" className="hover:underline">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg">Contact Us</h3>
          <p className="mt-4">Phone: +880123456789</p>
          <p>Email: support@doctime.com.bd</p>
        </div>
      </div>
    </footer>
  );
  
  export default Footer;
  