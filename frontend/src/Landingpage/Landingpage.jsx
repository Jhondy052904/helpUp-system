import React from "react";
import "./Landingpage.css";
import DonationCard from "../components/DonationCard";

function Landingpage() {
  return (
    <div className="landing-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <h2 style={{color:'#f7f5f5'}} className="app-name">HelpUp</h2>
        </div>
        <div className="nav-center">
          <a href="#drive">Drive</a>
          <a href="#contact">Contact us</a>
          <a href="#about">About us</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Help<span>Up</span>
          </h1>
          <p>
            HelpUp is an all-in-one donation drive management system designed to connect people who care with causes that matter. Our platform empowers organizations, schools, and communities to organize, promote, and manage donation drives with ease — whether it’s for clothes, food, school supplies, or disaster relief.
          </p>
          <div className="nav-right">
            <br></br>
          <button className="register-btn">Register</button>
          <button className="donate-btn">Donate →</button>
        </div>
        </div>
        
        <div className="hero-cards">
          {[...Array(5)].map((_, index) => (
            <div className="hero-card-wrapper" key={index}>
              <DonationCard
                price="₱300/mdn"
                orgName="Organization Name"
                donationName="DONATION NAME"
                desc="Donation description"
                image={index % 2 === 0 ? "/images/fire_img2.JPG.jpg" : "/images/fireimage.jpg"}
              />
            </div>
          ))}
        </div>

      </section>

      {/* SUPPORT SECTION */}
      <section className="support">
        <h2>SEND YOUR DONATIONS</h2>
        <div className="support-grid">
          {[...Array(8)].map((_, index) => (
            <DonationCard
              key={index}
              price="₱300/mdn"
              orgName="Organization Name"
              donationName="DONATION NAME"
              desc="Donation description"
              image={index % 2 === 0 ? "/images/fire_img2.JPG.jpg" : "/images/fireimage.jpg"}
            />
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about">
        <div className="about-content">
          <div className="about-text">
            <h3>About Us</h3>
            <p>
              HelpUp is a digital platform built to empower communities, schools, and organizations to create meaningful change. We make it easy to start, manage, and promote donation drives — whether they're for disaster relief, education, food aid, or community development.
            </p>
            <p>
              Our mission is simple: to connect people who care with causes that matter. By providing an organized, transparent, and efficient donation management system, HelpUp ensures that every contribution goes where it's needed most — helping communities rise, together.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Donation Drives</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Lives Impacted</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Partner Organizations</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CONTACT SECTION */}
      <section id="contact" className="contact">
        <h3>Contact Us</h3>
        <div className="contact-content">
          <div className="contact-info">
            <p>
              Have questions, suggestions, or need help setting up your donation drive? We’d love to hear from you!
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Email:</strong> support@helpup.org
              </div>
              <div className="contact-item">
                <strong>Phone:</strong> +63 912 345 6789
              </div>
              <div className="contact-item">
                <strong>Address:</strong> 123 Unity Street, Quezon City, Philippines
              </div>
            </div>
            <p>
              You can also reach out to us through our social media pages for updates, partnerships, and community stories.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
          <div className="contact-form">
            <form className="contact-form-element">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="contact-submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer>
        <p>© 2025 HelpUp. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landingpage;
