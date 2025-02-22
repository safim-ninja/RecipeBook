import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Recipe({ recipe }) {
    console.log(recipe.user.username);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800 dark:text-slate-200">
                    Recipe Details
                </h2>
            }
        >
            <Head title={recipe.title} />

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
                {/* Hero Section */}
                <div className="relative h-96">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                        <h1 className="text-3xl font-bold text-white mb-2">{recipe.title}</h1>
                        <div className="flex items-center space-x-4 text-white">
                            <div className="flex items-center">
                                <span className="text-orange-500">★</span>
                                <span className="ml-1">{recipe.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{recipe.time}</span>
                            <span>•</span>
                            <span>{recipe.difficulty}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">Description</h2>
                        <p className="text-slate-600 dark:text-slate-400">{recipe.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {JSON.parse(recipe.tags).map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-orange-100 dark:bg-slate-700 text-orange-600 dark:text-orange-400 rounded-full text-sm"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Recipe Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-orange-50 dark:bg-slate-700 p-4 rounded-lg">
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Preparation Time</h3>
                            <p className="text-slate-600 dark:text-slate-400">{recipe.time}</p>
                        </div>
                        <div className="bg-orange-50 dark:bg-slate-700 p-4 rounded-lg">
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Difficulty</h3>
                            <p className="text-slate-600 dark:text-slate-400">{recipe.difficulty}</p>
                        </div>
                        <div className="bg-orange-50 dark:bg-slate-700 p-4 rounded-lg">
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Servings</h3>
                            <p className="text-slate-600 dark:text-slate-400">{recipe.servings} portions</p>
                        </div>
                    </div>

                    {/* Ingredients & Instructions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Ingredients */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Ingredients</h2>
                            <ul className="space-y-2">
                                {JSON.parse(recipe.ingredients).map((ingredient, index) => (
                                    <li key={index} className="flex items-center text-slate-600 dark:text-slate-400">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Instructions */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Instructions</h2>
                            <ol className="space-y-4">
                                {JSON.parse(recipe.instructions).map((instruction, index) => (
                                    <li key={index} className="flex text-slate-600 dark:text-slate-400">
                                        <span className="font-bold text-orange-500 mr-3">{index + 1}.</span>
                                        {instruction}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
