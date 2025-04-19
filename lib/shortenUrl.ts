"use server";

import { ObjectId } from "mongodb";
import getCollection, { URLS_COLLECTION } from "@/app/db";

export default async function shortenUrl(originalUrl: string, alias: string): Promise<string> {
    console.log("Shorten URL request:", { originalUrl, alias });

    try {
        const urlsCollection = await getCollection(URLS_COLLECTION);
        console.log("Mongo, checking alias:", alias);
        const existingAlias = await urlsCollection.findOne({ alias });

        if (existingAlias) {
            console.log("Alias already exists:", alias);
            throw new Error("ALIAS_TAKEN");
        }

        await urlsCollection.insertOne({
            _id: new ObjectId(),
            originalUrl,
            alias,
        });

        const baseUrl = "https://mp-5-plum.vercel.app";
        return `${baseUrl}/${alias}`;
    } catch (error) {
        console.error("Error in shortenUrl:", error);
        throw error;
    }
}