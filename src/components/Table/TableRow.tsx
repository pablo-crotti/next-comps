export default function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <tr className="odd:bg-gray-100 even:bg-gray-200 border-b border-gray-200">
      {children}
    </tr>
  );
}
