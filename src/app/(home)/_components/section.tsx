import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  hiddenButton?: boolean;
}

export default function Section({
  id,
  title,
  description,
  className,
  children,
  hiddenButton,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full flex flex-col items-center justify-center mx-auto gap-y-12 mb-28",
        className
      )}
    >
      <div>
        <h2 className="text-gray-600 text-3xl font-semibold text-center mb-4">
          {title}
        </h2>
        {description && (
          <p className="max-w-lg text-center text-gray-500">{description}</p>
        )}
      </div>
      {children}

      {!hiddenButton && (
        <Link href="/dashboard">
          <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 shadow-lg shadow-indigo-500 px-12 py-2 rounded-lg text-white text-xl font-semibold flex items-center">
            <ArrowRight className="mr-2" />
            <span>Try it for free!</span>
          </div>
        </Link>
      )}
    </section>
  );
}
