"use server";

import { ObjectId } from "mongodb";
import getCollection, { URLS_COLLECTION } from "@/app/db";

export default async function shortenUrl(originalUrl: string, alias: string): Promise<string> {
    try {
        const urlsCollection = await getCollection(URLS_COLLECTION);

        // Check if alias exists using the indexed alias field
        const existingAlias = await urlsCollection.findOne({ alias });

        if (existingAlias) {
            throw new Error("ALIAS_TAKEN");
        }

        // Insert the new URL in MongoDB
        await urlsCollection.insertOne({
            _id: new ObjectId(),
            originalUrl,
            alias,
        });

        // Generate the shortened URL using the production base URL
        const baseUrl = process.env.BASE_URL || "https://mp-5-plum.vercel.app";
        return `${baseUrl}/${alias}`;
    } catch (error) {
        // Error handling without console logs
        throw error; // Rethrow to propagate the error
    }
}