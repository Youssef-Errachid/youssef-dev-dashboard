import {
  Star,
  GitFork,
  Users,
  BookOpen,
  Code2,
  ExternalLink,
  GitCommit,
  GitPullRequest,
  CircleDot,
} from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

import StatCard from "../components/StatCard";
import RepositoryCard from "../components/RepositoryCard";

function Overview({
  profile,
  repositories,
  events,
  loading,
  error,
  activePage,
  searchQuery,
}) {
  const totalStars = repositories.reduce(
    (total, repo) => total + repo.stargazers_count,
    0,
  );

  const totalForks = repositories.reduce(
    (total, repo) => total + repo.forks_count,
    0,
  );

  const languageCounts = repositories.reduce((counts, repo) => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
    return counts;
  }, {});

  const languages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const filteredRepos = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const featuredNames = [
    "intelligent-document-audio-search--system-",
    "healthcare",
    "finpay",
    "mini-boutique",
  ];

  const featuredRepos = repositories.filter((repo) =>
    featuredNames.some((name) => repo.name.toLowerCase().includes(name)),
  );

  const displayedRepos = featuredRepos.length
    ? featuredRepos
    : repositories.filter((repo) => !repo.fork).slice(0, 4);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const eventIcon = (type) => {
    if (type === "PushEvent") return <GitCommit size={17} />;
    if (type === "PullRequestEvent") return <GitPullRequest size={17} />;
    if (type === "IssuesEvent") return <CircleDot size={17} />;
    return <SiGithub size={17} />;
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <p>Loading your GitHub dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <SiGithub size={35} />
        <h2>Unable to load GitHub data</h2>
        <p>{error}</p>
        <p>Please check your internet connection and try again.</p>
      </div>
    );
  }

  if (activePage === "repositories") {
    return (
      <section className="content-section">
        <div className="section-heading">
          <div>
            <h2>All Repositories</h2>
            <p>Explore your public GitHub projects.</p>
          </div>
          <span className="count-badge">
            {filteredRepos.length} repositories
          </span>
        </div>

        {filteredRepos.length ? (
          <div className="repositories-grid">
            {filteredRepos.map((repo) => (
              <RepositoryCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <div className="empty-state">No repositories match your search.</div>
        )}
      </section>
    );
  }

  if (activePage === "activity") {
    return (
      <section className="content-section">
        <div className="section-heading">
          <div>
            <h2>Recent Activity</h2>
            <p>Your latest public GitHub events.</p>
          </div>
        </div>

        <div className="activity-list">
          {events.length ? (
            events.map((event) => (
              <div className="activity-item" key={event.id}>
                <div className="activity-icon">{eventIcon(event.type)}</div>
                <div className="activity-details">
                  <strong>{event.type.replace("Event", "")}</strong>
                  <p>{event.repo?.name || "GitHub activity"}</p>
                  <span>{formatDate(event.created_at)}</span>
                </div>
                <a
                  href={`https://github.com/${event.repo?.name || ""}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open repository"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            ))
          ) : (
            <div className="empty-state">
              No recent public activity is available.
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="welcome-banner">
        <div className="welcome-content">
          <span className="eyebrow">YOUR DEVELOPER WORKSPACE</span>
          <h2>
            Welcome back, <span>Youssef</span> 👋
          </h2>
          <p>Here's an overview of your development activity and projects.</p>

          <a
            href="https://github.com/Youssef-Errachid"
            target="_blank"
            rel="noreferrer"
            className="primary-button"
          >
            <SiGithub size={17} />
            View GitHub Profile
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="welcome-decoration">
          <Code2 size={105} strokeWidth={1} />
        </div>
      </section>

      <section className="stats-grid">
        <StatCard
          title="Public Repositories"
          value={profile.public_repos}
          description="Public projects on GitHub"
          icon={BookOpen}
          color="blue"
        />

        <StatCard
          title="Total Stars"
          value={totalStars}
          description="Stars across your repositories"
          icon={Star}
          color="yellow"
        />

        <StatCard
          title="Followers"
          value={profile.followers}
          description={`${profile.following} following`}
          icon={Users}
          color="purple"
        />

        <StatCard
          title="Total Forks"
          value={totalForks}
          description="Forks across your repositories"
          icon={GitFork}
          color="green"
        />
      </section>

      <div className="dashboard-grid">
        <section className="content-section">
          <div className="section-heading">
            <div>
              <h2>Featured Projects</h2>
              <p>A selection of your development work.</p>
            </div>
            <a
              href="https://github.com/Youssef-Errachid?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              View all <ExternalLink size={14} />
            </a>
          </div>

          {displayedRepos.length ? (
            <div className="repositories-grid">
              {displayedRepos.slice(0, 4).map((repo) => (
                <RepositoryCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <div className="empty-state">No public repositories found.</div>
          )}
        </section>

        <aside className="right-column">
          <section className="panel">
            <div className="panel-heading">
              <h2>Languages</h2>
              <Code2 size={18} />
            </div>

            {languages.length ? (
              <div className="language-list">
                {languages.map(([language, count]) => {
                  const percentage = Math.round(
                    (count / repositories.length) * 100,
                  );

                  return (
                    <div className="language-item" key={language}>
                      <div className="language-label">
                        <span>{language}</span>
                        <span>{count} repos</span>
                      </div>
                      <div className="language-track">
                        <div
                          className="language-progress"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="muted-text">No language data available yet.</p>
            )}
          </section>

          <section className="panel">
            <div className="panel-heading">
              <h2>GitHub Profile</h2>
              <SiGithub size={18} />
            </div>

            <div className="github-profile">
              <img
                src={profile.avatar_url}
                alt="GitHub avatar"
                className="github-avatar"
              />
              <div>
                <strong>{profile.name || profile.login}</strong>
                <span>@{profile.login}</span>
              </div>
            </div>

            <p className="profile-bio">
              {profile.bio || "Developer building useful things with code."}
            </p>

            {profile.location && (
              <p className="profile-location">📍 {profile.location}</p>
            )}

            <a
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
              className="profile-button"
            >
              Open GitHub Profile <ExternalLink size={14} />
            </a>
          </section>
        </aside>
      </div>

      <section className="content-section activity-preview">
        <div className="section-heading">
          <div>
            <h2>Recent Activity</h2>
            <p>Your latest public GitHub events.</p>
          </div>
        </div>

        {events.length ? (
          <div className="activity-list">
            {events.slice(0, 5).map((event) => (
              <div className="activity-item" key={event.id}>
                <div className="activity-icon">{eventIcon(event.type)}</div>
                <div className="activity-details">
                  <strong>{event.type.replace("Event", "")}</strong>
                  <p>{event.repo?.name || "GitHub activity"}</p>
                  <span>{formatDate(event.created_at)}</span>
                </div>
                <a
                  href={`https://github.com/${event.repo?.name || ""}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open repository"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            No recent public activity available.
          </div>
        )}
      </section>
    </>
  );
}

export default Overview;
