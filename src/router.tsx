// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import CotacaoAtivos from './routes/CotacaoAtivos';
import Login from './routes/Login';
// import Navbar from './components/Navbar';
import Layout from './components/Layout';


export const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Layout />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/cotacao-de-ativos", element: <CotacaoAtivos /> },
        ]
    }
]);

// export const router = createBrowserRouter([
//     { path: "/", element: <Login /> },
//     { path: "/cotacao-de-ativos", element: <CotacaoAtivos /> },
// ]);

// const AppRoutes = () => {
//     <BrowserRouter>
//         <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="cotacao-de-ativos" element={<CotacaoAtivos />} />
//         </Routes>
//     </BrowserRouter>
// }

// export default AppRoutes;