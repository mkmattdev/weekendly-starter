import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export const MEmptyState = ({ title, description, action }: EmptyStateProps) => (
  <div
    className={["rounded-xl border border-line/40 bg-surface", "grid gap-3 p-8 text-center"].join(
      " "
    )}
  >
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-muted">{description}</p>
    {action && <div>{action}</div>}
  </div>
);
