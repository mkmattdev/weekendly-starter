import { useState } from "react";
import { ABadge } from "./components/atoms/ABadge/ABadge";
import { AButton } from "./components/atoms/AButton/AButton";
import { AInput } from "./components/atoms/AInput/AInput";
import { ASpinner } from "./components/atoms/ASpinner/ASpinner";
import { ATextarea } from "./components/atoms/ATextarea/ATextarea";
import { MEmptyState } from "./components/molecules/MEmptyState/MEmptyState";
import { MFormField } from "./components/molecules/MFormField/MFormField";
import { MPagination } from "./components/molecules/MPagination/MPagination";
import { MTable, type TableColumn } from "./components/molecules/MTable/MTable";
import { MButtonGroup } from "./components/molecules/MButtonGroup/MButtonGroup";

export const App = () => {
  const PAGE_COUNT = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("all");

  type City = {
    id: string;
    name: string;
    country: string;
    isVisited: boolean;
  };

  const CITIES: City[] = [
    { id: "1", name: "Kraków", country: "Poland", isVisited: true },
    { id: "2", name: "Porto", country: "Portugal", isVisited: true },
    { id: "3", name: "Valencia", country: "Spain", isVisited: false },
  ];

  const CITY_COLUMNS: TableColumn<City>[] = [
    { id: "name", header: "City", render: (city) => city.name },
    { id: "country", header: "Country", render: (city) => city.country },
    {
      id: "status",
      header: "Been there?",
      render: (city) => (
        <ABadge tone={city.isVisited ? "green" : "neutral"}>
          {city.isVisited ? "Visited" : "Not yet"}
        </ABadge>
      ),
    },
  ];

  const getCityKey = (city: City) => city.id;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <MTable
        items={CITIES}
        columns={CITY_COLUMNS}
        getItemKey={getCityKey}
        caption="Cities to visit"
      />

      <MButtonGroup
        label="Filter by visit status"
        options={[
          { value: "all", label: "All places", count: 5 },
          { value: "planned", label: "Want to go", count: 3 },
          { value: "visited", label: "Visited", count: 2 },
        ]}
        value={status}
        onChange={setStatus}
      />
      <p>Wybrano: {status}</p>

      <ABadge>Want to go</ABadge>
      <ABadge tone="green">Visited</ABadge>
      <AButton variant="danger">Testowy przycisk</AButton>
      <ASpinner title="ładowanie tabeli" />
      <ATextarea
        rows={5}
        maxLength={3}
      />

      <MFormField
        id="test-id"
        label="TEST LABEL"
        error="Minimum 5 characters is required"
      >
        <AInput id="test-id" />
      </MFormField>

      <MEmptyState
        title="Example title" // title ma typ string
        description="Example Description" // description ma typ string
        action={<AButton variant="secondary">Example button</AButton>} // action ma typ ReactNode, dlatego moge przekazac dowolny JSX
      />

      <MPagination
        currentPage={currentPage}
        pageCount={PAGE_COUNT}
        onPageChange={setCurrentPage}
      />
    </main>
  );
};
