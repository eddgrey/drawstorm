"use client";

import InviteButton from "./invite-button";
import SearchInput from "./search-input";
import TeamSwitcher from "./team-switcher";
import UserButton from "./user-button";

export default function Navbar() {
  return (
    <div className="flex items-center gap-x-4 p-5 bg-blue-200">
      <div className="hidden lg:flex lg:flex-1 bg-orange-200">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1 bg-amber-200">
        <TeamSwitcher />
      </div>
      <InviteButton />
      <UserButton />
    </div>
  );
}
