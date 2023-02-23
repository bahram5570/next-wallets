import Link from "next/link";

export default function Home() {
  return (
    <section className="flex gap-20">
      <Link
        href="/metaMask"
        className="text-blue-800 text-2xl font-bold border-4 border-blue-800 rounded-lg px-5 py-3"
      >
        MetaMask
      </Link>

      <Link
        href="/connectWallet"
        className="text-blue-800 text-2xl font-bold border-4 border-blue-800 rounded-lg px-5 py-3"
      >
        ConnectWallet
      </Link>
    </section>
  );
}
