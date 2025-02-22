export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Plate circle */}
            <circle cx="12" cy="12" r="10" />

            {/* Fork */}
            <path d="M7 4v5c0 1 .5 2 1.5 2s1.5-1 1.5-2V4" />
            <path d="M10 4v5c0 1 .5 2 1.5 2s1.5-1 1.5-2V4" />
            <path d="M10 11v9" />

            {/* Knife */}
            <path d="M14 4c.5 0 2.5.5 3 2 .5 1.5.5 3 0 4-.5 1-2 1.5-3 1.5" />
            <path d="M14 11.5l2 8.5" />
        </svg>
    );
}
