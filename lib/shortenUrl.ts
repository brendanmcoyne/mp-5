"use server"
import { ObjectId } from "mongodb";
import getCollection, { URLS_COLLECTION } from "@/app/db";

export default async function shortenUrl(originalUrl: string, alias: string): Promise<string | null> {
    const urlsCollection = await getCollection(URLS_COLLECTION);

    const existingAlias = await urlsCollection.findOne({ alias });

    if (existingAlias) {
        return null;
    }

    await urlsCollection.insertOne({
        _id: new ObjectId(),
        originalUrl,
        alias,
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return `${baseUrl}/${alias}`;
}