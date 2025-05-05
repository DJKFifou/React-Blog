import {useTheme} from '../contexts/LoginProvider.jsx';
import { useNavigate } from 'react-router';

export default function Login() {
    const { toggleUser, isLogged, toggleIsLogged } = useTheme();
    const goTo = useNavigate();

    async function Login(formData) {
        const data = Object.fromEntries(formData.entries());
        console.log('data : ', data);
        const response = await fetch('https://dummyjson.com/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: data.username,
              password: data.password
            }),
          })
        const res = await response.json();
        console.log('res : ', res);
        console.log('!isLogged : ', !isLogged);
        console.log('res.accessToken : ', res.accessToken);
        if (!isLogged && res.accessToken) {
            console.log('is in condition')
            toggleIsLogged();
            toggleUser(res);
            goTo('/')
        }
    }

    return (
        <section className="container mx-auto flex flex-col max-w-sm gap-6">
            <h2 className="text-2xl font-bold text-center">Sign In</h2>
            <form action={Login} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Username</label>
                    <input type="text" name="username" placeholder="Username" className="border rounded-lg px-2 py-1" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" placeholder="Password" className="border rounded-lg px-2 py-1" />
                </div>
                <button type="submit" className="bg-black px-3 py-2 text-white rounded-lg w-fit cursor-pointer">Sign in</button>
            </form>
        </section>
    )
}