interface InputTextProps {
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  required?: boolean;
}
export default function InputText({
  name,
  label,
  type = "text",
  placeholder = "",
  required = false,
}: Readonly<InputTextProps>) {
  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block pl-2 mb-2 text-sm font-medium text-gray-900 "
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className="block w-full p-4 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-100 text-base placeholder:text-gray-400 focus:ring-primary focus:border-primary "
      ></input>
    </div>
  );
}
