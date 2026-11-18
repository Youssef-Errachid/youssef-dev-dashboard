function StatCard({ title, value, description, icon: Icon, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        <Icon size={21} />
      </div>

      <p className="stat-title">{title}</p>

      <div className="stat-value">{value ?? "—"}</div>

      <p className="stat-description">{description}</p>
    </div>
  );
}

export default StatCard;
