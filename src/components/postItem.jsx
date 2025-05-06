import { Link } from "react-router";
import useSWR from "swr";

export default function Post(postItemData) {
  const {
    data: userData,
    error,
    isLoading,
  } = useSWR(`https://dummyjson.com/users/${postItemData.data.userId}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  return (
    <>
      <li className="border border-gray-400 rounded-xl p-4 cursor-pointer">
        <Link
          to={`/posts/${postItemData.data.id}`}
          state={{ postData: postItemData.data, userData }}
          className="flex flex-col gap-3"
        >
          <h2 className="text-xl font-bold">{postItemData.data.title}</h2>
          <p>{postItemData.data.body}</p>
          <div className="flex gap-6">
            <p className="text-sm text-gray-500">
              <span className="font-bold">{postItemData.data.views}</span> views
            </p>
            {isLoading && (
              <p className="text-sm text-gray-400">Loading user…</p>
            )}
            {error && (
              <p className="text-sm text-red-400">Failed to load user</p>
            )}
            {userData && (
              <p className="text-sm text-gray-500">
                Posted by <span className="font-bold">{userData.username}</span>
              </p>
            )}
          </div>
        </Link>
      </li>
    </>
  );
}
