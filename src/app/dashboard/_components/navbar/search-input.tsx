"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useDebounceValue } from "usehooks-ts";
import { ChangeEvent, useEffect, useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounceValue(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/dashboard",
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="w-full">
      <div className="relative w-full max-w-lg">
        <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          className="w-full pl-9"
          placeholder="Search boards"
          onChange={handleChange}
          value={value}
        />
        {value && (
          <button
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
            onClick={() => setValue("")}
          >
            <X className="text-red-400 h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
