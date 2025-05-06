import { useState, Suspense } from "react";
import useSWR from "swr";
import Post from "../components/postItem.jsx";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`Erreur ${res.status} : ${res.statusText}`);
    }
    return res.json();
  });

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 20;
  const skip = (currentPage - 1) * postsPerPage;

  const shouldFetch = searchTerm !== "";

  const { data, error, isLoading } = useSWR(
    shouldFetch
      ? `https://dummyjson.com/posts/search?q=${searchTerm}&limit=${postsPerPage}&skip=${skip}`
      : null,
    fetcher
  );

  const totalPosts = data?.total || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get("research")?.trim();
    setCurrentPage(1);
    setSearchTerm(value || "");
  };

  const handlePageChange = (pageNumber) => {
    const newPage = Math.max(1, Math.min(totalPages, pageNumber));
    setCurrentPage(newPage);
  };

  return (
    <section className="container mx-auto flex flex-col gap-10 my-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          name="research"
          className="border rounded-xs px-2 py-1"
          placeholder="Search post..."
        />
        <button
          type="submit"
          className="text-white px-3 py-2 bg-black rounded-xs cursor-pointer"
        >
          Search
        </button>
      </form>

      {error && (
        <div className="font-semibold text-red-500">
          An error occurred during the search.
        </div>
      )}
      {isLoading && <div className="text-gray-400">Loading posts…</div>}
      {shouldFetch && !isLoading && data?.posts?.length === 0 && (
        <div className="font-semibold">No posts found.</div>
      )}

      {data?.posts?.length > 0 && (
        <>
          <ul className="flex flex-col gap-6">
            {data.posts.map((post) => {
              return (
                <Suspense key={post.id} fallback={<div>Loading...</div>}>
                  <Post data={post} />
                </Suspense>
              );
            })}
          </ul>

          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 cursor-pointer disabled:cursor-auto"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 text-sm font-medium rounded cursor-pointer ${
                    currentPage === page
                      ? "bg-gray-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
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
        </>
      )}
    </section>
  );
}
