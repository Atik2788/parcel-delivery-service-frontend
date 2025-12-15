import App from "@/App";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import About from "@/pages/public/About";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
     {
        Component: App,
        path: '/',    
        children: [
            {
               Component: About,
               path: 'about',
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