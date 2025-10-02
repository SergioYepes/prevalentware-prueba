interface Props {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const DashboardCard: React.FC<Props> = ({ title, subtitle, icon, onClick }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition"
      onClick={onClick}
    >
      {icon && <div className="text-gray-600">{icon}</div>}
      <div>
        <div className="text-xl font-medium">{title}</div>
        {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
      </div>
    </div>
  );
};
export default DashboardCard;