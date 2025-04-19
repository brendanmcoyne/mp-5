"use server";

import { ObjectId } from "mongodb";
import getCollection, { URLS_COLLECTION } from "@/app/db";

export default async function shortenUrl(originalUrl: string, alias: string): Promise<string> {
    console.log("Shorten URL request:", { originalUrl, alias });

    try {
        const urlsCollection = await getCollection(URLS_COLLECTION);
        console.log("Connected to Mongo, checking alias:", alias);

        // Check if alias exists using the indexed alias field
        const existingAlias = await urlsCollection.findOne({ alias });

        if (existingAlias) {
            console.log("Alias already exists:", alias);
            throw new Error("ALIAS_TAKEN");
        }

        console.log("Inserting new URL...");
        // Insert the new URL in MongoDB
        await urlsCollection.insertOne({
            _id: new ObjectId(),
            originalUrl,
            alias,
        });

        // Generate the shortened URL using the production base URL
        const baseUrl = process.env.BASE_URL || "https://mp-5-plum.vercel.app";
        console.log("Shortened URL:", `${baseUrl}/${alias}`);
        return `${baseUrl}/${alias}`;
    } catch (error) {
        console.error("Error in shortenUrl:", error);
        throw error; // Rethrow to propagate error
    }
}