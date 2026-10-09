import { Link } from "react-router";
import { ABadge, type BadgeTone } from "@/components/atoms/ABadge/ABadge";
import { AButton } from "@/components/atoms/AButton/AButton";
import { ACheckbox } from "@/components/atoms/ACheckbox/ACheckbox";
import { MTable, type TableColumn } from "@/components/molecules/MTable/MTable";
import { PLACE_CATEGORY_LABELS } from "@/models/place";
import type { Place, PlaceCategory } from "@/models/place";

type PlacesTableProps = {
  places: Place[];
  isPending?: boolean;
  onToggleVisited: (place: Place) => void;
  onRemove: (place: Place) => void;
};
const getPlaceKey = (place: Place) => place.id;
const CATEGORY_TONES: Record<PlaceCategory, BadgeTone> = {
  nature: "green",
  culture: "violet",
  food: "orange",
  city: "blue",
};

export const OPlacesTable = ({
  places,
  isPending = false,
  onToggleVisited,
  onRemove,
}: PlacesTableProps) => {
  const columns: TableColumn<Place>[] = [
    {
      id: "name",
      header: "Place",
      render: (place) => (
        <Link
          to={`/places/${place.id}`}
          aria-label={`View ${place.name}`}
          className="font-medium text-accent hover:underline"
        >
          {place.name}
        </Link>
      ),
    },
    {
      id: "category",
      header: "Category",
      render: (place) => (
        <ABadge tone={CATEGORY_TONES[place.category]}>
          {PLACE_CATEGORY_LABELS[place.category]}
        </ABadge>
      ),
    },
    {
      id: "status",
      header: "Been there?",
      render: (place) => (
        <label className="flex min-h-11 items-center gap-2">
          <ACheckbox
            checked={place.isVisited}
            aria-disabled={isPending}
            onChange={() => onToggleVisited(place)}
            aria-label={`${place.isVisited ? "Visited" : "Not yet"}: ${place.name}`}
          />
          {place.isVisited ? "Visited" : "Not yet"}
        </label>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      render: (place) => (
        <AButton
          variant="danger"
          aria-disabled={isPending}
          aria-label={`Remove ${place.name}`}
          onClick={() => onRemove(place)}
        >
          Remove
        </AButton>
      ),
    },
  ];
  return (
    <MTable
      items={places}
      columns={columns}
      getItemKey={getPlaceKey}
      caption="Your saved places"
    />
  );
};
