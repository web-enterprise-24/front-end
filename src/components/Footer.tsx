const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content p-4 md:p-10 flex flex-col md:flex-row items-center md:items-start">
      {/* Left Section: Logo and Copyright */}
      <aside className="text-center md:text-left">
        <div className="w-24 h-24 md:w-36 md:h-36 mx-auto md:mx-0">
          <img
            className="w-full h-full object-cover"
            src="/logo.webp"
            alt="Logo"
          />
        </div>
        <p className="mt-4 text-sm">
          © 2025 University eTutoring System. All rights reserved.
        </p>
      </aside>

      {/* Spacer to control the gap between Logo and About Us */}
      <div className="hidden md:block md:w-40 lg:w-48"></div>

      {/* Container for About Us and Address */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-48">
        {/* Middle Section: About Us */}
        <nav className="text-center md:text-left">
          <h3 className="footer-title mb-2 text-lg font-semibold">About Us</h3>
          <a className="block hover:underline text-sm">Nguyen Hoai Phong</a>
          <a className="block hover:underline text-sm">Nguyen Quoc Phong</a>
          <a className="block hover:underline text-sm">Nguyen Quoc Thong</a>
          <a className="block hover:underline text-sm">Nguyen Quoc Vuong</a>
          <a className="block hover:underline text-sm">Danh The Nghi</a>
        </nav>

        {/* Right Section: Address */}
        <nav className="text-center md:text-left">
          <h3 className="footer-title mb-2 text-lg font-semibold">Address</h3>
          <a className="block hover:underline text-sm">Greenwich University</a>
          <a className="block hover:underline text-sm">Can Tho Campus</a>
          <a className="block hover:underline text-sm">Can Tho City, Viet Nam</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;