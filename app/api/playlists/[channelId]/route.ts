import { NextRequest, NextResponse } from 'next/server';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = process.env.NEXT_APP_GOOGLE_API_KEY; // Your API key should be stored in an environment variable

export async function GET(req: NextRequest, { params }: { params: Promise<{ channelId: string }> }) {
  const { channelId } = await params; // Get the channelId from the URL path parameter

  if (!channelId) {
    return NextResponse.json({ error: 'Channel ID is required' }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: 'API Key is missing' }, { status: 500 });
  }

  try {
    // Fetch the playlists of the given channel using the API key
    const playlistsResponse = await fetch(
      `${YOUTUBE_API_URL}/playlists?part=snippet&channelId=${channelId}&key=${API_KEY}`
    );
    const playlists = await playlistsResponse.json();

    if (playlists.error) {
      return NextResponse.json({ error: playlists.error.message }, { status: 500 });
    }

    // Fetch the items for each playlist
    const playlistsWithItems = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      playlists.items.map(async (playlist: any) => {
        const itemsResponse = await fetch(
          `${YOUTUBE_API_URL}/playlistItems?part=snippet&playlistId=${playlist.id}&key=${API_KEY}`
        );
        const items = await itemsResponse.json();
        return { ...playlist, items: items.items };
      })
    );

    // Return the playlists with items
    return NextResponse.json(playlistsWithItems);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch playlists' }, { status: 500 });
  }
}
