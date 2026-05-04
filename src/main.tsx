import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'

const client = new QueryClient({
  defaultOptions:{
    queries: {
      retry: 1,           // reintentos en queries
      staleTime: 1000 * 60 * 5,  // 5 min antes de considerar datos "viejos"
      refetchOnWindowFocus: false // no refetch al cambiar de pestaña
    },

  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <App />
        <Toaster 
          toastOptions={{
            classNames:{
              error: '!bg-transparent !text-danger !border-danger',
              success: '!bg-transparent !text-success !border-success'
            }
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
