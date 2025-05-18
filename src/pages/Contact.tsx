import React from 'react';
import { useContent } from '../context/ContentfulProvider';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactUS';

export const Contact: React.FC = () => {
  const content  = useContent();
  if (!content || !content.homePage || !content.homePage.contactUsSection) {
    return (
      <>
        <NavBar />
        <main className="contact-page">
          <div className="container">
            <div className="contact-header">
              <h1>Contact Us</h1>
              <p>Loading contact form...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="contact-page">
        <div className="container">
          <div className="contact-header">
            <h1>Contact Us</h1>
            <p>Get in touch with us. We'd love to hear from you!</p>
          </div>
          <ContactForm content={content.homePage.contactUsSection} />
        </div>
      </main>
      <Footer />
    </>
  );
}; 
