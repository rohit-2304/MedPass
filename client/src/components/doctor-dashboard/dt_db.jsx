import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dt_db() {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    useEffect(() => {
            const handleStorageChange = () => {
                const newToken = localStorage.getItem('token');
                setToken(newToken);
                if(!token){
                    navigate('/home')
                }
            };
    
            window.addEventListener('storage', handleStorageChange);
    
            return () => {
                window.removeEventListener('storage', handleStorageChange);
            };
        }, []);

    return (
        <div>
            doctor db
        </div>
    );
}

export default Dt_db;
