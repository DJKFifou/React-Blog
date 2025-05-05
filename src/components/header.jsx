import { useTheme } from '../contexts/LoginProvider.jsx';

export default function Header() {
    const { user, isLogged, toggleIsLogged } = useTheme();
    return (
        <header className="w-full">
            <nav className="rounded-xl bg-black text-white m-8 py-4 px-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold">My Blog</h1>
                <ul className="flex items-center gap-8">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/posts">Posts</a>
                    </li>
                    <li className="">
                        {isLogged ? (
                            <div className="flex items-center gap-3 bg-white text-black rounded-2xl p-2">
                                <img src={user.image} alt="" className="h-10 w-10 rounded-full border border-gray-200" />
                                <div className="flex flex-col items-start gap-1">
                                    <p className="text-sm">{user.firstName} {user.lastName}</p>
                                    <button onClick={() => toggleIsLogged()} className="text-xs text-gray-400 cursor-pointer">Logout</button>
                                </div>
                            </div>
                        ) : (
                            <a href="/login" className="bg-white text-black text-sm rounded-lg px-3 py-2">Login</a>
                        )}
                    </li>
                </ul>
            </nav>
      </header>
    )
}