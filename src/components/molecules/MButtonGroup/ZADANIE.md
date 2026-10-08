# Zadanie: zbuduj `MButtonGroup`

Przed chwilą napisaliśmy razem `MTable`. Teraz spróbuj samodzielnie zrobić prostszą molekułę opartą na tym samym pomyśle. Masz około 20 minut.

## Co ma powstać

Rząd przycisków, z których jeden jest zaznaczony, czyli ciemny:

```text
[ All places 5 ]  [ Want to go 3 ]  [ Visited 2 ]
```

Komponent sam niczego nie pamięta, więc nie ma w nim `useState`. Rodzic mówi mu, który przycisk jest zaznaczony (`value`), a komponent daje znać o kliknięciu (`onChange`). Tak samo działa `AInput`.

Komponent nie wie też, co pokazuje. Napisy, liczby i wartości dostaje w propsach, tak jak `MTable` dostawał kolumny.

## Krok po kroku

1. **Plik.** Utwórz `MButtonGroup.tsx` w folderze `src/components/molecules/MButtonGroup` i zaimportuj `AButton` z `@/components/atoms/AButton/AButton`.

2. **Typ jednej opcji.** Napisz i wyeksportuj typ `ButtonGroupOption<Value>` z trzema polami: `value` typu `Value`, `label` (napis na przycisku) i `count` (liczba obok napisu). `Value` to typ, którego jeszcze nie znamy, tak jak `Item` w tabeli.

3. **Typ propsów.** Napisz typ `ButtonGroupProps<Value>` z czterema propsami:
   - `label` to nazwa całej grupy dla czytnika ekranu,
   - `options` to tablica opcji z kroku 2,
   - `value` to wartość zaznaczonego przycisku,
   - `onChange` to funkcja, która dostaje wartość klikniętego przycisku: `(value: Value) => void`.

4. **Szkielet komponentu.** Zacznij od tego:

   ```tsx
   export const MButtonGroup = <Value extends string>({
     label,
     options,
     value,
     onChange,
   }: ButtonGroupProps<Value>) => (
     <div
       role="group"
       aria-label={label}
       className="flex flex-wrap gap-2"
     >
       {/* tu będą przyciski */}
     </div>
   );
   ```

   `extends string` znaczy „`Value` jest jakimś tekstem”. Potrzebujemy tego, bo za chwilę użyjemy wartości jako `key`.

5. **Przyciski.** W środku `<div>` przejdź po `options` metodą `map`. Dla każdej opcji zwróć `AButton` w wariancie `secondary`, z `key={option.value}`. W przycisku pokaż napis, a za nim liczbę w znaczniku `<span>`.

6. **Zaznaczenie.** Przycisk jest zaznaczony wtedy, gdy jego wartość jest równa `value` z propsów. Wynik tego porównania przekaż w atrybucie `aria-pressed`. Stylów nie piszesz, bo `AButton` ma już ciemne tło dla wciśniętego przycisku.

7. **Kliknięcie.** Po kliknięciu wywołaj `onChange` z wartością tej opcji. Pamiętaj o `() =>` na początku: `onClick={() => onChange(option.value)}`.

## Sprawdź, czy działa

W `App.tsx` zaimportuj `useState` i `MButtonGroup`, a potem dodaj stan:

```tsx
const [status, setStatus] = useState("all");
```

i sam komponent:

```tsx
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
```

Na początku ciemny jest „All places”. Po kliknięciu „Visited” to on robi się ciemny, a tekst pod spodem zmienia się na „Wybrano: visited”.

## Gdy coś nie działa

- **Klikam i nic się nie zmienia.** Sprawdź, czy w `App.tsx` przekazujesz i `value`, i `onChange`.
- **Od razu zaznaczony jest ostatni przycisk.** W `onClick` brakuje `() =>`.
- **W konsoli jest ostrzeżenie o `key`.** Dodaj `key` do `AButton` wewnątrz `map`.

## Dla chętnych

Użyj komponentu drugi raz z innymi danymi, na przykład z rozmiarami „Mały”, „Średni” i „Duży”. Nie powinno to wymagać żadnej zmiany w `MButtonGroup`.
