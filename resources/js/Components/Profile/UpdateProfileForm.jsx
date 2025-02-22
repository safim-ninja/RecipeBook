import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function UpdateProfileForm({ user, onClose }) {
    const { data, setData, post, processing, errors} = useForm({
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: null,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [avatarPreview, setAvatarPreview] = useState(user.avatar ? `/avatars/${user.avatar}` : '/avatars/default-avatar.svg');

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

    const submitProfileUpdate = (e) => {
        e.preventDefault();

        // Create FormData object to properly handle file uploads
        // const formData = new FormData();
        // formData.append('name', data.name);
        // formData.append('email', data.email);
        // formData.append('username', data.username);
        // formData.append('current_password', data.current_password);
        // formData.append('password', data.password);
        // formData.append('password_confirmation', data.password_confirmation);

        // if (data.avatar) {
        //     formData.append('avatar', data.avatar);
        // }

        post(route('profile.update'), {
            // data: formData,
            // forceFormData: true,
            onSuccess: () => {
                onClose();
                toast.success('Profile updated successfully');
            },
        });
    };

    return (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Edit Profile</h3>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-300"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <form onSubmit={submitProfileUpdate} className="space-y-6" encType="multipart/form-data">
                {/* Profile Picture Section */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Profile Picture</label>
                    <div className="mt-2 flex items-center space-x-6">
                        <label htmlFor="avatar" className="cursor-pointer group">
                            <div className="relative">
                                <img
                                    src={avatarPreview}
                                    alt="Profile preview"
                                    className="h-24 w-24 rounded-full object-cover transition duration-300 group-hover:opacity-75"
                                />
                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-0 transition duration-300 group-hover:bg-opacity-30">
                                    <span className="text-white opacity-0 transition duration-300 group-hover:opacity-100">
                                        Change
                                    </span>
                                </div>
                            </div>
                        </label>
                        <input id="avatar" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                    </div>
                    {errors.avatar && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.avatar}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
                    <input
                        type="text"
                        value={data.username}
                        onChange={e => setData('username', e.target.value)}
                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Current Password</label>
                    <input
                        type="password"
                        value={data.current_password}
                        onChange={e => setData('current_password', e.target.value)}
                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                    />
                    {errors.current_password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.current_password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm New Password</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={e => setData('password_confirmation', e.target.value)}
                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
                    />
                    {errors.password_confirmation && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password_confirmation}</p>}
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-orange-500 dark:bg-orange-600 text-white rounded-md hover:bg-orange-600 dark:hover:bg-orange-700 disabled:opacity-50"
                    >
                        {processing ? 'Updating...' : 'Update Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
}
