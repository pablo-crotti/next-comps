interface IconContainerProps {
  size?: string;
  isFilled?: boolean;
  viewBox: string;
  children: React.ReactNode;
}

export default function IconContainer({
  size = "6",
  isFilled = true,
  children,
  viewBox,
}: Readonly<IconContainerProps>) {
  return (
    <svg
      className={`w-${size} h-${size}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={isFilled ? "0" : "1.5"}
      viewBox={viewBox}
    >
      {children}
    </svg>
  );
}
