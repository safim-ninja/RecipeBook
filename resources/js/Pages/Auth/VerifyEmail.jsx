import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Email Verification" />
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
                        <h1 className="text-4xl font-bold mb-6">Verify Your Email</h1>
                        <p className="text-lg text-orange-100">
                            Just one more step before you can start your culinary journey!
                        </p>
                    </div>
                    <div className="text-sm text-orange-200 relative z-10">
                        © 2024 Your Food Company. All rights reserved.
                    </div>
                </div>

                {/* Right Side - Verification Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-slate-50">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Email Verification</h2>
                            <p className="text-slate-600">Please verify your email to continue</p>
                        </div>

                        <div className="mb-6 text-sm text-slate-600">
                            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                        </div>

                        {status === 'verification-link-sent' && (
                            <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-600 text-sm font-medium">
                                A new verification link has been sent to the email address you provided during registration.
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="flex items-center justify-between">
                                <button
                                    disabled={processing}
                                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out disabled:opacity-50"
                                >
                                    Resend Verification Email
                                </button>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-sm text-orange-600 hover:text-orange-800 font-medium"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
