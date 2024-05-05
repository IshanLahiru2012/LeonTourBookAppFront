import { useAuth0 } from "@auth0/auth0-react";
import { useCreateUser } from "../api/UserApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = ()=>{

    const {user} = useAuth0();
    const navigate = useNavigate();
    const {createUser} = useCreateUser();

    const hasCreatedUser = useRef(false);
    console.log('awa')

    useEffect(() =>{
        if(user?.sub && user?.email && !hasCreatedUser.current){
            createUser({auth0Id:user.sub, email:user.email});
            hasCreatedUser.current = true;
            console.log('awa')
        }
        navigate("/");
        // window.location.reload();
    },[createUser, navigate, user]);
    return <>Loading...</>;
}

export default AuthCallbackPage;