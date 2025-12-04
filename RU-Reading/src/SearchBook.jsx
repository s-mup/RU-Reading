import { useState, useEffect } from "react";

// Note: Pass 'addToReadingList' as a prop
export default function SearchBook({ addToReadingList }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("title");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function searchBooks() {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const url = `https://openlibrary.org/search.json?${type}=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      const data = await res.json();
      setResults(data.docs || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) searchBooks();
    }, 500);
    return () => clearTimeout(delay);
  }, [query, type]);

  return (
    <div className="page">
      <h1 className="title">RU Reading Book Search</h1>

      <div style={{ background: "#fff", padding: 20, borderRadius: 12, maxWidth: 500, margin: "0 auto 20px", border: "1px solid var(--border)" }}>
        <input
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid var(--border)", marginBottom: 10 }}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid var(--border)", marginBottom: 10 }}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        <button onClick={searchBooks} style={{ width: "100%" }}>Search</button>
      </div>

      {loading && <p className="muted">Loading...</p>}

      <div className="results">
        {results.map((book, i) => {
          const coverUrl = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/128x180?text=No+Cover";

          return (
            <div className="book" key={i}>
              <img src={coverUrl} alt={book.title} />
              <h3>{book.title}</h3>
              <p className="author">
                {book.author_name ? book.author_name[0] : "Unknown Author"}
              </p>
              <button
                onClick={() =>
                  addToReadingList({
                    key: book.key,
                    title: book.title,
                    author: book.author_name ? book.author_name[0] : "Unknown",
                    coverUrl: coverUrl,
                  })
                }
              >
                + Add to List
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
