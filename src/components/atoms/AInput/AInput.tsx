import type { ComponentPropsWithRef } from "react";
import "./AInput.scss";

type InputProps = ComponentPropsWithRef<"input"> & {
  isDisabled?: boolean;
  isInvalid?: boolean;
};

export const AInput = ({
  isDisabled = false,
  isInvalid = false,
  disabled = false,
  className = "",
  ...inputProps
}: InputProps) => (
  <input
    {...inputProps}
    disabled={disabled || isDisabled}
    aria-invalid={isInvalid || inputProps["aria-invalid"] || undefined}
    className={["input", className].join(" ").trim()}
  />
);
