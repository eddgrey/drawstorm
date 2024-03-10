import { Play } from "lucide-react";
import Section from "./section";

export default function Demo() {
  return (
    <Section
      id="demo"
      className="px-12 md:px-20 lg:px-28"
      title="Demo video"
      description="Want to see the app in action? No worries, I've got you covered! Here is a live demo showing how to create a note"
    >
      <p className="bg-black rounded-xl w-full aspect-video flex items-center justify-center">
        <button className="border-2 border-gray-300 rounded-full p-4 flex justify-center items-center">
          <Play className="text-gray-300 fill-gray-300" />
        </button>
      </p>
    </Section>
  );
}
