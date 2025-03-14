import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-4 py-2.5 text-sm font-medium leading-5 transition duration-200 ease-in-out rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-1 ' +
                (active
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50 hover:bg-orange-600 focus:ring-orange-500 dark:bg-orange-600 dark:text-white dark:shadow-orange-900/50 dark:hover:bg-orange-700 '
                    : 'bg-white text-slate-600 shadow-slate-200/50 hover:bg-slate-50 hover:text-slate-800 focus:ring-slate-500 dark:bg-slate-800 dark:text-slate-300 dark:shadow-slate-900/30 dark:hover:bg-slate-700 dark:hover:text-slate-100') +
                className
            }
        >
            {children}
        </Link>
    );
}
