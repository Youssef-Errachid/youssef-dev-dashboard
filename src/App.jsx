import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Overview from "./pages/Overview";
import "./App.css";

const GITHUB_USERNAME = "Youssef-Errachid";

function App() {
  const [activePage, setActivePage] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGitHubData() {
      try {
        setLoading(true);
        setError("");

        const [profileResponse, reposResponse, eventsResponse] =
          await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
            fetch(
              `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
            ),
            fetch(
              `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`,
            ),
          ]);

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error(
            "GitHub could not return your profile or repositories. Check the username and API rate limit.",
          );
        }

        const profileData = await profileResponse.json();
        const reposData = await reposResponse.json();

        const eventsData = eventsResponse.ok ? await eventsResponse.json() : [];

        setProfile(profileData);
        setRepositories(reposData);
        setEvents(Array.isArray(eventsData) ? eventsData : []);
      } catch (err) {
        setError(
          err.message || "Something went wrong while loading GitHub data.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadGitHubData();
  }, []);

  const pageInfo = {
    overview: {
      title: "Overview",
      subtitle: "Your development workspace at a glance.",
    },
    repositories: {
      title: "Repositories",
      subtitle: "Explore and manage your public projects.",
    },
    activity: {
      title: "Activity",
      subtitle: "Keep track of your latest GitHub activity.",
    },
  };

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        <Header
          title={pageInfo[activePage].title}
          subtitle={pageInfo[activePage].subtitle}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="page-content">
          {profile ? (
            <Overview
              profile={profile}
              repositories={repositories}
              events={events}
              loading={loading}
              error={error}
              activePage={activePage}
              searchQuery={searchQuery}
            />
          ) : loading ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              <p>Connecting to GitHub...</p>
            </div>
          ) : (
            <div className="error-state">
              <h2>Unable to load dashboard</h2>
              <p>{error}</p>
              <button
                className="primary-button"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          )}
        </div>

        <footer className="app-footer">
          <span>© {new Date().getFullYear()} Youssef Developer Dashboard</span>
          <span>Built with React & GitHub API</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
