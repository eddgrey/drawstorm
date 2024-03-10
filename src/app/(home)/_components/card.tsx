import {
  CalendarCheck,
  GraduationCap,
  Lightbulb,
  LucideIcon,
  MessageCircleMore,
  Pencil,
  Users,
} from "lucide-react";
import Section from "./section";

interface CardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

function Card({ title, description, icon: Icon }: CardProps) {
  return (
    <div className="bg-white border-1 border-gray-100/50 shadow-md rounded-lg px-4 py-6 space-y-4">
      <div className="flex items-center gap-x-1">
        <Icon className="text-indigo-500" />
        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 text-pretty">{description}</p>
    </div>
  );
}

export default function UseCases() {
  return (
    <Section id="use-cases" className="px-12" title="Use cases">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
        <Card
          title="Brainstorming"
          description="With interactive whiteboards and various brainstorming tools, users can freely explore concepts, make connections between ideas, and foster creativity within the team."
          icon={Lightbulb}
        />
        <Card
          title="Content Creation"
          description="Content creators such as designers, can use the platform to collaborate on creative projects. They can visualize content ideas, storyboard designs, and more."
          icon={Pencil}
        />
        <Card
          title="Meetings"
          description="The platform serves as a virtual meeting space where teams can conduct remote meetings, workshops, and training sessions."
          icon={MessageCircleMore}
        />
        <Card
          title="Educational Notes"
          description="Students and educators can use the platform to take collaborative notes during lectures, seminars, or group study sessions."
          icon={GraduationCap}
        />
        <Card
          title="Teamwork"
          description="Teams can use the platform for various collaborative tasks such as project planning, task management, and team coordination."
          icon={Users}
        />
        <Card
          title="Organization"
          description=" Individuals and teams can use the platform to organize and visualize information across different projects and workflows. "
          icon={CalendarCheck}
        />
      </div>
    </Section>
  );
}
