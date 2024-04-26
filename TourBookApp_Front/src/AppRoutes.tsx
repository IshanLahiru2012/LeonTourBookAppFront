import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "./layouts/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import AuthCallbackPage from "./pages/AuthCallbackPage.tsx";
import SafeRoute from "./auth/SafeRoute.tsx";
import ManageTransfeForm from "./forms/manageTransfer/ManageTransferForm.tsx";
import ManageTransferPage from "./pages/ManageTransferPage.tsx";

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout showFront={true}> <HomePage/> </Layout>}/>
                <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
                <Route element={<SafeRoute/>}>
                    <Route path="/user-profile" element={<Layout showFront={false}><UserProfilePage/></Layout>}/>
                    <Route path="/manage-transfer" element={<Layout showFront={false}><ManageTransferPage/></Layout>}/>
                </Route>
                <Route path="*" element={<Navigate to="/" /> }/>
            </Routes>
        </>
    );
};