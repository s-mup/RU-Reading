import { useState } from 'react';
import './Genre.css';
import BookList from "./BookList.jsx";

// 1. Accept the prop here
function Genre({ addToReadingList }) {
  const [selectedGenre, setSelectedGenre] = useState('love');

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <div> 
      <header> 
          <h1> RU Reading?</h1>
      </header>
      <h1>Book Recommender By Genre</h1> 
      <h2>Choose a genre below:</h2>

      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="adventure">Adventure</option>
        <option value="art">Art</option>
        <option value="autobiography">Autobiography</option>
        <option value="biology">Biology</option>
        <option value="biography">Biography</option>
        <option value="business">Business</option>
        <option value="chemistry">Chemistry</option>
        <option value="children">Children</option>
        <option value="classics">Classics</option>
        <option value="computers">Computers</option>
        <option value="cooking">Cooking</option>
        <option value="drama">Drama</option>
        <option value="economics">Economics</option>
        <option value="education">Education</option>
        <option value="fantasy">Fantasy</option>
        <option value="health">Health</option>
        <option value="historical fiction">Historical Fiction</option>
        <option value="history">History</option>
        <option value="horror">Horror</option>
        <option value="mathematics">Mathematics</option>
        <option value="medicine">Medicine</option>
        <option value="music">Music</option>
        <option value="philosophy">Philosophy</option>
        <option value="photography">Photography</option>
        <option value="physics">Physics</option>
        <option value="poetry">Poetry</option>
        <option value="politics">Politics</option>
        <option value="programming">Programming</option>
        <option value="psychology">Psychology</option>
        <option value="religion">Religion</option>
        <option value="romance">Romance</option>
        <option value="science">Science</option>
        <option value="science fiction">Science Fiction</option>
        <option value="self-help">Self-Help</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="thriller">Thriller</option>
        <option value="travel">Travel</option>
        <option value="young adult">Young Adult</option>
      </select>

      {/* 2. Pass the prop down to the child */}
      <BookList genre={selectedGenre} addToReadingList={addToReadingList} />
    </div>
  );
}

export default Genre;