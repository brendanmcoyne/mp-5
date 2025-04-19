import { MongoClient, Db, Collection } from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
    throw new Error("MongoDB URI is missing");
}

const DB_NAME = "url_shortener";
export const URLS_COLLECTION = "urls";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
    if (!client) {
        client = new MongoClient(MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        try {
            await client.connect();
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw new Error("Failed to connect to MongoDB");
        }
    }
    return client.db(DB_NAME);
}

export default async function getCollection(collectionName: string): Promise<Collection> {
    if (!db) {
        db = await connect();
    }
    return db.collection(collectionName);
}