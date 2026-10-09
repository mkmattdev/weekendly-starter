import type { ChangeEvent } from "react";
import { AInput } from "@/components/atoms/AInput/AInput";
import { ASelect } from "@/components/atoms/ASelect/ASelect";
import {
  MButtonGroup,
  type ButtonGroupOption,
} from "@/components/molecules/MButtonGroup/MButtonGroup";
import { PLACE_CATEGORY_OPTIONS, isPlaceCategory } from "@/models/place";
import type { PlaceFilters, VisitFilter } from "@/models/place";

type PlaceFiltersProps = {
  filters: PlaceFilters;
  counts: Record<VisitFilter, number>;
  onChange: (filters: PlaceFilters) => void;
};

const CATEGORY_OPTIONS = [{ value: "all", label: "All categories" }, ...PLACE_CATEGORY_OPTIONS];

export const OPlaceFilters = ({ filters, counts, onChange }: PlaceFiltersProps) => {
  const visitOptions: ButtonGroupOption<VisitFilter>[] = [
    { value: "all", label: "All places", count: counts.all },
    { value: "planned", label: "Want to go", count: counts.planned },
    { value: "visited", label: "Visited", count: counts.visited },
  ];

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    if (category === "all" || isPlaceCategory(category)) onChange({ ...filters, category });
  };

  return (
    <div className="space-y-4">
      <MButtonGroup
        label="Filter by visit status"
        options={visitOptions}
        value={filters.visitFilter}
        onChange={(visitFilter) => onChange({ ...filters, visitFilter })}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <AInput
          id="place-search"
          type="search"
          aria-label="Search places"
          placeholder="Search places…"
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
        />
        <ASelect
          id="category-filter"
          aria-label="Filter by category"
          options={CATEGORY_OPTIONS}
          value={filters.category}
          onChange={handleCategoryChange}
        />
      </div>
    </div>
  );
};
