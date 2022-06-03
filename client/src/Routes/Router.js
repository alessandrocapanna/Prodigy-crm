import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import AdminLogin from "../Pages/Auth/AdminLogin";

import Home from "../Pages/Client/Home";
import AdminHome from "../Pages/Admin/AdminHome";

import Client from "../Pages/Admin/Client";

import Protected from "../Services/AuthGuardServices";
import Profile from "../Pages/Client/Profile";
import EditProfile from "../Pages/Client/EditProfile";
import ProtectedAdmin from "../Services/AuthAdminGuardServices";
import CreateClient from "../Pages/Admin/CreateClient";
import CreateQuote from "../Pages/Admin/CreateQuote";
import CreateOffer from "../Pages/Admin/CreateOffer";
import Offer from "../Pages/Admin/Offer";
import SendEmail from "../Pages/Client/SendEmail";

export const Main =()=>{

    return(
        <Routes> 
            <Route path="/login" element={<Login />} />
            <Route path="/adminlogin" element={<AdminLogin />} />

            <Route path="/" exact element={
                <Protected >
                    <Home />
                </Protected>
            } />
            <Route path="/email" exact element={
                <Protected >
                    <SendEmail />
                </Protected>
            } />
            <Route path="/editprofile" exact element={
                <Protected >
                   <EditProfile/>
                </Protected>
            } />
            <Route path="/profile" exact element={
                <Protected >
                   <Profile/>
                </Protected>
            } />
            <Route path="/admin" exact element={
                <ProtectedAdmin >
                   <AdminHome/>
                </ProtectedAdmin>
            } />
            <Route path="/admin/createclient"  element={
                <ProtectedAdmin >
                   <CreateClient/>
                </ProtectedAdmin>
            } />
            <Route path="/admin/cliente/:id"  element={
                <ProtectedAdmin >
                   <Client/>
                </ProtectedAdmin>
            } />
            <Route path="/admin/:id/creapreventivo"  element={
                <ProtectedAdmin >
                   <CreateQuote/>
                </ProtectedAdmin>
            } />
            <Route path="/admin/creaofferta"  element={
                <ProtectedAdmin >
                   <CreateOffer/>
                </ProtectedAdmin>
            } />
            <Route path="/admin/offer/:id"  element={
                <ProtectedAdmin >
                   <Offer/>
                </ProtectedAdmin>
            } />
     

        </Routes>
    );
}
export default Main;