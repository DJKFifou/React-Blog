import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Home() {

    const [posts, setPosts] = useState([]);

    async function searchPost(formData) {
        const inputResearchValue = formData.get("research");
        const response = await fetch(`https://dummyjson.com/posts/search?q=${inputResearchValue}`)
        const data = await response.json();
        setPosts(data.posts || []);
    }

    useEffect(() => {
        console.log('posts :', posts);
    }, [posts]);

    return (
        <>
            <section className="container mx-auto flex flex-col gap-6">
                <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        searchPost(formData);
                    }} 
                    className="flex gap-2"
                >
                    <input type="text" name="research" className="border rounded-xs px-2 py-1" placeholder="Search post..." />
                    <button type="submit" className="text-white px-3 py-2 bg-black rounded-xs cursor-pointer">Search</button>
                </form>
                {posts?.length > 0 && (
                    <ul className="flex flex-col gap-6">
                        {posts.map((post) => (
                            <li key={post.id} className=" border rounded-lg">
                                <Link to={`/posts/${post.id}`} className="flex flex-col gap-4 p-4">
                                    <h3 className="text-xl font-bold">{post.title}</h3>
                                    <p>{post.body}</p>
                                    <div className="flex gap-4">
                                        <p><span className="font-bold">{post.views}</span> views</p>
                                        <p><span className="font-bold">{post.reactions.likes}</span> likes</p>
                                        <p><span className="font-bold">{post.reactions.dislikes}</span> dislikes</p>
                                    </div>
                                </Link>
                            </li>
                            
                        ))}
                    </ul>
                )}
            </section>
        </>
    )
}