import List from "./list";
import NewButton from "./new-button";

export default function Sidebar() {
  return (
    <aside className="fixed z-10 left-0 bg-teal-950 h-full w-16 flex p-3 flex-col gap-y-4">
      <List />
      <NewButton />
    </aside>
  );
}
