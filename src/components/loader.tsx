import Image from "next/image";

export default function Loader() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Image
        src="/logo.svg"
        alt="DrawStorm-logo"
        width={120}
        height={120}
        className="animate-pulse duration-700"
      />
    </div>
  );
}
