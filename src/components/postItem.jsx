import { Link } from "react-router";
import { useState, useEffect } from "react";

export default function Post(postItemData) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${postItemData.data.userId}`)
      .then((res) => res.json())
      .then((userData) => {
        setUser(userData);
      });
  }, []);

  return (
    <>
      <li className="border border-gray-400 rounded-xl p-4 cursor-pointer">
        <Link
          to={`/posts/${postItemData.data.id}`}
          className="flex flex-col gap-3"
        >
          <h2 className="text-xl font-bold">{postItemData.data.title}</h2>
          <p>{postItemData.data.body}</p>
          <div className="flex gap-6">
            <p className="text-sm text-gray-500">
              {postItemData.data.views} views
            </p>
          </div>
        </Link>
      </li>
    </>
  );
}
