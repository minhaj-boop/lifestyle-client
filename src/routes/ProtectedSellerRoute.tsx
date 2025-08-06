// src/routes/ProtectedSellerRoute.tsx
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedSellerRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('jwt');
    const role = localStorage.getItem('role'); // Store 'seller' in localStorage after login

    if (!token || role !== 'ROLE_SELLER') {
        return <Navigate to="/become-seller" replace />;
    }

    return children;
};

export default ProtectedSellerRoute;
