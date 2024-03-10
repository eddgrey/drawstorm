import { cn } from "@/lib/utils";
import Image from "next/image";
import Section from "./section";

interface StepProps {
  title: string;
  description: string;
  imageUrl: string;
  textPosition?: "left" | "right";
}

export function Step({
  title,
  description,
  imageUrl,
  textPosition = "right",
}: StepProps) {
  return (
    <figure
      className={cn(
        "grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 text-pretty",
        textPosition === "left" && "lg:text-right"
      )}
    >
      <div
        className={cn(
          "flex flex-col justify-center gap-y-6",
          textPosition === "right" && "lg:order-2"
        )}
      >
        <h3 className="text-indigo-400 text-2xl font-semibold">{title}</h3>
        <p className="">{description}</p>
      </div>
      <div className="relative border shadow-md rounded-xl h-60 bg-white">
        <Image
          src={imageUrl}
          alt={`step-${title[0]}`}
          className="aspect-video object-contain lg:object-cover object-center rounded-xl"
          fill
        />
      </div>
    </figure>
  );
}

export default function Steps() {
  return (
    <Section
      id="how-it-works"
      className="px-12 md:px-24 lg:px-32"
      title="How does it work?"
    >
      <div className="flex flex-col gap-y-16">
        <Step
          title="1. Create your team"
          description="Speak your thoughts & ideas. Don't stress about format, grammar, pauses or mistakes, just talk naturally, we handle the rest."
          imageUrl="/steps/create-team.png"
          textPosition="right"
        />
        <Step
          title="2. Create your first board"
          description="Speak your thoughts & ideas. Don't stress about format, grammar, pauses or mistakes, just talk naturally, we handle the rest."
          imageUrl="/steps/create-board.png"
          textPosition="left"
        />
        <Step
          title="3. Select your board"
          description="Speak your thoughts & ideas. Don't stress about format, grammar, pauses or mistakes, just talk naturally, we handle the rest."
          imageUrl="/steps/select-board.png"
          textPosition="right"
        />
        <Step
          title="4. Start creating content you like"
          description="Speak your thoughts & ideas. Don't stress about format, grammar, pauses or mistakes, just talk naturally, we handle the rest."
          imageUrl="/steps/start.png"
          textPosition="left"
        />
        <Step
          title="5. Start "
          description="Speak your thoughts & ideas. Don't stress about format, grammar, pauses or mistakes, just talk naturally, we handle the rest."
          imageUrl="/steps/draw.png"
          textPosition="right"
        />
      </div>
    </Section>
  );
}
