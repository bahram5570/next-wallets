import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="px-40 py-20 bg-green-100 min-h-screen">
      <Component {...pageProps} />
    </div>
  );
}

