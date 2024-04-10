"use client";

import InviteButton from "./invite-button";
import MobileMenu from "./mobile-menu";
import SearchInput from "./search-input";
import UserButton from "./user-button";

export default function Navbar() {
  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="flex flex-1">
        <SearchInput />
      </div>
      {/* <div className="block lg:hidden flex-1">
        <TeamSwitcher />
      </div> */}
      <div className="hidden lg:flex items-center space-x-4">
        <InviteButton />
        <UserButton />
      </div>

      <MobileMenu />
    </div>
  );
}
