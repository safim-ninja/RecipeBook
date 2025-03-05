import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Home({ recipes, popularTags }) {
    return (
        <AuthenticatedLayout
            popularTags={popularTags}
            header={
                <h2 className="text-2xl font-bold leading-tight text-slate-800 dark:text-slate-200 tracking-tight">
                    Latest Recipes
                </h2>
            }
        >
            <Head title="Home" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                {recipes.map((recipe, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                        <Link href={route('recipe.show', recipe.slug)}>
                            <div className="h-64 w-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                <img
                                    src={recipe.image ? `/recipes/${recipe.image}` : '/images/default-recipe.jpg'}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                        </Link>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                                <Link href={route('recipe.show', recipe.slug)} className="text-slate-900 dark:text-slate-100 transition-colors duration-200 ease-in-out hover:text-orange-600 dark:hover:text-orange-400">
                                    <h3 className="text-xl font-semibold tracking-tight hover:text-orange-600">
                                        {recipe.title}
                                    </h3>
                                </Link>
                                <button className="text-slate-400 hover:text-orange-600 transform hover:scale-125 transition-transform duration-300">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                {recipe.description}
                            </p>
                            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                                <div className="flex items-center space-x-2">
                                    <Link href={route('user.profile', recipe.user.username)} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                                        {recipe.user.name}
                                    </Link>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        {recipe.servings}
                                    </div>
                                    <span className="text-slate-300">•</span>
                                    <span>{recipe.time}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="font-medium">{recipe.difficulty}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
