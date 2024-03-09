"use client";

import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";
import { memo } from "react";
import Cursor from "./cursor";
import { colorToCss } from "@/lib/utils";
import Path from "./layers/path";
import { shallow } from "@liveblocks/client";

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

function Drafts() {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss(other.penColor) : "#000"}
            />
          );
        }

        return null;
      })}
    </>
  );
}

export default memo(function CursorsPresence() {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});
