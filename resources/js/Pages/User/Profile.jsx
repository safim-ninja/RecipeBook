import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import UpdateProfileForm from '@/Components/Profile/UpdateProfileForm';
import NewRecipeForm from '@/Components/Recipe/NewRecipeForm';

export default function Profile({ auth, myRecipes, myReviews }) {
    const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const user = auth.user;

    // const { data: profileData, setData: setProfileData, patch: patchProfile, processing: profileProcessing, errors: profileErrors } = useForm({
    //     name: user.name,
    //     email: user.email,
    //     username: user.username,
    //     avatar: null,
    //     current_password: '',
    //     password: '',
    //     password_confirmation: '',
    // });

    // const { data: recipeData, setData: setRecipeData, post: postRecipe, processing: recipeProcessing, errors: recipeErrors } = useForm({
    //     title: '',
    //     description: '',
    //     time: '',
    //     difficulty: 'easy',
    //     chef: user.name,
    //     servings: '',
    //     ingredients: '',
    //     instructions: '',
    //     tags: '',
    //     status: 'draft',
    //     category_id: '',
    //     image: null
    // });

    // const [avatarPreview, setAvatarPreview] = useState(user.avatar ? `/avatars/${user.avatar}` : '/avatars/default-avatar.svg');

    // const handleRecipeImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     setRecipeData('image', file);
    // };

    // const submitProfileUpdate = (e) => {
    //     e.preventDefault();
    //     patchProfile(route('profile.update'), {
    //         onSuccess: () => {
    //             setShowEditProfile(false);
    //         },
    //     });
    // };

    // const submitRecipe = (e) => {
    //     e.preventDefault();
    //     postRecipe(route('recipe.store'), {
    //         onSuccess: () => {
    //             setShowNewRecipeForm(false);
    //         },
    //     });
    // };

    const handleShowNewRecipe = () => {
        if (showNewRecipeForm) {
            setShowNewRecipeForm(false);
        } else {
            setShowEditProfile(false);
            setShowNewRecipeForm(true);
        }
    };

    const handleShowEditProfile = () => {
        if (showEditProfile) {
            setShowEditProfile(false);
        } else {
            setShowNewRecipeForm(false);
            setShowEditProfile(true);
        }
    };

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
                                        src={user.avatar ? `/avatars/${user.avatar}` : '/avatars/default-avatar.svg'}
                                        alt={user.name}
                                    />
                                    <div>
                                        <h2 className="text-xl font-medium text-slate-800 dark:text-slate-200">{user.name}</h2>
                                        <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
                                        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Member since {new Date(user.created_at).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric'})}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={handleShowEditProfile}
                                        className={`px-4 py-2 text-white rounded-lg transition-colors ${
                                            showEditProfile
                                            ? 'bg-slate-600 hover:bg-slate-700'
                                            : 'bg-slate-500 hover:bg-slate-600'
                                        }`}
                                    >
                                        Update Profile
                                    </button>
                                    <button
                                        onClick={handleShowNewRecipe}
                                        className={`px-4 py-2 text-white rounded-lg transition-colors ${
                                            showNewRecipeForm
                                            ? 'bg-orange-600 hover:bg-orange-700'
                                            : 'bg-orange-500 hover:bg-orange-600'
                                        }`}
                                    >
                                        Add New Recipe
                                    </button>
                                </div>
                            </div>

                            {showEditProfile && (
                                <div className="mt-8">
                                    <UpdateProfileForm
                                        user={user}
                                        onClose={() => setShowEditProfile(false)}
                                    />
                                </div>
                            )}

                            {showNewRecipeForm && (
                                <div className="mt-8">
                                    <NewRecipeForm
                                        user={user}
                                        onClose={() => setShowNewRecipeForm(false)}
                                    />
                                </div>
                            )}

                            <div className="mt-12">
                                <h3 className="text-base font-medium text-slate-700 dark:text-slate-300 mb-6">My Recipes</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {myRecipes.length > 0 ? (
                                        myRecipes.map((recipe) => (
                                            <div key={recipe.id} className="bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-hidden">
                                                {recipe.image && (
                                                    <img
                                                        src={recipe.image ? `/recipes/${recipe.image}` : '/images/default-recipe.jpg'}
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
                                                            {recipe.time} mins
                                                        </div>
                                                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                            {recipe.servings} servings
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <span className="inline-block bg-slate-100 dark:bg-slate-600 rounded-full px-3 py-1 text-sm font-semibold text-slate-600 dark:text-slate-300 mr-2">
                                                            {recipe.difficulty}
                                                        </span>
                                                        <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                                                            recipe.status === 'published'
                                                            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                                                            : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                                                        }`}>
                                                            {recipe.status}
                                                        </span>
                                                    </div>
                                                    <div className="mt-4 flex justify-end">
                                                        <Link
                                                            href={route('recipe.edit', recipe.slug)}
                                                            className="text-sm text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
                                                        >
                                                            Edit Recipe
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-8">
                                            <p className="text-slate-500 dark:text-slate-400">No recipes yet. Click "Add New Recipe" to create your first recipe!</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-12">
                                <h3 className="text-base font-medium text-slate-700 dark:text-slate-300 mb-6">My Reviews</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {myReviews.length > 0 ? (
                                        myReviews.map((review) => (
                                            <div key={review.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600">
                                                <div className="p-4">
                                                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{review.title}</h4>
                                                    <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">{review.description}</p>
                                                    <div className="mt-4 flex justify-end">
                                                        <Link
                                                            href={route('review.edit', review.slug)}
                                                            className="text-sm text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
                                                        >
                                                            Edit Review
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-8">
                                            <p className="text-slate-500 dark:text-slate-400">No reviews yet. Start reviewing recipes to see them here!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
