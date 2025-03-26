interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  level?: "primary" | "secondary" | "danger";
  icon?: React.ReactNode;
  [key: string]: any;
  onClick?: () => void;
}

export default function Button({
  text,
  type = "button",
  level = "primary",
  icon,
  onClick,
  ...rest
}: Readonly<ButtonProps>) {
  let tsCss;
  switch (level) {
    case "primary":
      tsCss = "text-white bg-primary hover:bg-primary-highlight";
      break;
    case "secondary":
      tsCss = "text-gray-800 bg-gray-200 hover:bg-gray-300";
      break;
    case "danger":
      tsCss = "text-white bg-red-500 hover:bg-red-400 dark:hover:bg-red-600";
      break;
    default:
      tsCss = "text-white bg-primary hover:bg-primary-highlight";
      break;
  }

  return (
    <button
      className={`block ${tsCss} focus:outline-none font-semibold rounded-lg px-4 py-2.5 text-center flex items-center cursor-pointer duration-300`}
      type={type}
      {...rest}
    >
      {text}
      {icon && <span className="ms-4">{icon}</span>}
    </button>
  );
}
