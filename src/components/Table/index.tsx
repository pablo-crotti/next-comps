import { useEffect, useState } from "react";
import { Chevron } from "../Icons";

interface headerData {
  name: string;
  key: string;
  sortable?: boolean;
  default?: boolean;
  hiddenOnMobile?: boolean;
}

type SortDirections = "asc" | "desc";

interface TableProps {
  headerData: headerData[];
  lastRight?: boolean;
  children: React.ReactNode;
  onSort?: (key: string, sortDirection: SortDirections) => void;
}

export default function Table({
  headerData,
  lastRight,
  children,
  onSort,
}: Readonly<TableProps>) {
  interface SortedElement {
    key: string;
    direction: SortDirections;
  }

  const [sortedElement, setSortedElement] = useState<SortedElement | null>(
    null
  );

  const sort = (key: string) => {
    if (sortedElement?.key === key) {
      setSortedElement((prev) => {
        if (prev?.direction === "asc") {
          onSort?.(key, "desc");
          return { key, direction: "desc" };
        } else {
          onSort?.(key, "asc");
          return { key, direction: "asc" };
        }
      });
    } else {
      onSort?.(key, "asc");
      setSortedElement({ key, direction: "asc" });
    }
  };

  useEffect(() => {
    if (headerData.some((header) => header.default)) {
      const defaultHeader = headerData.find((header) => header.default);
      if (defaultHeader) {
        sort(defaultHeader.key);
      }
    }
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-300 ">
          <tr>
            {headerData.map((header, index) => (
              <th
                key={header.key}
                scope="col"
                className={`px-6 py-3 font-medium   ${
                  lastRight && index === headerData.length - 1
                    ? "text-right"
                    : ""
                } ${header.hiddenOnMobile ? "max-md:hidden" : ""}`}
              >
                {header.sortable && (
                  <button
                    className="flex items-center space-x-1 cursor-pointer uppercase"
                    onClick={() => {
                      sort(header.key);
                    }}
                  >
                    <span>{header.name}</span>
                    <span
                      className={`${
                        sortedElement?.key === header.key
                          ? sortedElement.direction === "asc"
                            ? "rotate-90"
                            : "rotate-[-90deg]"
                          : ""
                      }`}
                    >
                      <Chevron isFilled={false} size="4" />
                    </span>
                  </button>
                )}
                {!header.sortable && header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
