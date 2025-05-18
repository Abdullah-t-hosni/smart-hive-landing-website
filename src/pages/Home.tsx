import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";
import {useContent} from "../context/ContentfulProvider.tsx";
import {HomeIntroSection} from "../components/HomeIntroSection.tsx";
import {HomeFeaturesSection} from "../components/HomeFeaturesSection.tsx";
import {HomeProcessSection} from "../components/HomeProcessSection.tsx";
import {HomeSpecializedSection} from "../components/HomeSpecializedSection.tsx";
import {HomeClientsSection} from "../components/HomeClientsSection.tsx";
import {HomeFAQSection} from "../components/HomeFAQSection.tsx";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";

export function Home() {
    const location = useLocation();
    const content = useContent();
    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    if (!content) return <p>Loading...</p>;

    const homeData = content.homePage;

    return (
        <>
            <NavBar/>
            <HomeIntroSection content={homeData.introSection}/>
            <HomeFeaturesSection content={homeData.featuresSection}/>
            <HomeProcessSection content={homeData.processSection}/>
            <HomeSpecializedSection content={homeData.specializedSection}/>
            <HomeClientsSection content={homeData.clientsSection}/>
            <HomeFAQSection content={homeData.FAQSection}/>
            <Footer/>
        </>
    );
}
