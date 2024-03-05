"use client";

import InviteButton from "./invite-button";
import SearchInput from "./search-input";
import TeamSwitcher from "../team-switcher";
import UserButton from "./user-button";

export default function Navbar() {
  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
        <TeamSwitcher />
      </div>
      <InviteButton />
      <UserButton />
    </div>
  );
}
