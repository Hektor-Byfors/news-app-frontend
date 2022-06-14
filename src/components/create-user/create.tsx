import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Create = () => {

    const navigate = useNavigate();
    const [sub, setSub] = useState(false);
    const [createUserInfo, setCreateUser] = useState({
        email: "",
        password: "",
        newsLetterSub: sub
    });

    const preventDefault = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCreateUser({...createUserInfo, [e.target.name]: e.target.value});
    };

    const handleCheckbox = () => {
        setSub(!sub);
    }

    const createUser = () => {
        if(createUserInfo.email === "" && createUserInfo.password === "") return
        axios.post("http://localhost:3001/create-user", createUserInfo)
            .then((response) => {
                let userData = response.data;
                localStorage.setItem("userId", userData._id);
                alert("Account created!");
                navigate("/home");
            })
    }
    
    useEffect(() => {
        setCreateUser({
            ...createUserInfo,
            newsLetterSub: sub
        })
    }, [sub])

    return (
        <div>
            <h1>Create account</h1>
            <form onSubmit={preventDefault}>
                <label>Email</label>
                <input type="text" name="email" value={createUserInfo.email} onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" value={createUserInfo.password} onChange={handleChange}/>
                <label>I want to receive daily newsletter</label>
                <input type="checkbox" checked={sub} onChange={handleCheckbox}/>
                <button onClick={createUser}>Create account</button>
            </form>
        </div>
    )
}