import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useTheme } from "../contexts/LoginProvider.jsx";

export default function Post() {
  let params = useParams();

  const { user } = useTheme();

  const [posts, setPosts] = useState([]);

  const [comments, setComments] = useState([]);

  const [postAuthor, setPostAuthor] = useState([]);

  const post = posts.find((item) => item.id === parseInt(params.id));

  useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=0")
      .then((res) => res.json())
      .then((postData) => {
        setPosts(postData.posts);
      });
    fetch(`https://dummyjson.com/posts/${params.id}/comments`)
      .then((res) => res.json())
      .then((commentData) => {
        setComments(commentData.comments);
      });
    fetch(`https://dummyjson.com/users/${params.id}`)
      .then((res) => res.json())
      .then((postAuthorData) => {
        setPostAuthor(postAuthorData);
      });
  }, []);

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <section className="container mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p>
          Écrit par{" "}
          <span className="font-bold">
            {postAuthor.firstName} {postAuthor.lastName}
          </span>
        </p>
        <p>{post.body}</p>
        <div className="flex gap-4">
          <p>
            <span className="font-bold">{post.views}</span> views
          </p>
          <p>
            <span className="font-bold">{post.reactions.likes}</span> likes
          </p>
          <p>
            <span className="font-bold">{post.reactions.dislikes}</span>{" "}
            dislikes
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Comments</h3>
        {comments.length > 0 ? (
          <div className="flex flex-col gap-3">
            {comments.map((comment) => {
              const isCurrentUser =
                user &&
                `${user.firstName} ${user.lastName}` === comment.user.fullName;
              return (
                <div
                  className="flex justify-between items-center border-b border-gray-200 pb-2"
                  key={comment.id}
                >
                  <div className="flex flex-col gap-2">
                    <p>{comment.body}</p>
                    <h5
                      className={`text-sm ${
                        isCurrentUser ? "font-bold" : "text-gray-400"
                      }`}
                    >
                      {comment.user.fullName}
                    </h5>
                  </div>
                  <p>{comment.likes} likes</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No comments found.</p>
        )}
      </div>
    </section>
  );
}
