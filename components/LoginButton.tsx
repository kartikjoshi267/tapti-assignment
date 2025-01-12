'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        className='bg-gray-100 text-blue-950 p-2 rounded-md font-semibold hover:bg-gray-200 transition-all'
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    );
  }
  return (
    <button
      className='bg-gray-100 text-blue-950 p-2 rounded-md font-semibold hover:bg-gray-200 transition-all'
      onClick={() => signIn("google")}
    >
      Sign In
    </button>
  );
}
