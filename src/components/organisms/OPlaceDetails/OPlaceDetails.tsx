import type { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router";
import { ABadge } from "@/components/atoms/ABadge/ABadge";
import { AButton } from "@/components/atoms/AButton/AButton";
import { ASelect } from "@/components/atoms/ASelect/ASelect";
import { MFormField } from "@/components/molecules/MFormField/MFormField";
import { usePlaceActions } from "@/hooks/usePlaceActions";
import { PLACE_CATEGORY_OPTIONS, isPlaceCategory } from "@/models/place";
import { useAppSelector } from "@/store/hooks";
import { selectPlaces } from "@/store/placesSlice";

type PlaceDetailsProps = { placeId?: string };

export const OPlaceDetails = ({ placeId }: PlaceDetailsProps) => {
  const places = useAppSelector(selectPlaces);
  const place = places.find((place) => place.id === placeId);
  const { isPending, error, update, remove } = usePlaceActions();
  const navigate = useNavigate();

  if (!place) return <h1>No place found</h1>;

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (isPlaceCategory(value)) update({ ...place, category: value });
  };

  const handleToggleVisited = () => {
    update({ ...place, isVisited: !place.isVisited });
  };

  const handleRemove = async () => {
    if (await remove(place.id)) navigate("/", { replace: true });
  };

  return (
    <div className="grid gap-4">
      <Link
        className="text-sm text-accent hover:underline"
        to="/"
      >
        Back to your collection
      </Link>
      <article
        className={[
          "rounded-xl border border-line/40 bg-surface",
          "grid justify-items-start gap-4 p-6",
        ].join(" ")}
        aria-busy={isPending}
      >
        <h1 className="text-3xl font-semibold tracking-tight">{place.name}</h1>
        <ABadge tone={place.isVisited ? "green" : "neutral"}>
          {place.isVisited ? "Visited" : "Want to go"}
        </ABadge>
        <p className="text-muted">{place.description || "No description yet."}</p>
        <MFormField
          id="place-details-category"
          label="Place category"
        >
          <ASelect
            id="place-details-category"
            options={PLACE_CATEGORY_OPTIONS}
            value={place.category}
            aria-disabled={isPending}
            onChange={handleCategoryChange}
          />
        </MFormField>
        <div className="flex flex-wrap gap-2">
          <AButton
            onClick={handleToggleVisited}
            aria-disabled={isPending}
          >
            {place.isVisited ? "Move back to want to go" : "I have been here"}
          </AButton>
          <AButton
            variant="danger"
            onClick={handleRemove}
            aria-disabled={isPending}
          >
            Remove place
          </AButton>
        </div>
      </article>
      {error && (
        <p
          role="alert"
          className="text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
};
