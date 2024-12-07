import { Navigate } from 'react-router-dom';

const Protected = ({ children }: any) => {
    const token = localStorage.getItem("access_token");

    if(!token) {
        return <Navigate to="/" replace />
    }
    return children;
};

export default Protected;