'use client';

import Image from "next/image";
import Link from "next/link";

interface PlaylistProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  playlist: any;
}

export default function Playlist({ playlist }: PlaylistProps) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md m-4">
      <Link href={`https://youtube.com/playlist?list=${playlist.id}`} target="_blank" className="text-2xl font-bold text-gray-900 hover:text-gray-600">
        {playlist.snippet.title}
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 max-h-[500px] overflow-auto">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {playlist.items.map((item: any) => (
          <Link
            href={`https://youtube.com/watch?v=${item.snippet.resourceId.videoId}`}
            target="_blank"
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:text-gray-600  text-gray-800"
          >
            <Image
              src={item.snippet.thumbnails.high.url}
              alt="thumbnail"
              className="w-full object-contain"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold mb-2">
                {item.snippet.title}
              </h4>
              <p className="text-sm line-clamp-2">
                {item.snippet.description || "No description available."}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
