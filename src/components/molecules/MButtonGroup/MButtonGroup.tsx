import { AButton } from "@/components/atoms/AButton/AButton";

export type ButtonGroupOption<Value> = {
  value: Value;
  label: string;
  count: number;
};

type ButtonGroupProps<Value> = {
  label: string;
  options: readonly ButtonGroupOption<Value>[];
  value: Value;
  onChange: (value: Value) => void;
};

export const MButtonGroup = <Value extends string>({
  label,
  options,
  value,
  onChange,
}: ButtonGroupProps<Value>) => (
  <div
    role="group"
    aria-label={label}
    className="flex flex-wrap gap-2"
  >
    {options.map((option) => (
      <AButton
        key={option.value}
        variant="secondary"
        aria-pressed={value === option.value}
        onClick={() => onChange(option.value)}
      >
        {option.label}
        <span>{option.count}</span>
      </AButton>
    ))}
  </div>
);
