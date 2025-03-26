interface TableCellProps {
  isFirst?: boolean;
  hiddenOnMobile?: boolean;
  children: React.ReactNode;
}

export default function TableCell({
  isFirst,
  hiddenOnMobile,
  children,
}: Readonly<TableCellProps>) {
  if (isFirst) {
    return (
      <th
        scope="row"
        className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap ${
          hiddenOnMobile ? "max-md:hidden" : ""
        }`}
      >
        {children}
      </th>
    );
  } else {
    return (
      <td className={`px-6 py-4 ${hiddenOnMobile ? "max-md:hidden" : ""}`}>
        {children}
      </td>
    );
  }
}
