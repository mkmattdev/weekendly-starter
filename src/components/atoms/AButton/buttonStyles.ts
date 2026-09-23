export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  className?: string;
};

export const buttonStyles = ({ variant = "primary", className }: ButtonStyleOptions = {}) =>
  ["button", `button--${variant}`, className].filter(Boolean).join(" "); // np. powstaje "button button--primary"
