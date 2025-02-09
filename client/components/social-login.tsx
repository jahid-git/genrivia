import { signIn } from 'next-auth/react';

const SocialLogin = () => {
    return (
        <div className='flex flex-col gap-4'>
            <button
                onClick={async () => { await signIn('google', { redirectTo: '/' }); }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
                Sign In with Google
            </button>
            <button
                onClick={async () => { await signIn('google', { redirectTo: '/' }); }}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg">
                Sign In with Github
            </button>
        </div>
    );
};

export default SocialLogin;