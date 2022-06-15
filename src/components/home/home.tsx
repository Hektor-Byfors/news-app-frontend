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

    const handleChange = () => {
        let userId = localStorage.getItem("userId");

        let axiosCall = axios.put("http://localhost:3001/users/" + userId, { newsLetterSub : !user?.newsLetterSub })
                .then((response) => {
                    return response.data
                })

        let waitUpdate = async () => {
            let update = await axiosCall;
            setUser(update);
        }

        waitUpdate()

        alert("subscription updated")
        window.location.reload();
        
    }

    useEffect(() => {
        if(localStorage.getItem("userId")) {
            return;
        } else {
            navigate("/");
        }
    }, [user])
    
    useEffect(() => {
        let userId = localStorage.getItem("userId");
        
        if(user === undefined) {
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
        } else {
            return
        }
    })
    
    return (
        <div>
            <h1>Homepage</h1>
            <h3>logged in as: { user?.email }</h3>
            { user?.newsLetterSub && <p>You are subscribed to our newsletter!</p> }
            { user?.newsLetterSub &&  <button onClick={handleChange}>unsubscribe</button>}
            { !user?.newsLetterSub && <p>You are not subscribed to our newsletter.</p> }
            { !user?.newsLetterSub &&  <button onClick={handleChange}>Subscribe!</button>}
            <button onClick={logOut}>Log out</button>
        </div>
        
    )
}