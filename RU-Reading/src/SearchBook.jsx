import { useState, useEffect } from "react";
import "./SearchBook.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("title");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  
  async function searchBooks() {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const url = `https://openlibrary.org/search.json?${type}=${encodeURIComponent(
        query
      )}`;
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
      if (query.trim()) {
        searchBooks();
      }
    }, 500); 

    return () => clearTimeout(delay);
  }, [query, type]); 

  return (
    <div className="page">
      <h1 className="title">OpenLibrary Book Search</h1>

      <div className="search-box">
        <input
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="title">Search by Title</option>
          <option value="author">Search by Author</option>
        </select>

        
        <button onClick={searchBooks}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

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

              <p className="year">
                {book.first_publish_year
                  ? book.first_publish_year
                  : "Year Not Available"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
