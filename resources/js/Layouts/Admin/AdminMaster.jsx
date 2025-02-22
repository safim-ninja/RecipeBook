import { useState } from 'react';
import Header from './Partials/Header';
import Sidebar from './Partials/Sidebar';

const AdminMaster = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
            <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

            <div className="flex">
                <Sidebar sidebarOpen={sidebarOpen} />

                {/* Main content */}
                <main className="flex-1 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminMaster;
