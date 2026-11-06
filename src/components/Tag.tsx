export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="tag rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
      {children}
    </span>
  );
}
