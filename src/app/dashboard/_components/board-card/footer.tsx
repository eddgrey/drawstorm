import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { MouseEventHandler } from "react";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
}

export default function Footer({
  title,
  authorLabel,
  createdAtLabel,
  disabled,
  isFavorite,
  onClick,
}: FooterProps) {
  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClick();
  };

  return (
    <div className="relative bg-white p-3">
      <p className="text-sm truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-foreground truncate">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        onClick={handleOnClick}
        disabled={disabled}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-indigo-600",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className={cn(
            "h-4 w-4",
            isFavorite && "fill-indigo-600 text-indigo-600"
          )}
        />
      </button>
    </div>
  );
}
