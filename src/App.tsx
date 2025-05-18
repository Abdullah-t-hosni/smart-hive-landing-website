import './App.css'
import {Home} from "./pages/Home.tsx";
import {About} from "./pages/About.tsx";
import {Contact} from "./pages/Contact.tsx";
import {ContentProvider} from "./context/ContentfulProvider.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoadingProvider } from './context/LoadingContext';

function App() {
    return (
        <ContentProvider>
            <Router>
                <LoadingProvider>
                    <div className="app-container">
                        <Routes>
                            <Route path="/" element={<Home />}/>
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </div>
                </LoadingProvider>
            </Router>
        </ContentProvider>
    );
}

export default App
