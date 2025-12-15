import App from "@/App";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import About from "@/pages/public/About";
import Contact from "@/pages/public/Contact";
import Home from "@/pages/public/Home";
import { createBrowserRouter } from "react-router";

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
            }        
      ]    
     }
])