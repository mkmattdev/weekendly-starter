import { useId, type ReactNode } from "react";

export type TableColumn<Item> = {
  id: string;
  header: string;
  render: (item: Item) => ReactNode;
};

type TableProps<Item> = {
  columns: readonly TableColumn<Item>[];
  items: readonly Item[];
  getItemKey: (item: Item) => string;
  caption: string;
};

export const MTable = <Item extends object>({
  columns,
  items,
  getItemKey,
  caption,
}: TableProps<Item>) => {
  const captionId = useId();

  return (
    <div
      role="region"
      aria-labelledby={captionId}
      tabIndex={0}
      className="overflow-x-auto rounded-xl border border-line/40 bg-surface"
    >
      <table>
        <caption
          id={captionId}
          className="sr-only"
        >
          {caption}
        </caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={[
                  "border-b border-line/40 px-3 py-4",
                  "text-xs font-semibold text-muted uppercase",
                ].join(" ")}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={getItemKey(item)}
              className="border-b border-line/40 last:border-b-0 hover:bg-surface-muted"
            >
              {columns.map((column) => (
                <td
                  key={column.id}
                  className="px-3 py-4"
                >
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
