import {createClient} from 'contentful';
import {environment} from "../environments/environment.ts";

const client = createClient({
    space: environment.CONTENTFUL_SPACE_ID,
    accessToken: environment.CONTENTFUL_ACCESS_TOKEN,
});


export const getEntries = async (contentType: string) => {
    return await client.getEntries({
        content_type: contentType,
        include: 10,
    });
}
const resolveAsset = (id: string, list: any) => {
    return list?.Asset?.find((asset: any) => asset.sys.id === id)?.fields || {};
}

const resolveReference = (id: string, list: any) => {
    const entry = list?.Entry?.find((entry: any) => entry.sys.id === id)?.fields || {};
    if (entry && (entry.image || entry.cardImage || entry.icon)) {
        const id = entry.image?.sys?.id || entry.cardImage?.sys?.id || entry.icon?.sys?.id;
        entry.image = resolveAsset(id, list)?.file?.url;
        delete entry.cardImage;
        delete entry.icon;
    }
    return entry;
};

export const processContentfulData = (response: any) => {
    const {items, includes} = response;
    const websiteContent = items.map((item: any) => item.fields)[0];
    let data = {
        homePage: getHomePageContent(websiteContent.homePage.sys.id, includes),
        aboutPage: getAboutPageContent(websiteContent.aboutPage.sys.id, includes),
        header: resolveReference(websiteContent.header.sys.id, includes),
        footer: resolveReference(websiteContent.footer.sys.id, includes),
    }
    data.header.logo = resolveAsset(data.header.headerLogo.sys.id, includes)?.file?.url;
    data.footer = {
        ...data.footer,
        logo: resolveAsset(data.footer.logo.sys.id, includes)?.file?.url,
        contactInfo: data.footer.contactInfo.map((work: any) => resolveReference(work.sys.id, includes)),
        socialMedia: data.footer.socialMedia.map((work: any) => resolveReference(work.sys.id, includes)),
    };

    return data;
};

const getHomePageContent = (id: string, list: any) => {
    let homePageContent = resolveReference(id, list);
    const homePageSectionsIds = homePageContent.sections.map((ref: any) => ref.sys.id);
    let homePageData = {
        introSection: resolveReference(homePageSectionsIds[0], list),
        featuresSection: resolveReference(homePageSectionsIds[1], list),
        processSection: resolveReference(homePageSectionsIds[2], list),
        specializedSection: resolveReference(homePageSectionsIds[3], list),
        clientsSection: resolveReference(homePageSectionsIds[4], list),
        FAQSection: resolveReference(homePageSectionsIds[5], list),
        contactUsSection: resolveReference(homePageSectionsIds[6], list),
    }
    homePageData.featuresSection.featureItems = homePageData.featuresSection.featureItems.map((feature: any) => resolveReference(feature.sys.id, list));
    homePageData.clientsSection.clientsLogos = homePageData.clientsSection.clientsLogos.map((client: any) => resolveAsset(client.sys.id, list)?.file?.url);
    homePageData.processSection.items = homePageData.processSection.items.map((item: any) => resolveReference(item.sys.id, list));
    homePageData.specializedSection.skills = homePageData.specializedSection.skills.map((item: any) => resolveReference(item.sys.id, list));
    homePageData.FAQSection.questionsList = homePageData.FAQSection.questionsList.map((item: any) => resolveReference(item.sys.id, list));
    homePageData.contactUsSection.formFields = homePageData.contactUsSection.formFields.map((item: any) => resolveReference(item.sys.id, list));
    return homePageData;
}

const getAboutPageContent = (id: string, list: any) => {
    const sectionsIds = resolveReference(id, list).sections.map((ref: any) => ref.sys.id);
    let aboutPageData: { [key: string]: any } = {}
    // sectionsIds.forEach((id: string, index: any) => {
    //     aboutPageData[`section-${index}`] = resolveReference(id, list);
    // });
    aboutPageData = {
        introSection: resolveReference(sectionsIds[0], list),
        missionVisionSection: resolveReference(sectionsIds[1], list),
        worksSection: resolveReference(sectionsIds[2], list),
        valuesSection: {
            ...resolveReference(sectionsIds[3], list),
            values: [resolveReference(sectionsIds[4], list), resolveReference(sectionsIds[5], list), resolveReference(sectionsIds[6], list), resolveReference(sectionsIds[7], list)]
        },
        benefitsSection: {
            ...resolveReference(sectionsIds[8], list),
            benefits: [resolveReference(sectionsIds[9], list), resolveReference(sectionsIds[10], list), resolveReference(sectionsIds[11], list), resolveReference(sectionsIds[12], list)]
        },
    }
    aboutPageData.worksSection.cards = aboutPageData.worksSection.cards.map((work: any) => resolveReference(work.sys.id, list));
    aboutPageData.missionVisionSection.subSections = aboutPageData.missionVisionSection.subSections.map((work: any) => resolveReference(work.sys.id, list));
    return aboutPageData;
}

