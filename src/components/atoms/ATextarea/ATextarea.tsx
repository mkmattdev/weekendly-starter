import type { ComponentPropsWithRef } from "react";
import "./ATextarea.scss";

type TextareaProps = ComponentPropsWithRef<"textarea"> & {
  isDisabled?: boolean;
  isInvalid?: boolean;
};

export const ATextarea = ({
  isDisabled = false,
  isInvalid = false,
  disabled = false,
  className = "",
  rows = 3,
  ...textareaProps
}: TextareaProps) => (
  <textarea
    {...textareaProps}
    rows={rows}
    disabled={disabled || isDisabled}
    aria-invalid={isInvalid || textareaProps["aria-invalid"] || undefined}
    className={["textarea", className].join(" ").trim()}
  />
);
