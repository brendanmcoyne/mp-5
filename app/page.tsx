import ShortenUrlForm from "@/components/shortenUrlForm";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-300">
            <h1 className="text-5xl pt-4">URL Shortener</h1>
            <p className="pt-2 pb-6">Here you can create custom shorter URLs</p>
            <div className="w-150 bg-white p-6 rounded-xl border-2 shadow-lg">
                <header>
                    <h1 className="font-bold text-2xl mt-4">Shorten a URL</h1>
                    <p className="text-neutral-500 mt-1 mb-6">Enter down below a URL and a custom alias</p>
                </header>
                <ShortenUrlForm />
            </div>
        </div>
    );
}