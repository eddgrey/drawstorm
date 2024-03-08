"use client";

import { useOthersConnectionIds } from "@/liveblocks.config";
import { memo } from "react";
import Cursor from "./cursor";

function Cursors() {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
}

export default memo(function CursorsPresence() {
  return (
    <>
      {/* TODO: Draft pencil*/}
      <Cursors />
    </>
  );
});
