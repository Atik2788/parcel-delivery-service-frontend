import App from "@/App";
import About from "@/pages/About";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
     {
         // element: <App />,
         Component: App,
        path: '/',    
        children: [
            {
               Component: About,
               path: 'about',
            },
        
      ]    
     }
])