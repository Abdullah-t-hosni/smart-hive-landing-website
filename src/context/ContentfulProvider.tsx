import React, { createContext, useContext, useEffect, useState } from "react";
import {getEntries, processContentfulData} from "../services/contentfulService.ts";

const ContentContext = createContext<any>(null);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    const [content, setContent] = useState<any>(null);
    const fetchContent = async () => {
        const response = await getEntries('websiteContent');
        const contentfulData = processContentfulData(response);
        setContent(contentfulData);
    }
    useEffect(() => {
        fetchContent();
    }, []);

    return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
};

export const useContent = () => {
    return useContext(ContentContext);
};

