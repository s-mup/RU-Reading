import React from "react";

export default function ReadingList({ readingList, removeBook }) {
  return (
    <div className="page">
      <h1 className="title">My Reading List</h1>
      
      {readingList.length === 0 ? (
        <p style={{ textAlign: "center" }}>No books added yet.</p>
      ) : (
        <div className="results">
          {readingList.map((book) => (
            <div className="book" key={book.key}>
              <img src={book.coverUrl} alt={book.title} />
              <h3>{book.title}</h3>
              <p className="author">{book.author}</p>
              {/* Button to remove from list */}
              <button 
                className="remove-btn" 
                onClick={() => removeBook(book.key)}
                style={{ backgroundColor: "#ff4d4d", marginTop: "10px" }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}