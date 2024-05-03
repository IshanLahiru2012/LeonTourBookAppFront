import { AppState, Auth0Provider, User, useAuth0 } from "@auth0/auth0-react";
import { useCreateUser } from "../api/UserApi";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode
}
const Auth0ProviderWithNavi = ({children}:Props)=>{
    const {createUser} = useCreateUser();
    const {getAccessTokenSilently} = useAuth0();
    const navigate = useNavigate();
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
   
    if(!domain || !clientId || !redirectUri || !audience){
        throw new Error("Unable to initialize auth");
    }

    const onRedirect = async (appState?: AppState, user?:User)=>{
               
        navigate("/auth-callback")
        // navigate(appState?.returnTo || "/auth-callback");
    };
    

    return(
        <Auth0Provider
         domain={domain} 
         clientId={clientId}
         authorizationParams={{ redirect_uri:redirectUri, audience }}
         onRedirectCallback={onRedirect}>
            {children}
         </Auth0Provider>
    )
};

export default Auth0ProviderWithNavi