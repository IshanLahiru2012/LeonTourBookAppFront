import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "./layouts/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import AuthCallbackPage from "./pages/AuthCallbackPage.tsx";
import SafeRoute from "./auth/SafeRoute.tsx";
import ManageTransferPage from "./pages/ManageTransferPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import TransferDetailPage from "./pages/TransferDetailPage.tsx";
import BookingStatusPage from "./pages/BookingStatusPage.tsx";

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/test" element={<Layout > <BookingStatusPage/> </Layout>}/>
                <Route path={'/'} element={<Layout showFront={true}> <HomePage/> </Layout>}/>
                <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
                <Route path="/search/:city" 
                        element={<Layout >
                                    <SearchPage/>
                                </Layout>}  />
                <Route path="/detail/:transferId" 
                        element={<Layout >
                                    <TransferDetailPage/>
                                </Layout>}  />
                <Route element={<SafeRoute/>}>
                    <Route path="/user-profile" 
                            element={<Layout >
                                        <UserProfilePage/>
                                    </Layout>}/>
                    <Route path="/manage-transfer" 
                            element={<Layout >
                                        <ManageTransferPage/>
                                    </Layout>}/>
                    <Route path="/booking-status" 
                            element={<Layout >
                                        <BookingStatusPage/>
                                    </Layout>}/>
                </Route>
                <Route path="*" element={<Navigate to="/" /> }/>
            </Routes>
        </>
    );
};