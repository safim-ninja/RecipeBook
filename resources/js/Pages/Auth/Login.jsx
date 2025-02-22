import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left Side - Food Theme */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-orange-400 to-red-600 p-12 text-white flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 opacity-90">
                        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-2 gap-4 p-8">
                            <div className="rounded-xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                                    alt="Delicious meal"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="rounded-xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
                                    alt="Fresh salad"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="rounded-xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
                                    alt="Pizza"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="rounded-xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543"
                                    alt="Dessert"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold mb-6">Welcome Food Lover!</h1>
                        <p className="text-lg text-orange-100">
                            Sign in to discover amazing recipes and culinary experiences.
                        </p>
                    </div>
                    <div className="text-sm text-orange-200 relative z-10">
                        © 2024 Your Food Company. All rights reserved.
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-slate-50">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign In</h2>
                            <p className="text-slate-600">Please enter your credentials</p>
                        </div>

                        {status && (
                            <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out"
                                    placeholder="Enter your email"
                                    autoComplete="username"
                                    autoFocus
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-slate-300 text-orange-600 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                                    />
                                    <span className="ml-2 text-sm text-slate-600">Remember me</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-orange-600 hover:text-orange-800 transition duration-150 ease-in-out"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out disabled:opacity-50"
                            >
                                {processing ? 'Signing in...' : 'Sign In'}
                            </button>

                            <div className="text-center mt-4">
                                <span className="text-slate-600">Don't have an account? </span>
                                <Link href={route('register')} className="text-orange-600 hover:text-orange-800 font-medium">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
