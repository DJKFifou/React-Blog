import { useState, useEffect } from "react";
import Post from "../components/postItem.jsx";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const postsPerPage = 20;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  useEffect(() => {
    const skip = (currentPage - 1) * postsPerPage;
    fetch(`https://dummyjson.com/posts?limit=${postsPerPage}&skip=${skip}`)
      .then((res) => res.json())
      .then((postsData) => {
        setPosts(postsData.posts);
        setTotalPosts(postsData.total);
      });
  }, [currentPage]);

  function handlePageChange(pageNumber) {
    const newPage = Math.max(1, Math.min(totalPages, pageNumber));
    setCurrentPage(newPage);
  }

  return (
    <>
      <section className="container mx-auto my-8 flex flex-col gap-10">
        <h1 className="text-2xl font-bold">Posts :</h1>
        {posts && (
          <ul className="flex flex-col gap-6">
            {posts.map((post) => {
              return <Post key={post.id} data={post} />;
            })}
          </ul>
        )}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 cursor-pointer disabled:cursor-auto"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 text-sm font-medium rounded cursor-pointer ${
                  currentPage === pageNumber
                    ? "bg-gray-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 cursor-pointer disabled:cursor-auto"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
}
