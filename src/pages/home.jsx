import { useState, Suspense } from "react";
import useSWR from "swr";
import Post from "../components/postItem.jsx";
import Pagination from "../components/pagination.jsx";
import SearchForm from "../components/searchForm.jsx";

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
      (url) =>
        fetch(url).then((res) => {
          if (!res.ok) {
            throw new Error(`Erreur ${res.status} : ${res.statusText}`);
          }
          return res.json();
        })
  );

  const totalPosts = data?.total || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const SearchPostSubmit = (e) => {
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
      <SearchForm onSubmit={SearchPostSubmit} />

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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
}
