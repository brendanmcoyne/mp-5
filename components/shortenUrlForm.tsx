"use client";

import { useState } from "react";
import shortenUrl from "@/lib/shortenUrl";

export default function ShortenUrlForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url || !alias) {
            setError("Both URL and Alias are required.");
            return;
        }

        try {
            const shortURL = await shortenUrl(url, alias);

            if (shortURL !== null) {
                setShortenedUrl(shortURL);
            } else {
                setError("Invalid URL. Please try again.");
            }
        } catch (err) {
            console.error("Error shortening URL:", err);
            setError("Error creating shortened URL. Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="url" className="block text-lg mb-1">Enter URL:</label>
                    <input
                        type="url"
                        id="url"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                        placeholder="https://example.com"
                        required
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="alias" className="block text-lg mb-1">Enter Alias:</label>
                    <input
                        type="text"
                        id="alias"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                        placeholder="custom-alias"
                        required
                        value={alias}
                        onChange={(e) => {
                            setAlias(e.target.value);
                            setError("");
                            setShortenedUrl("");
                        }}
                    />
                </div>
                <button
                    type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-700 rounded-lg px-5 py-2.5 text-center">
                    Click here to shorten!
                </button>
            </form>

            {shortenedUrl && (
                <div className="mt-4">
                    <p>Your shortened URL:</p>
                    <a href={shortenedUrl} target="blank" className="text-blue-500">{shortenedUrl}</a>
                </div>
            )}

            {error && (
                <div className="mt-4 text-red-500">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}