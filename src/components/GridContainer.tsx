interface GridContainerProps {
  cols?: string;
  children: React.ReactNode;
}

export default function GridContainer({
  cols = "4",
  children,
}: Readonly<GridContainerProps>) {
  let tsClass;

  switch (cols) {
    case "1":
      tsClass = "grid-cols-1";
      break;
    case "2":
      tsClass = "grid-cols-1 md:grid-cols-2";
      break;
    case "3":
      tsClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      break;
    case "4":
      tsClass = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ";
      break;
    default:
      cols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      break;
  }

  return <div className={`grid ${tsClass} gap-4 mb-8`}>{children}</div>;
}
