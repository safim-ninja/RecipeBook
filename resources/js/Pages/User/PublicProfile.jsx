import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Profile({ recipes, reviews, user }) {
    const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-100 dark:border-slate-700 rounded-xl">
                        <div className="p-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <img
                                        className="h-20 w-20 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700"
                                        src={user.image ? `/avatars/${user.image}` : '/assets/avatar.png'}
                                        alt={user.name}
                                    />
                                    <div>
                                        <h2 className="text-xl font-medium text-slate-800 dark:text-slate-200">{user.name}</h2>
                                        <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
                                        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Member since {new Date(user.created_at).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric'})}</p>
                                    </div>
                                </div>
                            </div>


                            <div className="mt-12">
                                <h3 className="text-base font-medium text-slate-700 dark:text-slate-300 mb-6">Recipes</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {recipes.map((recipe) => (
                                        <div key={recipe.id} className="bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-hidden">
                                            {recipe.image && (
                                                <img
                                                    src={recipe.image}
                                                    alt={recipe.title}
                                                    className="w-full h-48 object-cover"
                                                />
                                            )}
                                            <div className="p-4">
                                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{recipe.title}</h4>
                                                <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">{recipe.description}</p>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {recipe.time}
                                                    </div>
                                                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        {recipe.servings} servings
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12">
                                <h3 className="text-base font-medium text-slate-700 dark:text-slate-300 mb-6">My Reviews</h3>
                                <div className="space-y-3">
                                    {reviews.map((review) => (
                                        <div key={review.id}>
                                            <h4>{review.title}</h4>
                                            <p>{review.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
