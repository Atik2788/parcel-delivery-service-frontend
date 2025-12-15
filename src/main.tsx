import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/index.tsx'
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Toaster } from "@/components/ui/sonner";

import AuthInitializer from './features/auth/AuthInitializer.tsx'
import { ThemeProvider } from './providers/theme.providers.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AuthInitializer></AuthInitializer>
        <Toaster richColors position="top-right" />
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
