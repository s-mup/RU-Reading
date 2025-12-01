import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Genre from "./Genre.jsx";
import BookSearch from "./SearchBook.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/books" element={<BookSearch />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
