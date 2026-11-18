import { Search, Bell, ExternalLink } from "lucide-react";

function Header({ title, subtitle, searchQuery, setSearchQuery }) {
  return (
    <header className="topbar">
      <div className="page-heading">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <Search size={17} />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <kbd>/</kbd>
        </div>

        <a
          href="https://github.com/Youssef-Errachid"
          target="_blank"
          rel="noreferrer"
          className="icon-button"
          aria-label="Open GitHub profile"
        >
          <ExternalLink size={18} />
        </a>

        <div className="topbar-avatar">Y</div>
      </div>
    </header>
  );
}

export default Header;
