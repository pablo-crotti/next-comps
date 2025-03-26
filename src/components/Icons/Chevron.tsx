import { IconProps } from "./IconProps";
import IconContainer from "./IconContainer";

export default function User({
  size = "6",
  isFilled = true,
}: Readonly<IconProps>) {
  return (
    <IconContainer size={size} isFilled={isFilled} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </IconContainer>
  );
}
