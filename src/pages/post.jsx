import { useParams, useLocation } from "react-router";
import { useTheme } from "../contexts/LoginProvider.jsx";
import useSWR from "swr";
import { useEffect } from "react";

export default function Post() {
  const location = useLocation();
  const params = useParams();

  const { user } = useTheme();

  const locationPostData = location.state?.postData;
  const locationUserData = location.state?.userData;

  const {
    data: commentsData,
    error,
    isLoading,
  } = useSWR(`https://dummyjson.com/posts/${params.id}/comments`, (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    console.log("Comments data:", commentsData);
  }, [commentsData]);

  if (!locationPostData) {
    return <p>Post not found</p>;
  }

  return (
    <section className="container mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">{locationPostData.title}</h1>
        <p>
          Écrit par{" "}
          <span className="font-bold">
            {locationUserData.firstName} {locationUserData.lastName}
          </span>
        </p>
        <p>{locationPostData.body}</p>
        <div className="flex gap-4">
          <p>
            <span className="font-bold">{locationPostData.views}</span> views
          </p>
          <p>
            <span className="font-bold">
              {locationPostData.reactions.likes}
            </span>{" "}
            likes
          </p>
          <p>
            <span className="font-bold">
              {locationPostData.reactions.dislikes}
            </span>{" "}
            dislikes
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Comments</h3>
        {isLoading ? (
          <p className="text-sm text-gray-400">Loading comments…</p>
        ) : error ? (
          <p className="text-sm text-red-400">Failed to load comments</p>
        ) : commentsData?.comments?.length > 0 ? (
          <div className="flex flex-col gap-3">
            {commentsData.comments.map((comment) => {
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
                  <p>
                    <span className="font-bold">{comment.likes}</span> likes
                  </p>
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
