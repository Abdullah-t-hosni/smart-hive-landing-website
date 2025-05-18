import React, { useState, useEffect } from "react";
import {useContent} from "../context/ContentfulProvider.tsx";
import {Link} from "react-router-dom";

const Footer: React.FC = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const content = useContent();
    
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!content) return <p>Loading...</p>;
    const footerContent = content.footer;
    
    return (
        <footer className="modern-footer">
            <button 
                className={`back-to-top ${showBackToTop ? 'show' : ''}`}
                onClick={scrollToTop}
                aria-label="Back to top"
            >
                <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M18 15L12 9L6 15" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <div className="footer-content container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <img src={footerContent.logo} alt="Smarthive Logo" className="footer-logo"/>
                        <p className="brand-description">Empowering businesses with innovative solutions</p>
                    </div>
                    
                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul className="nav-footer">
                            {footerContent.navigationLinks.map((link: string, index: number) => (
                                <li key={index}>
                                    <Link 
                                        to={index === 0 ? "/" : index === 1 ? "/about" : "/contact"} 
                                        aria-label={link}
                                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h3>Contact Us</h3>
                        <div className="contact-info">
                            {footerContent.contactInfo.map((item: any, index: number) => (
                                <span key={index} className="contact-item">
                                    <img src={item.image} alt={item.name} width="24" height="24"/>
                                    <span>{item.value}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="social-links">
                        {footerContent.socialMedia.map((item: any, index: number) => (
                            <a 
                                href={item.value} 
                                key={index}
                                className="social-icon"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={item.name}
                            >
                                <img src={item.image} alt={item.name} width="24" height="24"/>
                            </a>
                        ))}
                    </div>
                    
                    <div className="footer-legal">
                        <p className="copyright">{footerContent.copyRight}</p>
                    
                    </div>

                    <div className="developer-credit">
                        <p> Developed by <a href="https://www.facebook.com/abdullah.t.hosni" target="_blank" rel="noopener noreferrer">Abdullah T.Hosni</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
