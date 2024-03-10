import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-col items-center h-screen w-full relative">
      <div className="space-y-12 mt-24 md:mt-12 w-full">
        <div className="w-full max-w-screen-md mx-auto space-y-6 mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-balance text-center">
            Elevate Your
            <span className="text-indigo-500"> Collaboration</span>.Visualize
            Your <span className="text-indigo-500"> Ideas</span>, Together.
          </h1>
          <p className="text-base text-gray-400 text-center">
            Transform the way your team collaborates and innovates with our
            powerful online platform. From brainstorming to project management,
            empower your team to bring ideas to life like never before.
          </p>
        </div>
      </div>
      <Image
        src={"/board.png"}
        alt="DrawStorm"
        width={960}
        height={680}
        className="rounded-lg shadow-lg"
      />
      <ChevronDown className="h-24 w-24 text-gray-400 animate-bounce absolute bottom-14" />
    </div>
  );
}
