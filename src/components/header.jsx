export default function Header() {
    return (
        <header className="w-full">
            <nav className="rounded-xl bg-black text-white m-8 py-4 px-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Blog</h1>
            <ul className="flex gap-8">
                <li>
                <a href="/">Home</a>
                </li>
                <li>
                <a href="/posts">Posts</a>
                </li>
            </ul>
            </nav>
      </header>
    )
}