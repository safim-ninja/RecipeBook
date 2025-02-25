import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

const CategoryWiseRecipes = ({recipes, popularTags, category}) => {
    return (
        <AuthenticatedLayout
            popularTags={popularTags}
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800 dark:text-slate-200">
                    {category.name}
                </h2>
            }
        >
            <Head title="Category Wise Recipes" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Recipe Cards */}
            {recipes.map((recipe, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
                        <Link href={route('recipe.show', recipe.slug)}>
                            <div className="h-56 w-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                <img
                                    // src={recipe.image}
                                    src={recipe.image ? `/recipes/${recipe.image}` : '/images/default-recipe.jpg'}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                />
                            </div>
                        </Link>
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <Link href={route('recipe.show', recipe.slug)} className="text-slate-900 dark:text-slate-100 transition-colors duration-200 ease-in-out hover:text-orange-500 dark:hover:text-orange-500">
                                    <h3 className="text-lg font-semibold">
                                        {recipe.title}
                                    </h3>
                                </Link>
                                <button className="text-slate-400 hover:text-orange-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                {recipe.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Link href={route('user.profile', recipe.user.username)} className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-500">{recipe.user.name}</Link>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">

                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>{recipe.servings}
                                    <span>•</span>
                                    <span>{recipe.time}</span>
                                    <span>•</span>
                                    <span>{recipe.difficulty}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
};

export default CategoryWiseRecipes;
