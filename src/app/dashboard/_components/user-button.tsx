import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserButton() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
