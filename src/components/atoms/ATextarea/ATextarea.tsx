import type { ComponentPropsWithRef } from "react";
import "./ATextarea.scss";

// ZADANIE: dokończ atom ATextarea.
//
// Style są gotowe (ATextarea.scss): klasa `textarea`, stan wyłączony przez `:disabled`,
// czerwona ramka przez atrybut `aria-invalid="true"`. Twoja część to komponent.
// Wzór masz obok: AInput.tsx — ATextarea ma działać dokładnie tak samo, tylko dla <textarea>.
//
// Krok 1. Typ propsów.
//   Zacznij od wszystkich natywnych propsów elementu <textarea> (ComponentPropsWithRef<"textarea">)
//   i dodaj do nich dwa nasze: isDisabled?: boolean oraz isInvalid?: boolean.
//   Dzięki temu można podać zarówno natywne `disabled`, jak i nasze `isDisabled`.
//
// Krok 2. Parametry komponentu.
//   Rozpakuj z propsów: isDisabled (domyślnie false), isInvalid (false), disabled (false),
//   className (""), rows (3), a całą resztę zbierz do `...textareaProps`.
//   `rows = 3` to jedyna różnica względem AInput: textarea ma domyślnie trzy linie.
//
// Krok 3. Render.
//   Zwróć <textarea> i po kolei:
//   - rozłóż na nim `{...textareaProps}` (wszystko, czego nie obsłużyliśmy ręcznie),
//   - `rows={rows}`,
//   - `disabled={disabled || isDisabled}` — wyłączony, gdy którakolwiek flaga jest prawdziwa,
//   - `aria-invalid={isInvalid || textareaProps["aria-invalid"] || undefined}` — `undefined`
//     sprawia, że atrybut w ogóle nie pojawia się w HTML, gdy pole jest poprawne,
//   - `className={["textarea", className].join(" ").trim()}` — nasza klasa BEM plus to,
//     co dołoży rodzic (np. klasa układu); `.trim()` usuwa spację, gdy className jest pusty.
//
// Krok 4. Przetestuj w App.tsx.
//   Zaimportuj ATextarea i wrzuć do App.tsx dwa warianty:
//
//     <ATextarea
//       aria-label="Opis"
//       placeholder="Co warto tu zobaczyć?"
//     />
//     <ATextarea
//       aria-label="Opis z błędem"
//       isInvalid
//       defaultValue="Za krótki opis"
//     />
//
//   Pierwszy ma być zwykłym polem na trzy linie, drugi ma czerwoną ramkę (to `aria-invalid`
//   z kroku 3 uruchamia styl z ATextarea.scss). Dorzuć trzeci z `isDisabled` i sprawdź,
//   czy pole jest wyszarzone i nie da się w nie pisać.

type TextareaProps = ComponentPropsWithRef<"textarea">;

export const ATextarea = (textareaProps: TextareaProps) => (
  <textarea
    {...textareaProps}
    className="textarea"
  />
);
