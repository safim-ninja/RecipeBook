import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import logo from '../../../public/recipe-book.png';

const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, i) =>
        regex.test(part) ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-700">{part}</mark> : part
    );
};

export default function MasterLayout({ header, children }) {
    const { popularTags, popularCategories } = usePage().props;
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);

    const handleSearch = async (value) => {
        if (value.trim() === '') {
            setFilteredRecipes([]);
            return;
        }

        const response = await fetch(`/recipes/search?query=${encodeURIComponent(value)}`);
        const results = await response.json();
        setFilteredRecipes(results);
        setShowSearchDropdown(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const searchContainer = document.getElementById('search-container');
            if (searchContainer && !searchContainer.contains(event.target)) {
                setShowSearchDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.theme === 'dark' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }, [darkMode]);

    const fetchNotifications = async () => {
        if (!user) return;
        try {
            const response = await fetch('/notifications');
            const data = await response.json();
            setNotifications(data.notifications);
            setUnreadCount(data.notifications.filter(n => !n.read_at).length);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAsRead = async (id) => {
        try {
            await fetch(`/notifications/${id}/mark-as-read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await fetchNotifications(); // Refresh notifications
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Poll for new notifications every minute
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const notificationContainer = document.getElementById('notification-container');
            if (notificationContainer && !notificationContainer.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Top Navigation */}
            <nav className="fixed top-0 z-50 w-full bg-white shadow-sm dark:bg-slate-800">
                <div className="mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                {/*<ApplicationLogo className="h-8 w-8 text-orange-500" />*/}
                                <img src={logo} alt="logo" className="h-8 w-8" />
                                <span className="ml-2 text-xl font-bold text-orange-500">RecipeBook</span>
                            </Link>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden flex-1 max-w-xl mx-8 lg:block">
                            <div className="relative" id="search-container">
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none dark:bg-slate-700 dark:border-slate-600"
                                        placeholder="Search recipes..."
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            handleSearch(e.target.value);
                                        }}
                                    />
                                    <div className="absolute inset-y-0 left-0 flex pl-3 items-center">
                                        <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    {filteredRecipes.length > 0 && showSearchDropdown && (
                                        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg max-h-96 overflow-y-auto">
                                            {filteredRecipes.map((recipe) => (
                                                <Link
                                                    key={recipe.id}
                                                    href={`/recipe/${recipe.slug}`}
                                                    className="block px-4 py-2 text-slate-800 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700"
                                                >
                                                    <div className='flex items-center'>
                                                        <img
                                                            // src={recipe.image}
                                                            src={recipe.image ? `/recipes/${recipe.image}` : '/images/default-recipe.jpg'}
                                                            alt={recipe.title}

                                                            className="h-12 w-12 rounded-lg object-cover"
                                                        />
                                                        <div className="ml-2 flex flex-col">
                                                            <span className="font-medium">
                                                                {highlightMatch(recipe.title, searchQuery)}
                                                            </span>
                                                            {recipe.tags && (
                                                                <div className="flex flex-wrap gap-1 mt-1">
                                                                    {JSON.parse(recipe.tags).map((tag, index) => (
                                                                        <span
                                                                            key={index}
                                                                            className="text-xs px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300"
                                                                        >
                                                                            #{highlightMatch(tag.trim(), searchQuery)}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center">
                            {/* Dark Mode Toggle */}
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="mr-4 p-2 text-slate-600 hover:text-orange-500 dark:text-slate-300"
                                aria-label="Toggle dark mode"
                            >
                                <svg className="h-6 w-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <svg className="h-6 w-6 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </button>

                            {/* Notification Bell */}
                            <div className="relative" id="notification-container">
                                <button 
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="mr-4 p-2 text-slate-600 hover:text-orange-500 dark:text-slate-300 relative"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    {unreadCount > 0 && (
                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-orange-500 rounded-full">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>

                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-md shadow-lg overflow-hidden z-50 border border-slate-200 dark:border-slate-700">
                                        <div className="py-2">
                                            <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                                                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h3>
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {notifications.length > 0 ? (
                                                    notifications.map((notification) => (
                                                        <div
                                                            key={notification.id}
                                                            className={`px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 ${
                                                                !notification.read_at ? 'bg-orange-50 dark:bg-slate-700/50' : ''
                                                            }`}
                                                            onClick={() => markAsRead(notification.id)}
                                                        >
                                                            <p className="text-sm text-slate-900 dark:text-white">
                                                                {notification.data.message}
                                                            </p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                                {new Date(notification.created_at).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                                                        No notifications
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center rounded-full bg-white p-1 focus:outline-none dark:bg-slate-800">
                                        <img
                                            className="h-8 w-8 rounded-full object-cover"
                                            src={user?.avatar ? `/avatars/${user.avatar}` : 'https://ui-avatars.com/api/?name=' + user?.name + '&background=fb923c&color=fff'}
                                            alt={user?.name}
                                        />
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    {user ? (
                                        <>
                                            <Dropdown.Link href={route('profile.show')}>Profile</Dropdown.Link>
                                            <Dropdown.Link href="#">My Recipes</Dropdown.Link>
                                            <Dropdown.Link href="#">Saved Items</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">Sign Out</Dropdown.Link>
                                        </>
                                    ) : (
                                        <Dropdown.Link href={route('login')}>Login</Dropdown.Link>
                                    )}
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Layout */}
            <div className="flex pt-16">
                {/* Left Sidebar */}
                <div className="fixed left-0 hidden h-full w-64 border-r border-slate-200 bg-white p-4 dark:bg-slate-800 dark:border-slate-700 lg:block">
                    <div className="space-y-4">
                        <NavLink href={route('dashboard')} active={route().current('dashboard')}
                            className="flex items-center space-x-2 rounded-lg px-4 py-2 text-slate-700 hover:bg-orange-50 dark:text-slate-200 dark:hover:bg-slate-700">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>Home</span>
                        </NavLink>

                        <div className="px-4 py-2">
                            <h3 className="mb-2 text-sm font-semibold text-slate-600 dark:text-slate-400">Categories</h3>
                            <div className="space-y-1">
                                {popularCategories.map((category, index) => (
                                    <Link
                                        key={index}
                                        href={route('category.recipes', category.slug)}
                                        className={`block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 dark:text-slate-200 dark:hover:bg-slate-700 ${
                                            route().current('category.recipes', category.slug) ? 'bg-orange-100 dark:bg-slate-700' : ''
                                        }`}
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:ml-64 lg:mr-64">
                    {header && (
                        <header className="bg-white shadow-sm dark:bg-slate-800">
                            <div className="mx-auto px-4 py-4">
                                {header}
                            </div>
                        </header>
                    )}

                    <main className="container mx-auto px-4 py-8">
                        {children}
                    </main>
                </div>

                {/* Right Sidebar */}
                <div className="fixed right-0 hidden h-full w-64 border-l border-slate-200 bg-white p-4 dark:bg-slate-800 dark:border-slate-700 lg:block">
                    <div className="space-y-6">
                        {/* {trendingRecipes.length > 0 &&
                            <div>
                                <h3 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-400">Trending Recipes</h3>
                                <div className="space-y-3">
                                    {trendingRecipes.map((recipe) => (
                                        <div key={recipe.id} className="flex items-center space-x-3">
                                            <img
                                                // src={recipe.image}
                                                src={recipe.image ? `/recipes/${recipe.image}` : '/images/default-recipe.jpg'}
                                                alt={recipe.title}
                                                className="h-12 w-12 rounded-lg object-cover"
                                                />
                                            <div>
                                                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{recipe.title}</p>
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-xs text-yellow-500">★</span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                                        {Number(recipe.reviews_avg_rating).toFixed(1)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        } */}
                        <div>
                            <h3 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-400">Popular Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(popularTags).map(([tag, count], index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-400">Sponsored</h3>
                            <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
                                <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">Advertisement</div>
                                <div id="sidebar-ad" className="w-full h-[250px] bg-slate-200 dark:bg-slate-600 rounded flex items-center justify-center">
                                    {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}
                                    {/* <ins className="adsbygoogle"
                                        style={{ display: 'block' }}
                                        data-ad-client="YOUR-AD-CLIENT-ID"
                                        data-ad-slot="YOUR-AD-SLOT-ID"
                                        data-ad-format="auto"
                                        data-full-width-responsive="true">
                                    </ins>
                                    {
                                        (adsbygoogle = window.adsbygoogle || []).push({})
                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme={darkMode ? 'dark' : 'light'} />
        </div>
    );
}
