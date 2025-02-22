import React from 'react';
import AdminMaster from '@/Layouts/Admin/AdminMaster';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';

const RecipesIndex = ({ recipes }) => {
    return (
        <AdminMaster>
            <Head title="Recipes" />
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Recipes</h1>
                    <Link
                        href={route('admin.recipes.create')}
                        className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add New Recipe
                    </Link>
                </div>

                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700">
                                    <thead className="bg-slate-50 dark:bg-slate-700">
                                        <tr>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Title</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Category</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Author</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Created At</th>
                                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-300 dark:divide-slate-700 bg-white dark:bg-slate-800">
                                        {recipes.data.map((recipe) => (
                                            <tr key={recipe.id}>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-900 dark:text-white">
                                                    {recipe.title}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-300">
                                                    {recipe.category?.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-300">
                                                    {recipe.user?.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-300">
                                                    {format(new Date(recipe.created_at), 'MMM d, yyyy')}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <Link
                                                        href={route('admin.recipes.edit', recipe.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route('admin.recipes.destroy', recipe.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    >
                                                        Delete
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

                {recipes.links && (
                    <div className="mt-6">
                        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 sm:px-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                {recipes.prev_page_url && (
                                    <Link
                                        href={recipes.prev_page_url}
                                        className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {recipes.next_page_url && (
                                    <Link
                                        href={recipes.next_page_url}
                                        className="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-slate-700 dark:text-slate-300">
                                        Showing <span className="font-medium">{recipes.from}</span> to{' '}
                                        <span className="font-medium">{recipes.to}</span> of{' '}
                                        <span className="font-medium">{recipes.total}</span> results
                                    </p>
                                </div>
                                <div>
                                    {recipes.links.map((link, index) => (
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

export default RecipesIndex;
