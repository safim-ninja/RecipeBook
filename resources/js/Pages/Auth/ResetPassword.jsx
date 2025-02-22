import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Reset Password" />
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
                        <h1 className="text-4xl font-bold mb-6">Reset Your Password</h1>
                        <p className="text-lg text-orange-100">
                            Create a new password to secure your account.
                        </p>
                    </div>
                    <div className="text-sm text-orange-200 relative z-10">
                        © 2024 Your Food Company. All rights reserved.
                    </div>
                </div>

                {/* Right Side - Reset Password Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-slate-50">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Reset Password</h2>
                            <p className="text-slate-600">Please enter your new password</p>
                        </div>

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
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out"
                                    placeholder="Enter new password"
                                    autoComplete="new-password"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out"
                                    placeholder="Confirm new password"
                                    autoComplete="new-password"
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out disabled:opacity-50"
                            >
                                {processing ? 'Processing...' : 'Reset Password'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
