import React from 'react';
import AdminMaster from '@/Layouts/Admin/AdminMaster';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>

                <div className="mt-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Dashboard stats cards */}
                        <div className="bg-indigo-50 dark:bg-indigo-900 p-6 rounded-lg">
                            <h3 className="text-lg font-medium text-indigo-900 dark:text-white">Total Users</h3>
                            <p className="text-3xl font-bold text-indigo-600 dark:text-white">123</p>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg">
                            <h3 className="text-lg font-medium text-green-900 dark:text-white">Total Recipes</h3>
                            <p className="text-3xl font-bold text-green-600 dark:text-white">456</p>
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900 p-6 rounded-lg">
                            <h3 className="text-lg font-medium text-yellow-900 dark:text-white">Categories</h3>
                            <p className="text-3xl font-bold text-yellow-600 dark:text-white">15</p>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900 p-6 rounded-lg">
                            <h3 className="text-lg font-medium text-red-900 dark:text-white">Pending Reviews</h3>
                            <p className="text-3xl font-bold text-red-600 dark:text-white">8</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = page => <AdminMaster children={page} />
