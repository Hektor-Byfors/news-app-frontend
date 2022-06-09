import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import "./login.css"

export const Login = () => {
    interface IUser {
        email:string;
        password:string;
        newsLetterSub:boolean;
        _id:string;
    }

    const [users, setUsers] = useState<IUser[]>([]);
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin({...login, [e.target.name]: e.target.value});
    };

    const preventDefault = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const handleLogin = () => {
        users.forEach(user => {
            if(user.email === login.email && user.password === login.password) {
                console.log("correct login");
            }
        })
        
    };
    
    useEffect(() => {
        if(users.length > 0) return;
        axios.get<IUser[]>("http://localhost:3001/users")
            .then((Response) => {
                setUsers(Response.data)
             });
    });

    return (
        <div>
            <form onSubmit={preventDefault}>
                <label>Email</label>
                <input type="text" name="email" value={login.email} onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" value={login.password} onChange={handleChange} />
                <button onClick={handleLogin}>Login</button>
            </form>
        </div> 
    )
}