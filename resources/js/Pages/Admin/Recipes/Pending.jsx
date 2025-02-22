import React, { useState } from 'react';
import AdminMaster from '@/Layouts/Admin/AdminMaster';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const PendingRecipes = ({ recipes }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleAction = (recipe, action) => {
        setSelectedRecipe(recipe);
        setModalAction(action);
        setShowModal(true);
    };

    const handleConfirm = () => {
        if (selectedRecipe && modalAction) {
            const routePath = modalAction === 'approve'
                ? route('admin.recipes.approve', selectedRecipe.id)
                : route('admin.recipes.reject', selectedRecipe.id);

            router.post(routePath);
        }
        setShowModal(false);
    };

    return (
        <AdminMaster>
            <Head title="Pending Recipes" />
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Pending Recipes</h1>
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
                                                    <button
                                                        onClick={() => handleAction(recipe, 'approve')}
                                                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-4"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(recipe, 'reject')}
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    >
                                                        Reject
                                                    </button>
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

            {/* Confirmation Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 overflow-y-auto"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
                        {/* Background overlay with smoother transition */}
                        <div
                            className="fixed inset-0 bg-slate-600/[.50] dark:bg-slate-700/[.50] transition-opacity duration-300 ease-in-out"
                            aria-hidden="true"
                            onClick={() => setShowModal(false)}
                        ></div>

                        {/* Modal panel with enhanced transition */}
                        <div
                            className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all duration-300 ease-out sm:my-8 sm:w-full sm:max-w-lg sm:p-6
                            opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95
                            animate-[modal-enter_0.3s_ease-out_forwards]"
                        >
                            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                <button
                                    type="button"
                                    className="rounded-md bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-500 focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="sm:flex sm:items-start">
                                <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                                    modalAction === 'approve'
                                        ? 'bg-green-100 dark:bg-green-900'
                                        : 'bg-red-100 dark:bg-red-900'
                                } sm:mx-0 sm:h-10 sm:w-10`}>
                                    {modalAction === 'approve' ? (
                                        <CheckCircleIcon
                                            className="h-6 w-6 text-green-600 dark:text-green-400"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <ExclamationTriangleIcon
                                            className="h-6 w-6 text-red-600 dark:text-red-400"
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">
                                        {modalAction === 'approve' ? 'Approve Recipe' : 'Reject Recipe'}
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Are you sure you want to {modalAction} <span className="font-medium text-slate-700 dark:text-slate-300">"{selectedRecipe?.title}"</span>?
                                            <br />
                                            <span className="mt-1 block">This action cannot be undone.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
                                <button
                                    type="button"
                                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:w-auto ${
                                        modalAction === 'approve'
                                            ? 'bg-green-600 hover:bg-green-500 focus-visible:outline-green-600'
                                            : 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600'
                                    } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                                    onClick={handleConfirm}
                                >
                                    {modalAction === 'approve' ? 'Approve' : 'Reject'}
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-slate-700 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-200 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 sm:mt-0 sm:w-auto"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes modal-enter {
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(100%);
                    }
                }
            `}</style>
        </AdminMaster>
    );
};

export default PendingRecipes;
