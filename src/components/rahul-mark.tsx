export function ChanhDaiMark(props: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={`text-2xl font-bold tracking-tight ${props.className || ""}`}
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      RS
    </div>
  );
}

export function getMarkSVG(color: string) {
  return `<div style="font-family: system-ui, -apple-system, sans-serif; font-weight: 700; font-size: 1.5rem; color: ${color}; letter-spacing: -0.025em;">RS</div>`;
}
