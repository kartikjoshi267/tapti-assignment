import { NextRequest, NextResponse } from 'next/server';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get('Authorization')?.split(' ')[1];
  
  if (!accessToken) {
    return NextResponse.json({ error: 'Access token is required' }, { status: 400 });
  }

  try {
    const playlistsResponse = await fetch(
      `${YOUTUBE_API_URL}/playlists?part=snippet&mine=true`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const playlists = await playlistsResponse.json();

    const playlistsWithItems = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      playlists.items.map(async (playlist: any) => {
        const itemsResponse = await fetch(
          `${YOUTUBE_API_URL}/playlistItems?part=snippet&playlistId=${playlist.id}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const items = await itemsResponse.json();
        return { ...playlist, items: items.items };
      })
    );

    return NextResponse.json(playlistsWithItems);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch playlists' }, { status: 500 });
  }
}