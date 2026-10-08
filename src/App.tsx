import { ABadge } from "./components/atoms/ABadge/ABadge";
import { AButton } from "./components/atoms/AButton/AButton";
import { ASpinner } from "./components/atoms/ASpinner/ASpinner";
import { ATextarea } from "./components/atoms/ATextarea/ATextarea";

export const App = () => (
  <main className="mx-auto max-w-6xl px-4 py-10">
    <ABadge>Want to go</ABadge>
    <ABadge tone="green">Visited</ABadge>
    <AButton variant="danger">Testowy przycisk</AButton>
    <ASpinner title="ładowanie tabeli" />
    <ATextarea
      rows={5}
      maxLength={3}
    />
  </main>
);
