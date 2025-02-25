import React from 'react';
import AdminMaster from '@/Layouts/Admin/AdminMaster';
import {Head, Link} from '@inertiajs/react';

const Dashboard = ({totalUsers, pendingUsers, totalRecipes, pendingRecipes}) => {
    console.log(totalUsers, totalRecipes)
    return (
        <AdminMaster>
            <Head title="Admin Dashboard" />
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>

                <div className="mt-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Dashboard stats cards */}
                        <Link href={route('admin.users.index')}>
                            <div className="bg-indigo-50 dark:bg-indigo-900 p-6 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-colors duration-300 ease-in-out">
                                <h3 className="text-lg font-medium text-indigo-900 dark:text-white">Total Users</h3>
                                <p className="text-3xl font-bold text-indigo-600 dark:text-white">{totalUsers}</p>
                            </div>
                        </Link>

                        <Link href={route('admin.users.pending')}>
                            <div className="bg-yellow-50 dark:bg-yellow-900 p-6 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-700 transition-colors duration-300 ease-in-out">
                                <h3 className="text-lg font-medium text-yellow-900 dark:text-white">Pending Users</h3>
                                <p className="text-3xl font-bold text-yellow-600 dark:text-white">{pendingUsers}</p>
                            </div>
                        </Link>

                        <Link href={route('admin.recipes.index')}>
                            <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg hover:bg-green-100 dark:hover:bg-green-700 transition-colors duration-300 ease-in-out">
                                <h3 className="text-lg font-medium text-green-900 dark:text-white">Total Recipes</h3>
                                <p className="text-3xl font-bold text-green-600 dark:text-white">{totalRecipes}</p>
                            </div>
                        </Link>

                        <Link href={route('admin.recipes.pending')}>
                            <div className="bg-red-50 dark:bg-red-900 p-6 rounded-lg hover:bg-red-100 dark:hover:bg-red-700 transition-colors duration-300 ease-in-out">
                                <h3 className="text-lg font-medium text-red-900 dark:text-white">Pending Recipes</h3>
                                <p className="text-3xl font-bold text-red-600 dark:text-white">{totalRecipes}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AdminMaster>
    );
}
export default Dashboard;
// Dashboard.layout = page => <AdminMaster children={page} />
