const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content p-10">
      <aside>
      <div className='w-36 h-36'>
						<img
							className='w-full h-full object-cover'
							src='/logo.webp'
							alt='Logo'
						/>
				</div>
    <p>
    © 2025 University eTutoring System. All rights reserved.
      <br />
      
    </p>
  </aside>
  <nav>
    <h3 className="footer-title">About us</h3>
      <a>Nguyen Hoai Phong</a>
      <a>Nguyen Quoc Phong</a>
      <a>Nguyen Quoc Thong</a>
      <a>Nguyen Quoc Vuong</a>
      <a>Danh The Nghi</a>
  </nav>
  <nav>
    <h3  className="footer-title">Address</h3>
    <a>Greenwich University</a>
    <a>Can Tho Campus</a>
    <a>Can Tho City, Viet Nam</a>
  </nav>
    </footer>
  );
};

export default Footer;