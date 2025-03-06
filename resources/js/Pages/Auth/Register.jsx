import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        avatar: null,
    });

    const [avatarPreview, setAvatarPreview] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setData('avatar', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left Side - Food Theme */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-orange-400 to-red-600 p-12 text-white flex-col justify-between relative overflow-hidden sticky top-0 h-screen">
                    <div className="absolute inset-0 opacity-90">
                        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-2 gap-4 p-8">
                            <div className="rounded-xl overflow-hidden">
                                <img
                                    src="/login-1.jpeg"
                                    alt="Delicious meal"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="rounded-xl overflow-hidden">
                                <img
                                    src="/login-2.jpeg"
                                    alt="Fresh salad"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="rounded-xl overflow-hidden">
                                <img
                                    src="/login-3.jpeg"
                                    alt="Pizza"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="rounded-xl overflow-hidden">
                                <img
                                    src="/login-4.jpeg"
                                    alt="Dessert"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold mb-6">Join Our Food Community!</h1>
                        <p className="text-lg text-orange-100">
                            Create an account to start your culinary journey with us.
                        </p>
                    </div>
                    <div className="text-sm text-orange-200 relative z-10">
                        © 2024 Your Food Company. All rights reserved.
                    </div>
                </div>

                {/* Right Side - Register Form */}
                <div className="w-full md:w-1/2 overflow-y-auto bg-slate-50">
                    <div className="w-full max-w-md mx-auto py-8 px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
                            <p className="text-slate-600">Please fill in your details</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out"
                                    placeholder="Enter your full name"
                                    autoComplete="name"
                                    autoFocus
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out"
                                    placeholder="Choose a username"
                                />
                                {errors.username && (
                                    <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                                )}
                            </div>

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
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out"
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Profile Picture
                                </label>
                                <div className="mt-1">
                                    <label
                                        htmlFor="avatar-upload"
                                        className="cursor-pointer block w-40 h-40 rounded-lg border-2 border-dashed border-slate-300 hover:border-orange-500 transition-colors relative"
                                    >
                                        <input
                                            id="avatar-upload"
                                            type="file"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                        />
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="Avatar preview"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                                                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                <span className="text-sm">Select Image</span>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {errors.avatar && (
                                    <p className="mt-2 text-sm text-red-600">{errors.avatar}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-orange-400 to-red-600 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out disabled:opacity-50"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            <div className="text-center mt-4">
                                <span className="text-slate-600">Already have an account? </span>
                                <Link href={route('login')} className="text-orange-600 hover:text-orange-800 font-medium">
                                    Sign in
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
