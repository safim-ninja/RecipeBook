import { useState } from 'react';
import Navbar from '@/Partials/Navbar';
import LeftSidebar from '@/Partials/LeftSidebar';
import RightSidebar from '@/Partials/RightSidebar';

const FrontLayout = ({ children }) => {
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <Navbar
                setLeftSidebarOpen={setLeftSidebarOpen}
                leftSidebarOpen={leftSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
            />

            <div className="flex">
                {/* Left Sidebar */}
                <LeftSidebar sidebarOpen={leftSidebarOpen} />

                {/* Main Content */}
                <main className="flex-1 px-4 py-8 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                {/* Right Sidebar */}
                <RightSidebar sidebarOpen={rightSidebarOpen} />
            </div>
        </div>
    );
};

export default FrontLayout;
