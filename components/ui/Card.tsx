import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  elevated?: boolean;
};

export default function Card({ className = "", elevated = false, children, ...props }: CardProps) {
  return (
    <div
      className={`${
        elevated ? "card-elevated" : "bg-surface border border-line"
      } rounded-2xl p-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}