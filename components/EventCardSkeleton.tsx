const EventCardSkeleton = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      borderRadius: "14px",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.06)",
      background: "rgba(255,255,255,0.025)",
    }}
  >
    {/* Image placeholder with shimmer */}
    <div
      className="skeleton-shimmer"
      style={{ height: "200px", borderRadius: 0 }}
    />
    {/* Body */}
    <div style={{ padding: "14px 16px 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <div className="skeleton-shimmer" style={{ height: "11px", width: "45%", borderRadius: "6px" }} />
      <div className="skeleton-shimmer" style={{ height: "16px", width: "90%", borderRadius: "6px", marginTop: "3px" }} />
      <div className="skeleton-shimmer" style={{ height: "16px", width: "70%", borderRadius: "6px" }} />
      <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
        <div className="skeleton-shimmer" style={{ height: "11px", width: "80px", borderRadius: "6px" }} />
        <div className="skeleton-shimmer" style={{ height: "11px", width: "64px", borderRadius: "6px" }} />
      </div>
    </div>
  </div>
);

export default EventCardSkeleton;
