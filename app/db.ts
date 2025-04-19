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
        // ✅ Add the timeout setting here
        client = new MongoClient(MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // ⏱ Fail if it takes longer than 5 seconds
        });

        console.log("🔌 Connecting to MongoDB...");
        await client.connect();
        console.log("✅ MongoDB connected!");
    }
    return client.db(DB_NAME);
}

export default async function getCollection(collectionName: string): Promise<Collection> {
    if (!db) {
        db = await connect();
    }
    return db.collection(collectionName);
}