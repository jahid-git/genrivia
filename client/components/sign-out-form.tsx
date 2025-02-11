import Form from 'next/form';

import { signOut } from '@/app/(auth)/auth';
import { useRouter } from 'next/router';

export const SignOutForm = () => {
  const { replace } = useRouter()
  return (
    <Form
      className="w-full"
      action={async () => {
        'use server';

        await signOut({
          redirectTo: '/',
        });
        replace('/login');
      }}
    >
      <button
        type="submit"
        className="w-full text-left px-1 py-0.5 text-red-500"
      >
        Sign out
      </button>
    </Form>
  );
};
