import { Link } from "react-router-dom";
import "./Home.css";

/*export default function Home() {
  return (
    <div className="home-page">
      <h1 className="home-title">Welcome</h1>

      <div className="nav-buttons">
        <Link to="/genre" className="nav-btn">
          Browse by Genre
        </Link>

        <Link to="/books" className="nav-btn">
          Book Search
        </Link>
      </div>
    </div>
  );
}*/
import { useState, useEffect } from "react";
import SearchBook from "./SearchBook";
import Genre from "./Genre";
import ReadingList from "./ReadingList";

export default function Home() {
  // 1. CHANGE DEFAULT: Start directly on "search" instead of "home"
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
      alert(`This book is added!`);
    } else {
      alert("This book is already in your list.");
    }
  };

  const removeFromList = (bookKey) => {
    setReadingList(readingList.filter((b) => b.key !== bookKey));
  };

  return (
    <div className="app-container">
      {/* 2. UPDATE NAV: Removed the "Home" button */}
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

      {/* 3. CONTENT AREA: Removed the "Home" welcome message block */}
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
  );
}