// Loads every file in src/assets/figma as a hashed URL and exposes a lookup by
// basename (without extension). Lets data files reference images by name, e.g.
// asset('show-nba-1'), instead of importing each one by hand.
const modules = import.meta.glob("../assets/figma/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const map = {};
for (const path in modules) {
  const base = path.split("/").pop().replace(/\.[^.]+$/, "");
  map[base] = modules[path];
}

export const asset = (name) => map[name] ?? "";
