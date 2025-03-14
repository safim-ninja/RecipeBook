import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Detail = ({ order }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Order Detail" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-800 shadow sm:rounded-lg">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Detail</h1>
                        <div className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Order Information</h2>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                                        Order Number: {order.order_number}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                                        Customer: {order.user.name}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                                        Chef: {order.chef.name}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                                        Total Amount: {order.total_amount}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Detail;