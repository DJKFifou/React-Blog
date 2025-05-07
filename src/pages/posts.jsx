import { useState, useEffect, Suspense } from "react";
import Post from "../components/postItem.jsx";
import Pagination from "../components/pagination.jsx";

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
        {posts.length > 0 && (
          <>
            <ul className="flex flex-col gap-6">
              {posts.map((post) => {
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
    </>
  );
}
