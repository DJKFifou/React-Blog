import { useParams, Link } from "react-router"
import { useState, useEffect } from 'react';

export default function Post() {
    let params = useParams();
    console.log('params : ', params);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/posts?limit=0')
            .then(res => res.json())
            .then(data => {
                console.log('data : ', data);
                setPosts(data.posts);
                console.log('posts : ', posts);
            })
    }, []);
    const post = posts.find(item => item.id === parseInt(params.id));
    console.log('post : ', post);
    if (!post) {
        return <p>Post not found</p>
    }
    return (
        <div className="container mx-auto flex flex-col gap-8">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p>Écrit par {post.author}</p>
            <p className="text-gray-500">{post.body}</p>
            <p>Post Id: {params.id}</p>
            <p>Author: {post.userId}</p>
            <Link to="/">Go back to home</Link>
        </div>
    )
}