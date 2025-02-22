import React from 'react';
import AdminMaster from '@/Layouts/Admin/AdminMaster';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';

const UsersIndex = ({ users }) => {
    return (
        <AdminMaster>
            <Head title="Users" />
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Users</h1>
                </div>

                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700">
                                    <thead className="bg-slate-50 dark:bg-slate-700">
                                        <tr>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Name</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Email</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Joined At</th>
                                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-300 dark:divide-slate-700 bg-white dark:bg-slate-800">
                                        {users.data.map((user) => (
                                            <tr key={user.id}>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-900 dark:text-white">
                                                    {user.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-300">
                                                    {user.email}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                        user.status === 1
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                            : user.status === 0
                                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                    }`}>
                                                        {user.status === 1 ? 'Active' : user.status === 0 ? 'Pending' : 'Rejected'}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-300">
                                                    {format(new Date(user.created_at), 'MMM d, yyyy')}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <Link
                                                        href={route('admin.users.edit', user.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {users.links && (
                    <div className="mt-6">
                        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 sm:px-6">
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-slate-700 dark:text-slate-300">
                                        Showing <span className="font-medium">{users.from}</span> to{' '}
                                        <span className="font-medium">{users.to}</span> of{' '}
                                        <span className="font-medium">{users.total}</span> results
                                    </p>
                                </div>
                                <div>
                                    {users.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                link.active
                                                    ? 'z-10 bg-indigo-600 border-indigo-600 text-white dark:bg-indigo-700 dark:border-indigo-600'
                                                    : 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                                            } ${!link.url ? 'pointer-events-none' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminMaster>
    );
};

export default UsersIndex;
