import { useEffect, useState } from 'react';

const API_BASE_URL = "https://openlibrary.org";

function BookList({ genre }) {
  // Local UI state for results, loading spinner, and error text
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // start null so we can conditionally render cleanly

  useEffect(() => {
    // If no subject provided, skip fetch
    if (!genre) return;

    // A flag to avoid state updates if the component unmounts or the genre changes mid-request
    let cancelled = false;

    // Fetches books for the given subject from OpenLibrary
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      setWorks([]); // clear old results while loading new ones

      try {
        // encodeURIComponent guards against spaces or special characters in the subject
        const url = `${API_BASE_URL}/subjects/${encodeURIComponent(genre)}.json?limit=20`;
        const response = await fetch(url);

        // Surface HTTP layer errors
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        // Parse JSON and set results if we are still mounted
        const data = await response.json();
        if (!cancelled) {
          // OpenLibrary returns { works: [...] } for /subjects
          setWorks(Array.isArray(data.works) ? data.works : []);
        }
      } catch (e) {
        // Show a friendly message if something goes wrong
        if (!cancelled) setError(e.message || "Failed to fetch book data.");
        console.error(e);
      } finally {
        // End the loading state if still mounted
        if (!cancelled) setLoading(false);
      }
    };

    // Kick off the request
    fetchBooks();

    // Cleanup flips the flag so late responses do not set state after unmount
    return () => { cancelled = true; };
  }, [genre]); // Re-run every time the subject changes

  return (
    <div className="app"> 
      
      <h1>Recommendations</h1>

      {/* Feedback states */}
      {error && <p className="error">{error}</p>}
      {loading && <p className="muted">Loading...</p>}
      {!loading && !error && works.length === 0 && <p className="muted">No results yet.</p>}

      {/* Results list */}
      <ul className="works">
        {works.map((w) => (
          <li key={w.key} className="work">
            {/* Cover image, if available */}
            {w.cover_id && (
              <img
                alt={w.title}
                src={`https://covers.openlibrary.org/b/id/${w.cover_id}-M.jpg`}
              />
            )}

            <div>
              {/* Title */}
              <h3>{w.title}</h3>

              {/* Authors, if present */}
              {w.authors?.length ? (
                <p>by {w.authors.map((a) => a.name).join(", ")}</p>
              ) : null}

              {/* A couple of quick facts */}
              <p>
                Editions: {w.edition_count ?? "N/A"}. Full text: {w.has_fulltext ? "Yes" : "No"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList; // Export so App.jsx can import and render <BookList genre="..." />