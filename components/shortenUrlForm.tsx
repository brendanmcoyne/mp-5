"use client";

import { useState } from "react";
import shortenUrl from "@/lib/shortenUrl";

export default function ShortenUrlForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

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
                setError("");
                setCopied(false);
            } else {
                setError("Invalid URL. Please try again.");
            }
        } catch (err) {
            if (err instanceof Error) {
                console.error("Error shortening URL:", err);

                if (err.message === "ALIAS_TAKEN") {
                    setError("Invalid Alias: This alias has already been used.");
                } else {
                    setError("Error creating shortened URL. Please try again.");
                }
            }
        }
    };

    const copyToClipboard = () => {
        if (shortenedUrl) {
            navigator.clipboard.writeText(shortenedUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <form onSubmit={handleSubmit} className="w-full">
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
                            setCopied(false);
                        }}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-blue-500 hover:bg-blue-700 rounded-lg px-5 py-2.5 text-center"
                >
                    Click here to shorten!
                </button>
            </form>

            {(shortenedUrl || error) && (
                <div className="mt-6 text-center w-full">
                    {shortenedUrl && (
                        <>
                            <div className="inline-block bg-gray-100 rounded-md px-4 py-2 break-all text-blue-600">
                                <a
                                    href={shortenedUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    {shortenedUrl}
                                </a>
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                                type="button"
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </>
                    )}
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            )}
        </div>
    );
}
