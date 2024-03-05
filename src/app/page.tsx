import Link from "next/link";

export default async function Home() {
  return (
    <div className="bg-gray-200 h-full w-full">
      <Link href="/dashboard">Go to Dashboard</Link>
    </div>
  );
}
