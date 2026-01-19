const content = import.meta.glob("./*.svg", { eager: true });
const icons: Record<string, unknown> = {};

Object.entries(content).forEach(([path, value]) => {
  const name = path.replace(".svg", "").replace("./", "");

  icons[name] = (value as { default: unknown }).default;
});

export default icons;