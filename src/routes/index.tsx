import App from "@/App";
import RoleRoute from "@/layout/ProtectedRute";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import { ReceiverDashboard } from "@/pages/dashboard/receiver/ReceiverDashboard";
import About from "@/pages/public/About";
import Contact from "@/pages/public/Contact";
import Home from "@/pages/public/Home";
import { createBrowserRouter } from "react-router";
import  SenderDashboard  from '@/pages/dashboard/sender/SenderDashboard';
import { Unauthorized } from "@/pages/public/Unauthorized";
import { AdminDashboard } from "@/pages/dashboard/admin/AdminDashboard";



export const router = createBrowserRouter([
     {
        Component: App,
        path: '/',    
        children: [
            {
               Component: Home,
               path: '/',
            },
            {
               Component: About,
               path: 'about',
            },
            {
               Component: Contact,
               path: 'contact',
            },
            {
               Component: Login,
               path: 'login',
            }, 
            {
               Component: Register,
               path: 'register',
            } ,
            {
               path: "dashboard/admin",
               element: (
                  <RoleRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
                     <AdminDashboard />
                  </RoleRoute>
               ),
            },
            {
               path: "dashboard/sender",
               element: (
                  <RoleRoute allowedRoles={["SENDER"]}>
                     <SenderDashboard />
                  </RoleRoute>
               ),
            },
            {
               path: "dashboard/receiver",
               element: (
                  <RoleRoute allowedRoles={["RECEIVER"]}>
                     <ReceiverDashboard />
                  </RoleRoute>
               ),
            },
            {
               Component: Unauthorized,
               path: "unauthorized",
            },    
         ]    
   }
])