import { useState, useEffect } from "react";
import "./Genre.css";
import SearchBook from "./SearchBook";
import Genre from "./Genre";
import ReadingList from "./ReadingList";

export default function Home() {
  // Default to Search Title
  const [currentTab, setCurrentTab] = useState("search");
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    const savedList = localStorage.getItem("myReadingList");
    if (savedList) setReadingList(JSON.parse(savedList));
  }, []);

  useEffect(() => {
    localStorage.setItem("myReadingList", JSON.stringify(readingList));
  }, [readingList]);

  const addToReadingList = (book) => {
    if (!readingList.some((b) => b.key === book.key)) {
      setReadingList([...readingList, book]);
      alert("This book is added!");
    } else {
      alert("This book is already in your list.");
    }
  };

  const removeFromList = (bookKey) => {
    setReadingList(readingList.filter((b) => b.key !== bookKey));
  };

  return (
    <>
      <header>
        <h1>RU Reading?</h1>
        <p>Find books by title or subject, then build your reading list.</p>
      </header>

      <div className="app-container">
        <nav className="navbar">
          <button
            className={currentTab === 'search' ? 'active' : ''}
            onClick={() => setCurrentTab("search")}
          >
            Search Title
          </button>

          <button
            className={currentTab === 'genre' ? 'active' : ''}
            onClick={() => setCurrentTab("genre")}
          >
            Search Genre
          </button>

          <button
            className={currentTab === 'list' ? 'active' : ''}
            onClick={() => setCurrentTab("list")}
          >
            Reading List ({readingList.length})
          </button>
        </nav>

        <div className="content">
          {currentTab === "search" && (
            <SearchBook addToReadingList={addToReadingList} />
          )}

          {currentTab === "genre" && (
            <Genre addToReadingList={addToReadingList} />
          )}

          {currentTab === "list" && (
            <ReadingList readingList={readingList} removeBook={removeFromList} />
          )}
        </div>
      </div>
    </>
  );
}
