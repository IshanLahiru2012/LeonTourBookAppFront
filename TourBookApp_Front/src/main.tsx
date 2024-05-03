import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router} from "react-router-dom";
import {AppRoutes} from "./AppRoutes.tsx";
import Auth0ProviderWithNavi from './auth/Auth0ProviderWithNavi.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavi>
          <AppRoutes/>
        </Auth0ProviderWithNavi> 
      </QueryClientProvider> 
    </Router>
  </React.StrictMode>,
)
