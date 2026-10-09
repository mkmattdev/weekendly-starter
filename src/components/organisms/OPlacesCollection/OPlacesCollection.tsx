import { useState } from "react";
import { AButton } from "@/components/atoms/AButton/AButton";
import { MEmptyState } from "@/components/molecules/MEmptyState/MEmptyState";
import { MPagination } from "@/components/molecules/MPagination/MPagination";
import { OPlaceFilters } from "@/components/organisms/OPlaceFilters/OPlaceFilters";
import { OPlacesTable } from "@/components/organisms/OPlacesTable/OPlacesTable";
import { OPlaceForm } from "@/components/organisms/OPlaceForm/OPlaceForm";
import { usePlaceActions } from "@/hooks/usePlaceActions";
import type { Place, PlaceFilters } from "@/models/place";
import { useAppSelector } from "@/store/hooks";
import { selectPlaces } from "@/store/placesSlice";

const PLACES_PER_PAGE = 5;
const DEFAULT_FILTERS: PlaceFilters = {
  search: "",
  category: "all",
  visitFilter: "all",
};

export const OPlacesCollection = () => {
  const places = useAppSelector(selectPlaces);
  const { isPending, update, remove } = usePlaceActions();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const { search, category, visitFilter } = filters;
  const visitedCount = places.filter((place) => place.isVisited).length;
  const counts = {
    all: places.length,
    planned: places.length - visitedCount,
    visited: visitedCount,
  };
  const normalizedSearch = search.trim().toLocaleLowerCase();

  const matchesFilters = (place: Place) => {
    const isSearchMatch = `${place.name} ${place.description}`
      .toLocaleLowerCase()
      .includes(normalizedSearch);
    const isCategoryMatch = category === "all" || place.category === category;
    const isStatusMatch =
      visitFilter === "all" || (visitFilter === "visited" ? place.isVisited : !place.isVisited);
    return isSearchMatch && isCategoryMatch && isStatusMatch;
  };
  const filteredPlaces = places.filter(matchesFilters);
  const pageCount = Math.max(1, Math.ceil(filteredPlaces.length / PLACES_PER_PAGE));

  const currentPage = Math.min(page, pageCount);
  const firstPlaceIndex = (currentPage - 1) * PLACES_PER_PAGE;
  const visiblePlaces = filteredPlaces.slice(firstPlaceIndex, firstPlaceIndex + PLACES_PER_PAGE);

  const handleFiltersChange = (nextFilters: PlaceFilters) => {
    setFilters(nextFilters);
    setPage(1);
  };

  const focusSearch = () => document.getElementById("place-search")?.focus({ preventScroll: true });

  const handleClearFilters = () => {
    handleFiltersChange(DEFAULT_FILTERS);
    focusSearch();
  };
  const handleAdded = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(Math.ceil((places.length + 1) / PLACES_PER_PAGE));
  };
  const handleToggleVisited = async (place: Place) => {
    if (!(await update({ ...place, isVisited: !place.isVisited }))) return;
    if (visitFilter !== "all") focusSearch();
  };
  const handleRemove = async (place: Place) => {
    if (!(await remove(place.id))) return;
    focusSearch();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <section
        className="min-w-0 space-y-4"
        aria-labelledby="collection-heading"
      >
        <OPlaceFilters
          filters={filters}
          counts={counts}
          onChange={handleFiltersChange}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p
            role="status"
            className="text-sm text-muted"
          >
            {`${filteredPlaces.length} ${filteredPlaces.length === 1 ? "place" : "places"}`}
          </p>
          <MPagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={setPage}
          />
        </div>
        {visiblePlaces.length ? (
          <OPlacesTable
            places={visiblePlaces}
            isPending={isPending}
            onToggleVisited={handleToggleVisited}
            onRemove={handleRemove}
          />
        ) : (
          <MEmptyState
            title="No matching places"
            description="Try another search or clear the filters"
            action={
              <AButton
                variant="secondary"
                onClick={handleClearFilters}
              >
                Clear filters
              </AButton>
            }
          />
        )}
      </section>
      <OPlaceForm onAdded={handleAdded} />
    </div>
  );
};
