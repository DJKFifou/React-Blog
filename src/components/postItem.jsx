import { Link } from 'react-router'
import { useState, useEffect } from 'react';

export default function Post(data) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/users/${data.data.userId}`)
        .then(res => res.json())
        .then(userData => {
            setUser(userData);
            console.log('userData : ', userData);
            console.log('user : ', user);
        })
    }, []);

    return (
        <>
            <li className="border border-gray-400 rounded-xl p-4 cursor-pointer">
                <Link to={`/posts/${data.data.id}`} className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold">{data.data.title}</h2>
                    <p>{data.data.body}</p>
                    <div className="flex gap-6">
                        <p className="text-sm text-gray-500">{data.data.views} views</p>
                    </div>
                </Link>
            </li>
        </>
    )

}