import { Link } from 'react-router'

export default function Post(data, onClick) {
    return (
        <>
            <li onClick={onClick} className="flex flex-col gap-4 border border-gray-400 rounded-xl p-4 cursor-pointer">
                <Link to={`/posts/${data.data.id}`}>
                    <h2 className="text-xl font-bold">{data.data.title}</h2>
                    <p>{data.data.body}</p>
                    <div className="flex gap-6">
                        <p className="text-sm text-gray-500">Author: {data.data.userId}</p>
                        <p className="text-sm text-gray-500">{data.data.views} views</p>
                    </div>
                </Link>
            </li>
        </>
    )

}