import React from 'react';
import Navbar from './Navbar';
import type {LayoutProps} from "../../types";

const Layout: React.FC<LayoutProps> = ({
                                           children,
                                           variant = 'default',
                                           showNavbar = true
                                       }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {showNavbar && <Navbar variant={variant} />}

            <main className={showNavbar ? 'pt-16' : ''}>
                {children}
            </main>
        </div>
    );
};

export default Layout;