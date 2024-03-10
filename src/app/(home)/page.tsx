import Navbar from "./_components/navbar";
import UseCases from "./_components/card";
import Section from "./_components/section";
import { ChevronDown } from "lucide-react";
import Steps from "./_components/steps";
import Image from "next/image";
import FAQ from "./_components/faq";
import Reviews from "./_components/reviews";
import Demo from "./_components/demo";
import Hero from "./_components/hero";

export default function LandingPage() {
  return (
    <div className="bg-gray-50 w-full">
      <Navbar />
      <div className="mx-auto w-full max-w-screen-xl px-12 pt-20 pb-8">
        <Hero />
        <Steps />
        <UseCases />
        <Demo />
        <Reviews />
        <FAQ />
      </div>
    </div>
  );
}
