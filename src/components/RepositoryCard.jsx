import { Star, GitFork, ExternalLink, BookOpen } from "lucide-react";

function RepositoryCard({ repo }) {
  return (
    <article className="repository-card">
      <div className="repo-card-top">
        <div className="repo-icon">
          <BookOpen size={19} />
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="repo-external"
          aria-label={`Open ${repo.name}`}
        >
          <ExternalLink size={17} />
        </a>
      </div>

      <h3>{repo.name}</h3>

      <p className="repo-description">
        {repo.description || "No description provided for this repository."}
      </p>

      <div className="repo-footer">
        <div className="repo-language">
          {repo.language && (
            <>
              <span className="language-dot" />
              {repo.language}
            </>
          )}
        </div>

        <div className="repo-metrics">
          <span>
            <Star size={15} /> {repo.stargazers_count}
          </span>
          <span>
            <GitFork size={15} /> {repo.forks_count}
          </span>
        </div>
      </div>
    </article>
  );
}

export default RepositoryCard;
