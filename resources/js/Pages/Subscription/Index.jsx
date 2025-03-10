import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function Subscription({ auth }) {
    const [selectedPlan, setSelectedPlan] = useState('monthly');
    const { data, setData, post, processing, errors } = useForm({
        plan_type: 'premium',
        billing_period: 'monthly'
    });

    const plans = {
        free: {
            name: 'Free',
            price: { 
                monthly: 0,
                yearly: 0
            },
            features: [
                'Up to 3 recipes',
                'Basic recipe creation',
                'Community access',
                'Standard support'
            ]
        },
        premium: {
            name: 'Premium',
            price: { 
                monthly: 9.99,
                yearly: 99.99
            },
            features: [
                'Unlimited recipes',
                'Advanced recipe features',
                'Priority support',
                'Ad-free experience',
                'Custom recipe collections',
                'Early access to new features',
                'Recipe analytics',
                'Premium community badge'
            ]
        }
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        post(route('subscription.create'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Subscription Plans" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Choose Your Plan
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Unlock the full potential of your culinary journey
                        </p>
                    </div>

                    {/* Billing Toggle */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                            <button
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                                    selectedPlan === 'monthly'
                                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow'
                                    : 'text-slate-600 dark:text-slate-400'
                                }`}
                                onClick={() => setSelectedPlan('monthly')}
                            >
                                Monthly
                            </button>
                            <button
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                                    selectedPlan === 'yearly'
                                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow'
                                    : 'text-slate-600 dark:text-slate-400'
                                }`}
                                onClick={() => setSelectedPlan('yearly')}
                            >
                                Yearly
                                <span className="ml-1 text-orange-500">(Save 17%)</span>
                            </button>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {Object.entries(plans).map(([planId, plan]) => (
                            <div
                                key={planId}
                                className={`relative rounded-2xl p-8 ${
                                    planId === 'premium'
                                    ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white'
                                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                                }`}
                            >
                                {planId === 'premium' && (
                                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                                        <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}
                                <div className="h-full flex flex-col">
                                    <div className="flex-grow">
                                        <h3 className={`text-2xl font-bold mb-4 ${
                                            planId === 'premium' ? 'text-white' : 'text-slate-900 dark:text-white'
                                        }`}>
                                            {plan.name}
                                        </h3>
                                        <div className="mb-6">
                                            <span className={`text-4xl font-bold ${
                                                planId === 'premium' ? 'text-white' : 'text-slate-900 dark:text-white'
                                            }`}>
                                                ${plan.price[selectedPlan] || plan.price.monthly}
                                            </span>
                                            <span className={`text-lg ${
                                                planId === 'premium' ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                                            }`}>
                                                /{selectedPlan === 'yearly' ? 'year' : 'month'}
                                            </span>
                                        </div>
                                        <ul className="space-y-4 mb-8">
                                            {plan.features.map((feature, index) => (
                                                <li key={index} className="flex items-center">
                                                    <svg
                                                        className={`w-5 h-5 mr-3 ${
                                                            planId === 'premium' ? 'text-white' : 'text-orange-500'
                                                        }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    <span className={
                                                        planId === 'premium'
                                                        ? 'text-white/90'
                                                        : 'text-slate-600 dark:text-slate-300'
                                                    }>
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* <button
                                        onClick={() => {
                                            setData({
                                                plan_type: planId,
                                                billing_period: selectedPlan
                                            });
                                            handleSubmit();
                                        }}
                                        disabled={processing}
                                        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                                            planId === 'premium'
                                            ? 'bg-white text-orange-500 hover:bg-orange-50'
                                            : 'bg-orange-500 text-white hover:bg-orange-600'
                                        } disabled:opacity-50`}
                                    >
                                        {planId === 'free' ? 'Get Started' : 'Subscribe Now'}
                                    </button> */}

                                    <Link
                                        href={route('subscription.create', {
                                            plan_type: planId,
                                            billing_period: selectedPlan
                                        })}
                                        disabled={processing}
                                        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                                            planId === 'premium'
                                            ? 'bg-white text-orange-500 hover:bg-orange-50'
                                            : 'bg-orange-500 text-white hover:bg-orange-600'
                                        } disabled:opacity-50`}
                                    >
                                        {planId === 'free' ? 'Get Started' : 'Subscribe Now'}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
                            Frequently Asked Questions
                        </h2>
                        <div className="max-w-3xl mx-auto space-y-6">
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                    Can I cancel my subscription?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access to premium features until the end of your current billing period.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                    What payment methods do you accept?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    We accept all major credit cards, including Visa, Mastercard, and American Express. We also support PayPal payments.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                    What happens to my recipes if I downgrade?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    If you downgrade to a free plan, you'll keep all your recipes but will only be able to access the first 3. You can upgrade again at any time to regain access to all your recipes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 