import getCollection, { URLS_COLLECTION } from "@/app/db";

export default async function getUrlByAlias(alias: string): Promise<string | null> {
    const urlsCollection = await getCollection(URLS_COLLECTION);
    const urlData = await urlsCollection.findOne({ alias });

    if (urlData) {
        return urlData.originalUrl;
    }

    return null;
}