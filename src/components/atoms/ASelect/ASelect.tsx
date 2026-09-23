import type { ComponentPropsWithRef } from "react";
import "./ASelect.scss";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = Omit<ComponentPropsWithRef<"select">, "children"> & {
  options: readonly SelectOption[];
  isDisabled?: boolean;
  isInvalid?: boolean;
};

export const ASelect = ({
  options,
  isDisabled = false,
  isInvalid = false,
  disabled = false,
  className = "",
  ...selectProps
}: SelectProps) => (
  <span className={["select", className].join(" ").trim()}>
    <select
      {...selectProps}
      disabled={disabled || isDisabled}
      aria-invalid={isInvalid || selectProps["aria-invalid"] || undefined}
      className="select__control"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
    <span
      className="select__chevron"
      aria-hidden="true"
    />
  </span>
);
