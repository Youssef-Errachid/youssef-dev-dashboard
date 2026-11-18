import {
  LayoutDashboard,
  FolderGit2,
  Activity,
  ExternalLink,
  UserRound,
} from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

const navigation = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "repositories", label: "Repositories", icon: FolderGit2 },
  { id: "activity", label: "Activity", icon: Activity },
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <a href="#overview" className="brand">
        <div className="brand-icon">
          <SiGithub size={23} />
        </div>

        <div>
          <h2>
            Youssef<span>.</span>
          </h2>
          <p>Developer Dashboard</p>
        </div>
      </a>

      <div className="sidebar-section-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        {navigation.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActivePage(id)}
            className={`nav-item ${activePage === id ? "active" : ""}`}
          >
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-profile">
          <div className="profile-avatar">Y</div>
          <div className="profile-info">
            <strong>Youssef Errachid</strong>
            <span>Full Stack Developer</span>
          </div>
        </div>

        <a
          className="github-link"
          href="https://github.com/Youssef-Errachid"
          target="_blank"
          rel="noreferrer"
        >
          <SiGithub size={17} />
          <span>GitHub Profile</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
