import { useState, useEffect } from 'react';
import Post from '../components/postItem.jsx';

export default function Posts() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        fetch('https://dummyjson.com/posts?limit=0')
            .then(res => res.json())
            .then(data => {
                setPosts(data.posts);
            })
    }, []);

    return (
        <>
            <section className="container mx-auto my-8 flex flex-col gap-10">
                <h1 className="text-2xl font-bold">Posts :</h1>
                {posts && (
                    <ul className="flex flex-col gap-6">
                        {posts.map((post) => {
                            return (
                                <Post key={post.id} data={post} onClick={""} />
                            )
                        })}
                    </ul>
                )}
            </section>
        </>
    )
}