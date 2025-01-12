'use client';

import { MouseEvent, useState } from 'react';
import Playlist from '@/components/Playlist';
import { useRouter } from 'next/navigation';

export default function ChannelPlaylistPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [channelId, setChannelId] = useState('');

  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchPlaylists = async (e: MouseEvent<any>) => {
    e.preventDefault();
    const response = await fetch(`/api/playlists/${channelId}`);
    const data = await response.json();
    if (data.error) {
      return;
    }
    setPlaylists(data);
  };

  return (
    <main>
      <nav className='w-full flex-col text-center p-3 bg-blue-600 text-white flex justify-between items-center'>
        <div className='underline cursor-pointer' onClick={() => router.replace("/")}>&larr; Go Back to Home</div>
      </nav>
      <form className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md m-5">
        <input
          type="text"
          name="channelId"
          onChange={(e) => setChannelId(e.target.value)}
          placeholder="Channel ID"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="button"
          onClick={fetchPlaylists}
          className="p-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Fetch&#10240;Playlists
        </button>
      </form>
      <div>
        {playlists.length > 0 && playlists.map((playlist) => (
          <Playlist key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </main>
  );
}
