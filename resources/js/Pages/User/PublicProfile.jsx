import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';
export default function Profile({ recipes, reviews, user }) {
    const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);
    const [cart, setCart] = useState([]);
    const [showCartModal, setShowCartModal] = useState(false);

    const addToCart = (recipe) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.recipe_id === recipe.id);
            if (existingItem) {
                toast.success('Quantity updated in cart');
                return prevCart.map(item =>
                    item.recipe_id === recipe.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            }
            toast.success('Item added to cart');
            return [...prevCart, { recipe_id: recipe.id, quantity: 1 }];
        });
    };
    console.log(cart);
    

    const placeOrder = () => {
        router.post(route('orders.store'), {
            chef_id: user.id,
            items: cart,
        });
    };

    const cartTotal = cart.reduce((total, item) => {
        const recipe = recipes.find(r => r.id === item.recipe_id);
        return total + (recipe?.price || 0) * item.quantity;
    }, 0);

    const removeFromCart = (recipeId) => {
        setCart(prevCart => prevCart.filter(item => item.recipe_id !== recipeId));
        toast.success('Item removed from cart');
    };

    const updateQuantity = (recipeId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(prevCart => prevCart.map(item =>
            item.recipe_id === recipeId ? { ...item, quantity: newQuantity } : item
        ));
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
                                        // src={user.avatar ? `/avatars/${user.avatar}` : '/assets/avatar.png'}
                                        src={user.avatar ? `/avatars/${user.avatar}` : '/avatars/default-avatar.svg'}

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
                                        <div key={recipe.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
                                            {recipe.image && (
                                                <img
                                                    // src={recipe.image}
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
                                                        {recipe.time}
                                                    </div>
                                                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        {recipe.servings} servings
                                                    </div>
                                                </div>
                                                {recipe.is_orderable && (
                                                    <div className="pt-4 border-t border-slate-200 dark:border-slate-600">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-lg text-slate-800 dark:text-slate-200 font-semibold">${recipe.price}</span>
                                                            <button
                                                                onClick={() => addToCart(recipe)}
                                                                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                                                            >
                                                                Add to Order
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {reviews.length > 0 && (
                                <div className="mt-12">
                                    <h3 className="text-base font-medium text-slate-700 dark:text-slate-300 mb-6">Reviews</h3>
                                    <div className="space-y-3">
                                        {reviews.map((review) => (
                                            <div key={review.id}>
                                                <h4>{review.title}</h4>
                                                <p>{review.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* <div className="mt-12">
                                <h3 className="text-base font-medium text-slate-700 dark:text-slate-300 mb-6">My Reviews</h3>
                                <div className="space-y-3">
                                    {reviews.map((review) => (
                                        <div key={review.id}>
                                            <h4>{review.title}</h4>
                                            <p>{review.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {cart.length > 0 && (
                <>
                    <button
                        onClick={() => setShowCartModal(true)}
                        className="fixed bottom-4 right-4 z-50 flex items-center space-x-3 bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600"
                    >
                        <div className="flex items-center space-x-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <div className="flex items-center space-x-2">
                                <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                    {cart.length}
                                </span>
                                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </button>

                    {showCartModal && (
                        <div className="fixed inset-0 z-50 overflow-y-auto">
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-none" onClick={() => setShowCartModal(false)}>
                                    <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 opacity-25"></div>
                                </div>
                                <div className="inline-block align-bottom bg-white dark:bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="p-6">
                                        <h3 className="text-lg font-medium mb-4 text-slate-900 dark:text-white">Your Cart</h3>
                                        <div className="space-y-4">
                                            {cart.map(item => {
                                                const recipe = recipes.find(r => r.id === item.recipe_id);
                                                return recipe && (
                                                    <div key={item.recipe_id} className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <img
                                                                src={recipe.image ? `/recipes/${recipe.image}` : '/images/default-recipe.jpg'}
                                                                alt={recipe.title}
                                                                className="w-16 h-16 rounded-lg object-cover"
                                                            />
                                                            <div>
                                                                <h4 className="text-slate-800 dark:text-slate-200">{recipe.title}</h4>
                                                                <p className="text-slate-600 dark:text-slate-400">${recipe.price}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <button onClick={() => updateQuantity(item.recipe_id, item.quantity - 1)} className="p-1">-</button>
                                                            <span>{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.recipe_id, item.quantity + 1)} className="p-1">+</button>
                                                            <button onClick={() => removeFromCart(item.recipe_id)} className="text-red-500 ml-2">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="mt-6 border-t pt-4 dark:border-slate-700">
                                            <div className="flex justify-between mb-4">
                                                <span className="text-slate-800 dark:text-slate-200">Total:</span>
                                                <span className="text-slate-800 dark:text-slate-200 font-bold">${cartTotal.toFixed(2)}</span>
                                            </div>
                                            <button
                                                onClick={placeOrder}
                                                className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
                                            >
                                                Proceed to Checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </AuthenticatedLayout>
    );
}
