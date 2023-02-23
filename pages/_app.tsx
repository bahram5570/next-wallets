import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="px-40 py-10 bg-green-100 min-h-screen">
      <Link
        href="/"
        className="text-blue-800 text-2xl font-bold border-4 border-blue-800 rounded-lg px-5 py-3"
      >
        Home
      </Link>

      <main className="pt-20"><Component {...pageProps} /></main>
    </div>
  );
}
