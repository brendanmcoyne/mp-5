"use server"
import { ObjectId } from "mongodb";
import getCollection, { URLS_COLLECTION } from "@/app/db";

export default async function shortenUrl(originalUrl: string, alias: string): Promise<string | null> {
    const urlsCollection = await getCollection(URLS_COLLECTION);

    const existingAlias = await urlsCollection.findOne({ alias });

    if (existingAlias) {
        throw new Error("ALIAS_TAKEN");
    }

    await urlsCollection.insertOne({
        _id: new ObjectId(),
        originalUrl,
        alias,
    });

    const baseUrl = "https://mp-5-plum.vercel.app/";
    // const baseUrl = "http://localhost:3000";
    return `${baseUrl}/${alias}`;
}