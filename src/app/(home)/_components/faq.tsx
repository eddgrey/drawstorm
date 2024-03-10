import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Section from "./section";

interface ItemProps {
  question: string;
  answer: string;
}

function Item({ question, answer }: ItemProps) {
  return (
    <AccordionItem
      value={question}
      className="bg-white shadow-sm rounded-lg px-6"
    >
      <AccordionTrigger className="text-lg font-semibold hover:text-indigo-500 [&[data-state=open]]:text-indigo-700">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-gray-500">{answer}</AccordionContent>
    </AccordionItem>
  );
}
export default function FAQ() {
  return (
    <Section id="faq" className="max-w-screen-sm" title="F.A.Q" hiddenButton>
      <Accordion type="single" collapsible className="w-full space-y-8">
        <Item
          question="How can I get started with DrawStorm?"
          answer="To get started with DrawStorm, simply sign up for an account on our website. Once registered, you can start creating boards, inviting team members, and collaborating in real-time."
        />
        <Item
          question="Is DrawStorm compatible with different devices?"
          answer="Yes, you can access our platform using web browsers on desktops, laptops, tablets, and smartphones."
        />
        <Item
          question="How does billing work for DrawStorm?"
          answer="DrawStorm offers flexible billing options based on your team's needs. We offer both monthly and annual subscription plans with different pricing tiers based on the number of users and features included."
        />
        <Item
          question="What about privacy?"
          answer="We take the security and privacy of your data very seriously. DrawStorm uses industry-standard encryption protocols to protect your information"
        />
        <Item
          question="How can I contact support if I have questions or need help?"
          answer="We're here to assist you! Feel free to reach out via live chat or email us at support@drawstorm.io. Your satisfaction is our priority!"
        />
      </Accordion>
    </Section>
  );
}
