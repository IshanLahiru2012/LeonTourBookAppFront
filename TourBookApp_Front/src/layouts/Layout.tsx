import React from "react";
import Header from "../components/Header.tsx";
import FrontView from "../components/FrontView.tsx";
import Footer from "../components/Footer.tsx";

type Props = {
    children: React.ReactNode,
    showFront?:boolean;
}


export const Layout = ({children, showFront= false}:Props) => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header/>
                {showFront && <FrontView/>}
                <div className="container mx-auto flex-1 py-10">{children}</div>  
                <Footer/>
            </div>
        </>
    );
};