import React from "react";
import { SiAnalogue } from "react-icons/si";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-4 shadow-sm">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0 text-center">
            <a
              href="#"
              className="d-flex align-items-center justify-content-center text-decoration-none text-dark"
            >
              <SiAnalogue className="me-2 text-info fs-4" />
              <span className="fw-bold fs-5">Job Application Tracker</span>
            </a>
            <p className="mt-3 text-muted">
              Keep track of your applications in one place and never miss an
              opportunity.
            </p>
          </div>
          <div className="col-lg-6 col-md-12 text-center">
            <ul className="list-unstyled d-flex justify-content-center mb-3">
              <li className="mx-3">
                <a
                  href="#"
                  className="text-decoration-none text-dark footer-link"
                >
                  About
                </a>
              </li>
              <li className="mx-3">
                <a
                  href="https://github.com/singhkumaraman/Job-Tracker"
                  className="text-decoration-none text-dark footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contribute
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3 bg-dark text-light">
        © {new Date().getFullYear()}{" "}
        <a href="#" className="text-light text-decoration-none">
          Job Application Tracker™
        </a>
      </div>

      <style>
        {`
          .footer-link {
            transition: color 0.3s ease-in-out;
          }
          .footer-link:hover {
            color: #17a2b8 !important;
          }
          footer {
            background-color: #f8f9fa;
          }
          footer .text-muted {
            color: #6c757d;
          }
          footer .text-dark {
            color: #343a40 !important;
          }
          footer .bg-dark {
            background-color: #343a40 !important;
          }
          footer .text-light {
            color: #f8f9fa !important;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
