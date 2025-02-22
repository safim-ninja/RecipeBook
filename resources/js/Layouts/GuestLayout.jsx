import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
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
                    <Link href="/">
                        <ApplicationLogo className="h-12 w-12 fill-current text-white" />
                    </Link>
                    <h1 className="mt-8 text-4xl font-bold">Welcome to Our Food Community</h1>
                    <p className="mt-4 text-lg opacity-90">Discover amazing recipes and connect with fellow food lovers</p>
                </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex w-full md:w-1/2 items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="md:hidden">
                        <Link href="/">
                            <ApplicationLogo className="h-12 w-12 fill-current text-orange-500" />
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
