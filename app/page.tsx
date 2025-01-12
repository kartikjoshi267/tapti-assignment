'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Playlist from '@/components/Playlist';
import LoginButton from '@/components/LoginButton';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [playlists, setPlaylists] = useState<any[]>([]);

  const fetchPlaylists = async () => {
    if (!session) return;

    const response = await fetch('/api/playlists', {
      headers: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Authorization: `Bearer ${(session as any).accessToken}`,
      },
    });
    const data = await response.json();
    if (data.error) {
      signOut();
      return;
    }
    setPlaylists(data);
  };

  useEffect(() => {
    // @ts-expect-error Type 'undefined' is not assignable to type 'string | undefined'.
    if (session && session.accessToken) {
      fetchPlaylists();
    }
  // @ts-expect-error Type 'undefined' is not assignable to type 'string | undefined'.
  }, [session?.accessToken]);

  return (
    <main>
      <nav className='w-full flex-col text-center p-3 bg-blue-600 text-white flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>YouTube Playlist Data Retriever</h1>
        <LoginButton />
      </nav>
      <div className='m-5 underline'>
        <Link href="/channel/playlists">Fetch playlists using Channel Id →</Link>
      </div>
      {/* {session && (
        <button onClick={fetchPlaylists}>Fetch Playlists</button>
      )} */}
      <div>
        {session && playlists && playlists.map((playlist) => (
          <Playlist key={playlist.id} playlist={playlist} />
        ))}
      </div>
      {!session && (
        <div className='w-full flex justify-center items-center'>
          <h1 className='text-xl font-semibold'>Please sign in to view your playlists</h1>
        </div>
      )}
    </main>
  );
}
