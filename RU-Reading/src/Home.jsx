import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
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
}
