import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./home.css"

export const Home = () => {
    interface IUser {
        email:string;
        password:string;
        newsLetterSub:boolean;
        _id:string;
    }

    const [user, setUser] = useState<IUser>();
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("userId");
        navigate("/");
    }

    useEffect(() => {
        if(localStorage.getItem("userId")) {
            return;
        } else {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        let userId = localStorage.getItem("userId");
        
        axios.get<IUser[]>("http://localhost:3001/users")
            .then((response) => {
                let userList = response.data;
                
                userList.forEach(u => {
                    if(userId === u._id) {
                        setUser(u);
                        return;
                    }
                    
                })
                
            })
        
    }, [])

    return (
        <div>
            <h1>Homepage</h1>
            <h3>logged in as: { user?.email }</h3>
            
            <button onClick={logOut}>Log out</button>
        </div>
        
    )
}