# Zadanie: zbuduj `MEmptyState`

Przed chwilą napisaliśmy razem `MFormField`. Teraz zrób samodzielnie podobną, prostą molekułę. Masz około 10 minut.

## Co ma powstać

Biała karta, którą pokażemy, gdy lista miejsc będzie pusta. Ma tytuł, krótki opis i czasem przycisk pod spodem:

```text
          No matching places
Try another search or clear the filters.
           [ Clear filters ]
```

Przycisk nie jest obowiązkowy. Jeśli rodzic go nie poda, karta kończy się na opisie. To ten sam pomysł co komunikat błędu w `MFormField`, który też pojawiał się tylko czasem.

## Krok po kroku

1. **Plik.** Utwórz `MEmptyState.tsx` w folderze `src/components/molecules/MEmptyState`.

2. **Typ propsów.** Napisz typ `EmptyStateProps` z trzema propsami:
   - `title` to tekst,
   - `description` to tekst,
   - `action` jest opcjonalne i ma typ `ReactNode`, czyli „cokolwiek, co React umie wyświetlić”: przycisk, link albo zwykły tekst.

   `ReactNode` zaimportuj tak samo jak w `MFormField`: `import type { ReactNode } from "react";`

3. **Karta.** Komponent `MEmptyState` zwraca `<div>` z takim `className`:

   ```tsx
   className={["rounded-xl border border-line/40 bg-surface", "grid gap-3 p-8 text-center"].join(" ")}
   ```

   Klasy są podzielone na dwie grupy, żeby dało się je przeczytać. Pierwsza to wygląd karty, druga to układ w środku.

4. **Tytuł i opis.** W środku karty wstaw `<h2 className="text-lg font-semibold">` z tytułem, a pod nim `<p className="text-muted">` z opisem.

5. **Przycisk tylko czasem.** Pod opisem pokaż `action` w osobnym `<div>`, ale tylko wtedy, gdy rodzic je podał. Zrób to tak samo jak komunikat błędu w `MFormField`, czyli za pomocą `&&`.

## Sprawdź, czy działa

W `App.tsx` zaimportuj `MEmptyState` i wstaw dwie karty, jedną bez przycisku i jedną z przyciskiem:

```tsx
<MEmptyState
  title="No matching places"
  description="Try another search or clear the filters."
/>
<MEmptyState
  title="No matching places"
  description="Try another search or clear the filters."
  action={<AButton variant="secondary">Clear filters</AButton>}
/>
```

Powinny pojawić się dwie białe karty z wyśrodkowanym tekstem. Pierwsza kończy się na opisie, druga ma pod opisem przycisk.

## Gdy coś nie działa

- **Edytor podkreśla pierwszą kartę i pisze, że brakuje `action`.** W typie zabrakło znaku zapytania. Ma być `action?:`.
- **Pierwsza karta ma pod opisem trochę za dużo miejsca.** Pusty `<div>` na przycisk rysuje się zawsze. Powinien być w środku warunku z `&&`.
- **Edytor podkreśla import `ReactNode`.** Typy importujemy przez `import type`, a nie samo `import`.

## Dla chętnych

Przekaż w `action` zwykły tekst albo link zamiast przycisku. Nie powinno to wymagać żadnej zmiany w `MEmptyState`.
