import { useState, useEffect } from "react";

export default function BookList({ genre, addToReadingList }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        // The Subjects API is different from the Search API
        const res = await fetch(`https://openlibrary.org/subjects/${genre}.json`);
        const data = await res.json();
        setBooks(data.works || []);
      } catch (err) {
        console.error("Failed to fetch books", err);
      }
      setLoading(false);
    }

    if (genre) {
      fetchBooks();
    }
  }, [genre]);

  if (loading) return <p>Loading {genre} books...</p>;

  return (
    <div className="results">
      {books.map((work) => {
        // Format data to match the structure expected by App.js
        const coverUrl = work.cover_id
          ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`
          : "https://via.placeholder.com/128x180?text=No+Cover";
          
        const authorName = work.authors && work.authors.length > 0 
          ? work.authors[0].name 
          : "Unknown Author";

        return (
          <div className="book" key={work.key}>
            <img src={coverUrl} alt={work.title} />
            <h3>{work.title}</h3>
            <p className="author">{authorName}</p>

            {/* The Add Button */}
            <button
              style={{ marginTop: "10px", backgroundColor: "#4CAF50" }}
              onClick={() =>
                addToReadingList({
                  key: work.key,
                  title: work.title,
                  author: authorName,
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
  );
}