import { ReactNode, useEffect, useState } from "react";
import { Comment, fetchData, Post, User } from "./api";
import "./styles.css";

type StatusMap = {
  users: string;
  posts: string;
  comments: string;
};

type ErrorMap = {
  users: string;
  posts: string;
  comments: string;
};

type StatusValue = "Зарежда се..." | "Заредено" | "Грешка";

type SectionProps<T extends { id: number }> = {
  title: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  error: string;
};

const initialStatuses: StatusMap = {
  users: "Зарежда се...",
  posts: "Зарежда се...",
  comments: "Зарежда се..."
};

const initialErrors: ErrorMap = {
  users: "",
  posts: "",
  comments: ""
};

function Section<T extends { id: number }>({ title, items, renderItem, error }: SectionProps<T>) {
  return (
    <section className="section">
      <div className="section-header">
        <h2>{title}</h2>
        {!error ? <span className="section-count">Брой: {items.length}</span> : null}
      </div>
      {error ? <p className="message error-message">{error}</p> : null}
      {!error && items.length === 0 ? <p className="message">Няма налични данни.</p> : null}
      {!error && items.length > 0 ? <ul>{items.map(renderItem)}</ul> : null}
    </section>
  );
}

function getStatusClass(status: StatusValue): string {
  if (status === "Заредено") {
    return "status-loaded";
  }

  if (status === "Грешка") {
    return "status-error";
  }

  return "status-loading";
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [statuses, setStatuses] = useState<StatusMap>(initialStatuses);
  const [errors, setErrors] = useState<ErrorMap>(initialErrors);
  const [elapsed, setElapsed] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function loadDashboard(): Promise<void> {
    const startTime = Date.now();

    setIsLoading(true);
    setStatuses(initialStatuses);
    setErrors(initialErrors);
    setUsers([]);
    setPosts([]);
    setComments([]);

    try {
      const [nextUsers, nextPosts, nextComments] = await Promise.all([
        fetchData<User[]>("/users"),
        fetchData<Post[]>("/posts?_limit=10"),
        fetchData<Comment[]>("/comments?_limit=20")
      ]);

      setUsers(nextUsers);
      setPosts(nextPosts);
      setComments(nextComments);
      setStatuses({
        users: "Заредено",
        posts: "Заредено",
        comments: "Заредено"
      });
      setElapsed(Date.now() - startTime);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Promise.all failed:", message);

      try {
        const [usersResult, postsResult, commentsResult] = await Promise.allSettled([
          fetchData<User[]>("/users"),
          fetchData<Post[]>("/posts?_limit=10"),
          fetchData<Comment[]>("/comments?_limit=20")
        ]);

        const nextStatuses: StatusMap = { ...initialStatuses };
        const nextErrors: ErrorMap = { ...initialErrors };

        if (usersResult.status === "fulfilled") {
          nextStatuses.users = "Заредено";
          setUsers(usersResult.value);
        } else {
          nextStatuses.users = "Грешка";
          nextErrors.users =
            "Грешка: " + (usersResult.reason instanceof Error ? usersResult.reason.message : "Unknown error");
        }

        if (postsResult.status === "fulfilled") {
          nextStatuses.posts = "Заредено";
          setPosts(postsResult.value);
        } else {
          nextStatuses.posts = "Грешка";
          nextErrors.posts =
            "Грешка: " + (postsResult.reason instanceof Error ? postsResult.reason.message : "Unknown error");
        }

        if (commentsResult.status === "fulfilled") {
          nextStatuses.comments = "Заредено";
          setComments(commentsResult.value);
        } else {
          nextStatuses.comments = "Грешка";
          nextErrors.comments =
            "Грешка: " + (commentsResult.reason instanceof Error ? commentsResult.reason.message : "Unknown error");
        }

        setStatuses(nextStatuses);
        setErrors(nextErrors);
        setElapsed(Date.now() - startTime);
      } catch (fallbackError) {
        const fallbackMessage = fallbackError instanceof Error ? fallbackError.message : "Unknown error";
        console.error("Promise.allSettled failed:", fallbackMessage);
        setStatuses({
          users: "Грешка",
          posts: "Грешка",
          comments: "Грешка"
        });
        setErrors({
          users: "Грешка: " + fallbackMessage,
          posts: "Грешка: " + fallbackMessage,
          comments: "Грешка: " + fallbackMessage
        });
        setElapsed(Date.now() - startTime);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadDashboard();
  }, []);

  const avgComments = posts.length > 0 ? comments.reduce((sum) => sum + 1, 0) / posts.length : 0;

  return (
    <div className="App">
      <h1>Async Data Dashboard</h1>
      <button className="reload-button" onClick={() => void loadDashboard()} type="button" disabled={isLoading}>
        Презареди
      </button>

      {isLoading ? <p className="message">Зарежда се...</p> : null}

      <div className="status-boxes">
        <div className={`box ${getStatusClass(statuses.users as StatusValue)}`}>Потребители: {statuses.users}</div>
        <div className={`box ${getStatusClass(statuses.posts as StatusValue)}`}>Постове: {statuses.posts}</div>
        <div className={`box ${getStatusClass(statuses.comments as StatusValue)}`}>Коментари: {statuses.comments}</div>
      </div>

      <section className="section">
        <div className="section-header">
          <h2>Статистика</h2>
        </div>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Брой потребители</span>
            <strong>{isLoading ? "Зарежда се..." : users.length}</strong>
          </div>
          <div className="stat-item">
            <span className="stat-label">Брой постове</span>
            <strong>{isLoading ? "Зарежда се..." : posts.length}</strong>
          </div>
          <div className="stat-item">
            <span className="stat-label">Среден брой коментари на пост</span>
            <strong>{isLoading ? "Зарежда се..." : avgComments.toFixed(2)}</strong>
          </div>
          <div className="stat-item">
            <span className="stat-label">Време за зареждане</span>
            <strong>{isLoading ? "Зарежда се..." : elapsed + " ms"}</strong>
          </div>
        </div>
      </section>

      <Section title="Потребители" items={users} error={errors.users} renderItem={(user) => <li key={user.id}>{user.name}</li>} />
      <Section title="Постове" items={posts} error={errors.posts} renderItem={(post) => <li key={post.id}>{post.title}</li>} />
      <Section
        title="Коментари"
        items={comments}
        error={errors.comments}
        renderItem={(comment) => <li key={comment.id}>{comment.name}</li>}
      />
    </div>
  );
}
