// footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container-xl">
        <div className="footer-inner">
          <div className="row d-flex align-items-center gy-4">
            {/* copyright text */}
            <div className="col-md-4">
              <span className="copyright">© 2024 Group 3.</span>
            </div>

            {/* social icons */}
            <div className="col-md-4 text-center">
              <ul className="social-icons list-unstyled list-inline mb-0">
                <li className="list-inline-item"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="fab fa-twitter"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="fab fa-instagram"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="fab fa-pinterest"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="fab fa-medium"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="fab fa-youtube"></i></a></li>
              </ul>
            </div>

            {/* go to top button */}
            <div className="col-md-4">
              <a href="#" id="return-to-top" className="float-md-end"><i className="icon-arrow-up"></i>Back to Top</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
