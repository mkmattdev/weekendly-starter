import { ABadge } from "./components/atoms/ABadge/ABadge";
import { AButton } from "./components/atoms/AButton/AButton";
import { AInput } from "./components/atoms/AInput/AInput";
import { ASpinner } from "./components/atoms/ASpinner/ASpinner";
import { ATextarea } from "./components/atoms/ATextarea/ATextarea";
import { MEmptyState } from "./components/molecules/MEmptyState/MEmptyState";
import { MFormField } from "./components/molecules/MFormField/MFormField";

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
  </main>
);
