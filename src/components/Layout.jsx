import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './common/Sidebar';
import Header from './common/Header';

const Layout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Header />
                <main style={{ flex: 1, background: '#f8fafc' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
