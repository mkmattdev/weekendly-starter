import { useRef, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { AButton } from "@/components/atoms/AButton/AButton";
import { AInput } from "@/components/atoms/AInput/AInput";
import { ASelect } from "@/components/atoms/ASelect/ASelect";
import { ATextarea } from "@/components/atoms/ATextarea/ATextarea";
import { MFormField } from "@/components/molecules/MFormField/MFormField";
import { usePlaceActions } from "@/hooks/usePlaceActions";
import {
  PLACE_CATEGORY_OPTIONS,
  PLACE_DESCRIPTION_MAX_LENGTH,
  PLACE_NAME_MAX_LENGTH,
  getPlaceNameError,
  isPlaceCategory,
} from "@/models/place";
import type { PlaceCategory } from "@/models/place";

type PlaceFormProps = {
  onAdded?: () => void;
};

export const OPlaceForm = ({ onAdded }: PlaceFormProps) => {
  const { isPending, error, add } = usePlaceActions();
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<PlaceCategory>("nature");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const nameValidationError = getPlaceNameError(trimmedName);
    if (nameValidationError) {
      setNameError(nameValidationError);
      inputRef.current?.focus();
      return;
    }

    setNameError("");

    const wasAdded = await add({ name: trimmedName, category, description: description.trim() });
    if (wasAdded) {
      onAdded?.();
      setName("");
      setCategory("nature");
      setDescription("");
    }
    inputRef.current?.focus();
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (isPlaceCategory(value)) setCategory(value);
  };

  return (
    <form
      className={[
        "rounded-xl border border-line/40 bg-surface",
        "grid content-start gap-4 p-6",
      ].join(" ")}
      aria-labelledby="add-place-heading"
      onSubmit={handleSubmit}
      onChange={() => setNameError("")}
      noValidate
      aria-busy={isPending}
    >
      <h2
        id="add-place-heading"
        className="text-lg font-semibold"
      >
        Add a place
      </h2>
      <MFormField
        id="place-name"
        label="Place name"
        error={nameError}
      >
        <AInput
          ref={inputRef}
          id="place-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={PLACE_NAME_MAX_LENGTH}
          required
          readOnly={isPending}
          isInvalid={Boolean(nameError)}
          aria-describedby={nameError ? "place-name-error" : undefined}
        />
      </MFormField>
      <MFormField
        id="place-category"
        label="Category"
      >
        <ASelect
          id="place-category"
          options={PLACE_CATEGORY_OPTIONS}
          value={category}
          onChange={handleCategoryChange}
          isDisabled={isPending}
        />
      </MFormField>
      <MFormField
        id="place-description"
        label="Description (optional)"
      >
        <ATextarea
          id="place-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={PLACE_DESCRIPTION_MAX_LENGTH}
          readOnly={isPending}
        />
      </MFormField>
      {error && (
        <p
          role="alert"
          className="text-danger"
        >
          {error}
        </p>
      )}
      <AButton
        type="submit"
        isLoading={isPending}
      >
        {isPending ? "Saving…" : "Add place"}
      </AButton>
    </form>
  );
};
