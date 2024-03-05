"use client";

import CreateTeamModal from "@/components/modals/create-team-modal";
import RenameModal from "@/components/modals/rename-modal";
import { useEffect, useState } from "react";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RenameModal />
      <CreateTeamModal />
    </>
  );
}
