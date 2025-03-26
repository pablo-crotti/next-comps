import { IconProps } from "./IconProps";
import IconContainer from "./IconContainer";

export default function Squares({
  size = "6",
  isFilled = true,
}: Readonly<IconProps>) {
  return (
    <IconContainer size={size} isFilled={isFilled} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </IconContainer>
  );
}
