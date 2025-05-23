"use client";

import MovieCard from "@/components/MovieCard";
import { useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const searchMovies = async () => {
    if (!searchTerm) return;

    setError("");
    setLoading(true);
    setMovies([]);

    try {
      let url = `https://www.omdbapi.com/?apikey=2aac32d3&s=${searchTerm}`;
      if (year) url += `&y=${year}`;
      if (type) url += `&type=${type}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response: ", data);

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "Movies not found...");
      }
    } catch (error) {
      setError("Failed to find the Movie Searched, Please Try Again...");
    } finally {
      setLoading(false);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    searchMovies();
    console.log("Searching for", { searchTerm, year, type });
  }

  return (
    <>
      <main className="flex flex-col justify-between items-center min-h-screen bg-white">
        <nav className="bg-white p-4 w-full border-b border-gray-100 shadow-sm top-0 z-50">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM2 10a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
              </svg>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                <a href="/"> MovieApp </a>
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative flex items-center w-full max-w-md"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search movies..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
              <svg
                className="absolute left-3 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              
              <button
                type="button"
                onClick={() => setShowPopup(true)}
                className="absolute right-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Filter
              </button>
            </form>
          </div>
        </nav>

        {/* Search Results */}
        <div className="w-full flex-grow">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <h1 className="text-violet-500 text-2xl">Loading...</h1>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500 text-2xl">{error}</p>
            </div>
          ) : (
            <div className="w-full flex items-stretch justify-between flex-wrap px-2 py-6">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          )}
        </div>

        {/* Popup Overlay */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            {/* Popup Form */}
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-popup">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-light text-gray-800">Advanced Search</h2>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  setShowPopup(false);
                  searchMovies();
                }}
                  className="space-y-5">
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <input 
                      type="text" 
                      id="year" 
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition placeholder-gray-400"
                      placeholder="e.g. 2023, 2020-2023"
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition placeholder-gray-400"
                      placeholder="Enter name"
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <input 
                      type="text" 
                      id="type" 
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition placeholder-gray-400"
                      placeholder="Enter type (e.g. movie, series, episode)"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300 shadow-md flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Apply Filters
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .animate-popup {
          animation: popup 0.3s ease-out forwards;
        }
        @keyframes popup {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}