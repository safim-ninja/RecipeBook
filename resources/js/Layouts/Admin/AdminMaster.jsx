import { useState } from 'react';
import Header from './Partials/Header';
import Sidebar from './Partials/Sidebar';
import { ToastContainer } from 'react-toastify';

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
            <ToastContainer theme="light" />
        </div>
    );
};

export default AdminMaster;
