import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-100 p-4 flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/about">About Us</Link>
      <Link href="/dummy1">Dummy 1</Link>
      <Link href="/dummy2">Dummy 2</Link>
      <Link href="/dummy3">Dummy 3</Link>
    </header>
  );
}
