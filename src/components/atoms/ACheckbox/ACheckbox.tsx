import type { ComponentPropsWithRef } from "react";
import "./ACheckbox.scss";

type CheckboxProps = Omit<ComponentPropsWithRef<"input">, "type"> & {
  isDisabled?: boolean;
  isInvalid?: boolean;
};

export const ACheckbox = ({
  isDisabled = false,
  isInvalid = false,
  disabled = false,
  className = "",
  ...checkboxProps
}: CheckboxProps) => (
  <input
    {...checkboxProps}
    type="checkbox"
    disabled={disabled || isDisabled}
    aria-invalid={isInvalid || checkboxProps["aria-invalid"] || undefined}
    className={["checkbox", className].join(" ").trim()}
  />
);
