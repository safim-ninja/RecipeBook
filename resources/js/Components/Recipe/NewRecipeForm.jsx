import { useForm } from '@inertiajs/react';
import Switch from '../Switch';
export default function NewRecipeForm({ user, onClose }) {
    const { data: recipeData, setData: setRecipeData, post: postRecipe, processing: recipeProcessing, errors: recipeErrors } = useForm({
        title: '',
        description: '',
        time: '',
        difficulty: 'easy',
        chef: user.name,
        servings: '',
        ingredients: '',
        instructions: '',
        tags: '',
        status: 'draft',
        category_id: '',
        is_orderable: false,
        image: null
    });

    const handleRecipeImageUpload = (e) => {
        const file = e.target.files[0];
        setRecipeData('image', file);
    };

    const submitRecipe = (e) => {
        e.preventDefault();
        postRecipe(route('recipe.store'), {
            onSuccess: () => {
                onClose();
            },
        });
    };
    console.log(recipeData);

    return (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Create New Recipe</h3>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-300"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <form onSubmit={submitRecipe} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Recipe Title</label>
                    <input
                        type="text"
                        value={recipeData.title}
                        onChange={e => setRecipeData('title', e.target.value)}
                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                    />
                    {recipeErrors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{recipeErrors.title}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                    <textarea
                        rows="3"
                        value={recipeData.description}
                        onChange={e => setRecipeData('description', e.target.value)}
                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                    ></textarea>
                    {recipeErrors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{recipeErrors.description}</p>}
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Cooking Time (minutes)</label>
                        <input
                            type="number"
                            value={recipeData.time}
                            onChange={e => setRecipeData('time', e.target.value)}
                            className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                        />
                        {recipeErrors.time && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{recipeErrors.time}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Difficulty</label>
                        <select
                            value={recipeData.difficulty}
                            onChange={e => setRecipeData('difficulty', e.target.value)}
                            className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        {recipeErrors.difficulty && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{recipeErrors.difficulty}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Servings</label>
                        <input
                            type="number"
                            value={recipeData.servings}
                            onChange={e => setRecipeData('servings', e.target.value)}
                            className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                        />
                        {recipeErrors.servings && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{recipeErrors.servings}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                    <select
                        value={recipeData.category_id}
                        onChange={e => setRecipeData('category_id', e.target.value)}
                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                    >
                        <option value="">Select a category</option>
                        <option value="1">Breakfast</option>
                        <option value="2">Lunch</option>
                        <option value="3">Dinner</option>
                        <option value="4">Dessert</option>
                        <option value="5">Snack</option>
                    </select>
                    {recipeErrors.category_id && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{recipeErrors.category_id}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tags (comma separated)</label>
                    <input
                        type="text"
                        value={recipeData.tags}
                        onChange={e => setRecipeData('tags', e.target.value)}
                        placeholder="e.g. vegetarian, gluten-free, spicy"
                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                    />
                    {recipeErrors.tags && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{recipeErrors.tags}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Ingredients</label>
                    <textarea
                        rows="4"
                        value={recipeData.ingredients}
                        onChange={e => setRecipeData('ingredients', e.target.value)}
                        placeholder="Enter each ingredient on a new line"
                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                    ></textarea>
                    {recipeErrors.ingredients && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{recipeErrors.ingredients}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Instructions</label>
                    <textarea
                        rows="4"
                        value={recipeData.instructions}
                        onChange={e => setRecipeData('instructions', e.target.value)}
                        placeholder="Enter each step on a new line"
                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                    ></textarea>
                    {recipeErrors.instructions && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{recipeErrors.instructions}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Recipe Image</label>
                    <input
                        type="file"
                        onChange={handleRecipeImageUpload}
                        accept="image/*"
                        className="mt-1 block w-full"
                    />
                    {recipeErrors.image && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{recipeErrors.image}</p>}
                </div>

                <div>
                    {/* <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Is Orderable</label> */}
                    <Switch
                        label="Is Orderable"
                        checked={recipeData.is_orderable}
                        onChange={e => setRecipeData('is_orderable', !recipeData.is_orderable)}
                    />
                </div>
                {/* <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
                    <select
                        value={recipeData.status}
                        onChange={e => setRecipeData('status', e.target.value)}
                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                    {recipeErrors.status && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{recipeErrors.status}</p>}
                </div> */}

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={recipeProcessing}
                        className="px-4 py-2 bg-orange-500 dark:bg-orange-600 text-white rounded-md hover:bg-orange-600 dark:hover:bg-orange-700 disabled:opacity-50"
                    >
                        {recipeProcessing ? 'Creating...' : 'Create Recipe'}
                    </button>
                </div>
            </form>
        </div>
    );
}
