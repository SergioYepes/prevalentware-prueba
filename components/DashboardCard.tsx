interface Props {
  title: string;
  onClick?: () => void;
}

export default function DashboardCard({ title, onClick }: Props) {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 text-xl font-medium cursor-pointer hover:bg-gray-100 transition"
      onClick={onClick}
    >
      {title}
    </div>
  );
}