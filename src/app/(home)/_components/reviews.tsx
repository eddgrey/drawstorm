import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

interface ReviewProps {
  title: string;
  description: string;
  authorName: string;
  authorAvatar: string;
  stars: number;
}

function Review({
  title,
  description,
  authorName,
  authorAvatar,
  stars,
}: ReviewProps) {
  return (
    <div className="relative bg-white shadow-md rounded-lg px-4 py-6 flex flex-col justify-between gap-y-4">
      <Quote className="fill-indigo-500 text-indigo-500 h-8 w-8 absolute -top-4 -left-2" />
      <h3 className="font-bold text-base text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm text-pretty">{description}</p>

      <div className="flex justify-start items-center gap-x-2">
        <Avatar>
          <AvatarImage src={authorAvatar} alt={`${authorName}-avatar`} />
          <AvatarFallback className="uppercase">{authorName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-medium">{authorName}</h3>
          <div className="flex items-center gap-x-1">
            <p className="text-sm font-medium">{stars}.0</p>
            {Array.from(Array(stars).keys()).map((star) => (
              <Star
                key={`star-${star}`}
                className="text-amber-400 fill-amber-400 h-4 w-4"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-8 w-full max-w-xl lg:max-w-full mx-auto mb-28">
      <Review
        title="Simplifies Workshop Integration"
        description="DrawStorm's intuitive interface and user-friendly features allowed us to seamlessly incorporate it into our workflow without any hassle."
        authorName="Jhon Cooper"
        authorAvatar="/avatars/1.png"
        stars={5}
      />
      <Review
        title="Empowering Collaboration"
        description="The DrawStorm templates helped us go from zero to a comprehensive plan where we outline activities, ideas, and dependencies."
        authorName="Ashley Williams"
        authorAvatar="/avatars/3.png"
        stars={5}
      />
      <Review
        title="Unleashing Creativity"
        description="DrawStorm has revolutionized our team's approach to innovation. Highly recommended for any team looking to foster creativity and drive innovation forward."
        authorName="Dave Miller"
        authorAvatar="/avatars/2.png"
        stars={5}
      />
    </section>
  );
}
