import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';

const Checkout = ({ order }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const { data, setData, post, processing, errors } = useForm({
        payment_method: 'card',
        card_number: '',
        expiry_month: '',
        expiry_year: '',
        cvv: '',
        name_on_card: '',
        billing_address: '',
        city: '',
        postal_code: '',
        country: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('orders.process-payment', order.order_number));
    };
    console.log(order);
    return (
        <AuthenticatedLayout>
            <Head title="Checkout" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Order Summary */}
                        <div className="md:col-span-2">
                            <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm rounded-lg">
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Order Summary</h2>
                                    <div className="border-b border-slate-200 dark:border-slate-700 pb-6 mb-6">
                                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                                            <span>Order Number:</span>
                                            <span className="font-medium">{order.order_number}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                            <span>Chef:</span>
                                            <span className="font-medium">{order.chef?.name}</span>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="space-y-4">
                                        {order.items?.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    {item.recipe?.image && (
                                                        <img
                                                            src={`/recipes/${item.recipe.image}`}
                                                            alt={item.recipe.title}
                                                            className="w-16 h-16 object-cover rounded-md"
                                                        />
                                                    )}
                                                    <div className="ml-4">
                                                        <h3 className="text-slate-900 dark:text-white font-medium">{item.recipe?.title}</h3>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400">Quantity: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <span className="text-slate-900 dark:text-white font-medium">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Total */}
                                    <div className="border-t border-slate-200 dark:border-slate-700 mt-6 pt-6">
                                        <div className="flex justify-between text-lg font-semibold text-slate-900 dark:text-white">
                                            <span>Total:</span>
                                            <span>${order.total_amount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <div className="md:col-span-1">
                            <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm rounded-lg">
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Payment Details</h2>
                                    <form onSubmit={handleSubmit}>
                                        {/* Payment Method Selection */}
                                        <div className="mb-6">
                                            <div className="flex space-x-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setPaymentMethod('card')}
                                                    className={`flex-1 py-3 px-4 rounded-lg border ${
                                                        paymentMethod === 'card'
                                                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                                        : 'border-slate-200 dark:border-slate-700'
                                                    }`}
                                                >
                                                    <span className={paymentMethod === 'card' ? 'text-orange-600 dark:text-orange-400' : 'text-slate-600 dark:text-slate-400'}>
                                                        Credit Card
                                                    </span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setPaymentMethod('paypal')}
                                                    className={`flex-1 py-3 px-4 rounded-lg border ${
                                                        paymentMethod === 'paypal'
                                                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                                        : 'border-slate-200 dark:border-slate-700'
                                                    }`}
                                                >
                                                    <span className={paymentMethod === 'paypal' ? 'text-orange-600 dark:text-orange-400' : 'text-slate-600 dark:text-slate-400'}>
                                                        PayPal
                                                    </span>
                                                </button>
                                            </div>
                                        </div>

                                        {paymentMethod === 'card' && (
                                            <>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                                        Name on Card
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.name_on_card}
                                                        onChange={e => setData('name_on_card', e.target.value)}
                                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700"
                                                        placeholder="John Doe"
                                                    />
                                                    {errors.name_on_card && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.name_on_card}</p>
                                                    )}
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                                        Card Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.card_number}
                                                        onChange={e => setData('card_number', e.target.value)}
                                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700"
                                                        placeholder="1234 5678 9012 3456"
                                                    />
                                                    {errors.card_number && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.card_number}</p>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-3 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                                            Month
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={data.expiry_month}
                                                            onChange={e => setData('expiry_month', e.target.value)}
                                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700"
                                                            placeholder="MM"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                                            Year
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={data.expiry_year}
                                                            onChange={e => setData('expiry_year', e.target.value)}
                                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700"
                                                            placeholder="YY"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                                            CVV
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={data.cvv}
                                                            onChange={e => setData('cvv', e.target.value)}
                                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700"
                                                            placeholder="123"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-6">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                                        Billing Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.billing_address}
                                                        onChange={e => setData('billing_address', e.target.value)}
                                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700 mb-2"
                                                        placeholder="Street Address"
                                                    />
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <input
                                                            type="text"
                                                            value={data.city}
                                                            onChange={e => setData('city', e.target.value)}
                                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700"
                                                            placeholder="City"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={data.postal_code}
                                                            onChange={e => setData('postal_code', e.target.value)}
                                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-700"
                                                            placeholder="Postal Code"
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {paymentMethod === 'paypal' && (
                                            <div className="text-center py-6">
                                                <p className="text-slate-600 dark:text-slate-400 mb-4">
                                                    You will be redirected to PayPal to complete your payment.
                                                </p>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
                                        >
                                            {processing ? 'Processing...' : `Pay $${order.total_amount}`}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Checkout;