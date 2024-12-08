// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import CotacaoAtivos from './routes/CotacaoAtivos';
import Login from './routes/Login';
// import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Protected from './components/Protected';


export const router = createBrowserRouter([
    { 
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Login /> },
            { 
              path: "/cotacao-de-ativos", 
              element: 
                <Protected>
                    <CotacaoAtivos />
                </Protected>
            },
        ]
    }
]);