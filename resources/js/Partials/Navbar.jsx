const Navbar = () => {
    return (
        <nav className="bg-white dark:bg-slate-800 shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <span className="font-bold text-xl text-slate-900 dark:text-white">Admin Dashboard</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
