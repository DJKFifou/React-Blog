import { useTheme } from '../contexts/LoginProvider.jsx';

export default function LogToggler() {
    const { user, toggleUser, isLogged, toggleIsLogged } = useTheme();
    
    return (
        <div>
            <p>User : {user}</p>
            <p>IsLogged : {isLogged ? 'True' : 'False'}</p>
            <button onClick={() => toggleUser('test')}>ToggleUser</button>
            <button onClick={() => toggleIsLogged()}>
                ToggleIsLogged
            </button>
        </div>
    )
}