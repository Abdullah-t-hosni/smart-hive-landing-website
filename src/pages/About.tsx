import React, { useEffect, useState } from 'react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useContent } from "../context/ContentfulProvider";
import { ValueItem } from "../components/about/ValueItem";
import { BenefitCard } from "../components/about/BenefitCard";
import { ScrollAnimation } from "../components/about/ScrollAnimation";
import { AboutPageData } from "../types/about";
import "../styles/aboutPage.css";

export function About() {
  const content = useContent();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const images = document.querySelectorAll('img');
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setImagesLoaded(true);
      }
    };

    images.forEach(img => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad);
        img.addEventListener('error', handleImageLoad);
      }
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, [content]);

  if (!content) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const aboutData = content.aboutPage as AboutPageData;

  return (
    <>
      <NavBar />
      <ScrollAnimation animation="fade-in">
        {aboutData.introSection && (
          <section className="about-intro-section container" aria-labelledby="intro-title">
            <div className="about-intro-content">
              <h4 id="intro-title">{aboutData.introSection.title}</h4>
              <h1>{aboutData.introSection.subtitle}</h1>
              <p className="description">{aboutData.introSection.description}</p>
            </div>
            <div className="about-intro-image">
              <img
                src={aboutData.introSection.image}
                alt={aboutData.introSection.title}
                loading="lazy"
                className={imagesLoaded ? 'loaded' : ''}
              />
            </div>
          </section>
        )}
      </ScrollAnimation>

      <ScrollAnimation animation="fade-up" delay={200}>
        {aboutData.missionVisionSection && (
          <section className="mission-section" aria-labelledby="mission-title">
            <div className="mission-container container">
              <h1 id="mission-title">{aboutData.missionVisionSection.title}</h1>
              <p>{aboutData.missionVisionSection.description}</p>
              {aboutData.missionVisionSection.subSections.map((item, index) => (
                <ScrollAnimation key={index} animation="slide-in" delay={index * 200}>
                  <div
                    className={index === 0 ? "mission-item" : "mission-item reverse"}
                  >
                    <div className="mission-item-img-container">
                      <div className="mission-img">
                        <img 
                          src={item.image} 
                          alt={`Mission vision section ${index + 1}`}
                          loading="lazy"
                          className={imagesLoaded ? 'loaded' : ''}
                        />
                      </div>
                    </div>
                    <div className="text-box">
                      <p>{item.description}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </section>
        )}
      </ScrollAnimation>

      <ScrollAnimation animation="fade-up" delay={400}>
        {aboutData.valuesSection && (
          <section className="values-section" aria-labelledby="values-title">
            <div className="container">
              <h1 id="values-title">{aboutData.valuesSection.title}</h1>
              <p>{aboutData.valuesSection.description}</p>
              <div className="values">
                {aboutData.valuesSection.values.map((item, index) => (
                  <ScrollAnimation key={index} animation="fade-in" delay={index * 100}>
                    <ValueItem item={item} />
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </section>
        )}
      </ScrollAnimation>

      <ScrollAnimation animation="fade-up" delay={600}>
        {aboutData.benefitsSection && (
          <section className="benefits container" aria-labelledby="benefits-title">
            <h2 id="benefits-title">{aboutData.benefitsSection.title}</h2>
            <p>{aboutData.benefitsSection.description}</p>
            <div className="benefits-grid">
              {aboutData.benefitsSection.benefits.map((item, index) => (
                <ScrollAnimation key={index} animation="fade-in" delay={index * 100}>
                  <BenefitCard item={item} />
                </ScrollAnimation>
              ))}
            </div>
          </section>
        )}
      </ScrollAnimation>
      <Footer />
    </>
  );
}
