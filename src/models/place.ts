export const PLACE_NAME_MIN_LENGTH = 2;
export const PLACE_NAME_MAX_LENGTH = 80;
export const PLACE_DESCRIPTION_MAX_LENGTH = 320;

export type PlaceCategory = "nature" | "culture" | "food" | "city";

export type Place = {
  id: string;
  name: string;
  category: PlaceCategory;
  description: string;
  isVisited: boolean;
};

export type PlaceInput = Pick<Place, "name" | "category" | "description">;

export type VisitFilter = "all" | "planned" | "visited";

export type PlaceFilters = {
  search: string;
  category: PlaceCategory | "all";
  visitFilter: VisitFilter;
};

export const PLACE_CATEGORY_LABELS: Record<PlaceCategory, string> = {
  nature: "Nature",
  culture: "Culture",
  food: "Food & drink",
  city: "City walks",
};

// PRZYKłAD JAK DZIAłA PLACE_CATEGORY_OPTIONS
// // 1. Punkt wyjścia: obiekt
// const PLACE_CATEGORY_LABELS = {
//   nature: "Nature",
//   culture: "Culture",
//   food: "Food & drink",
//   city: "City walks",
// };

// // 2. Object.entries(...) robi z niego tablicę par [klucz, wartość]
// [
//   ["nature", "Nature"],
//   ["culture", "Culture"],
//   ["food", "Food & drink"],
//   ["city", "City walks"],
// ];

// // 3. .map(([value, label]) => ({ value, label })) zamienia każdą parę na obiekt
// [
//   { value: "nature", label: "Nature" },
//   { value: "culture", label: "Culture" },
//   { value: "food", label: "Food & drink" },
//   { value: "city", label: "City walks" },
// ];
export const PLACE_CATEGORY_OPTIONS = Object.entries(PLACE_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
);

export const isPlaceCategory = (value: string): value is PlaceCategory =>
  Object.hasOwn(PLACE_CATEGORY_LABELS, value);

export const getPlaceNameError = (name: string) => {
  if (name.length < PLACE_NAME_MIN_LENGTH)
    return `Use at least ${PLACE_NAME_MIN_LENGTH} characters.`;
  return "";
};
