import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function EditRecipe({ auth, recipe }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: recipe.title,
        description: recipe.description,
        time: recipe.time,
        difficulty: recipe.difficulty,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        tags: recipe.tags,
        status: recipe.status,
        category_id: recipe.category_id,
        image: null
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setData('image', file);
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route('recipe.update', recipe.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Recipe" />

            <div className="py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-100 dark:border-slate-700 rounded-xl">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-medium text-slate-900 dark:text-slate-100">Edit Recipe</h2>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Recipe Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                                    <textarea
                                        rows="3"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    ></textarea>
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Cooking Time (minutes)</label>
                                        <input
                                            type="number"
                                            value={data.time}
                                            onChange={e => setData('time', e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        />
                                        {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Difficulty</label>
                                        <select
                                            value={data.difficulty}
                                            onChange={e => setData('difficulty', e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        >
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                        {errors.difficulty && <p className="mt-1 text-sm text-red-600">{errors.difficulty}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Servings</label>
                                        <input
                                            type="number"
                                            value={data.servings}
                                            onChange={e => setData('servings', e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        />
                                        {errors.servings && <p className="mt-1 text-sm text-red-600">{errors.servings}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                                    <select
                                        value={data.category_id}
                                        onChange={e => setData('category_id', e.target.value)}
                                        className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    >
                                        <option value="">Select a category</option>
                                        <option value="1">Breakfast</option>
                                        <option value="2">Lunch</option>
                                        <option value="3">Dinner</option>
                                        <option value="4">Dessert</option>
                                        <option value="5">Snack</option>
                                    </select>
                                    {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        value={data.tags}
                                        onChange={e => setData('tags', e.target.value)}
                                        placeholder="e.g. vegetarian, gluten-free, spicy"
                                        className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    />
                                    {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Ingredients</label>
                                    <textarea
                                        rows="4"
                                        value={data.ingredients}
                                        onChange={e => setData('ingredients', e.target.value)}
                                        placeholder="Enter each ingredient on a new line"
                                        className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    ></textarea>
                                    {errors.ingredients && <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Instructions</label>
                                    <textarea
                                        rows="4"
                                        value={data.instructions}
                                        onChange={e => setData('instructions', e.target.value)}
                                        placeholder="Enter each step on a new line"
                                        className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    ></textarea>
                                    {errors.instructions && <p className="mt-1 text-sm text-red-600">{errors.instructions}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Recipe Image</label>
                                    {recipe.image && (
                                        <img
                                            src={`/recipes/${recipe.image}`}
                                            alt={recipe.title}
                                            className="mt-2 h-32 w-32 object-cover rounded-lg"
                                        />
                                    )}
                                    <input
                                        type="file"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        className="mt-1 block w-full"
                                    />
                                    {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <a
                                        href={route('user.profile', auth.user.username)}
                                        className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                                    >
                                        Cancel
                                    </a>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
