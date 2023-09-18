import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
/*import "../styles/FooterBar.css";*/

function FooterBar() {
  return (
    <div className="footer-dark">
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-3 item">
              <h3>Contact du coordonateur des stages</h3>
              <ul>
                <li>Sylvain Lebranche</li>
                <li>
                  <a href="mailto:sylvain.labranche@cmontmorency.qc.ca">
                    sylvain.labranche@cmontmorency.qc.ca
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="copyright">Équipe 05 © 2023/09/11</p>
        </div>
      </footer>
    </div>
  );
}

export default FooterBar;