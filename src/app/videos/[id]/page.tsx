// // app/videos/[id]/page.tsx
// "use client";

// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function VideoDetailPage() {
//   const { id } = useParams();
//   const [video, setVideo] = useState<any>(null);
//   const [views, setViews] = useState(0);

//   useEffect(() => {
//     fetch(`/api/videos/${id}`)
//       .then((res) => res.json())
//       .then((data) => setVideo(data.video));
//   }, [id]);

//   if (!video) return <p>Loading...</p>;

//   useEffect(() => {
//     fetch(`/api/videos/${id}/view`, { method: "POST" })
//       .then((res) => res.json())
//       .then((data) => setViews(data.views));
//   }, [id]);

//   return (
//     <div>
//       <div className="p-6">
//         <video
//           autoPlay
//           controls
//           className="w-full max-w-4xl rounded-lg shadow-lg"
//           src={video.videoURL}
//         />
//         <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
//         <p className="text-gray-600 mt-2">{video.description}</p>
//       </div>
//       <div>
//         <div className="flex items-center gap-3">
//           <Image
//             src={video.owner?.image || "/default-avatar.png"}
//             alt={video.owner?.name || "Uploader"}
//             width={48}
//             height={48}
//             className="rounded-full"
//           />
//           <div>
//             <p>Views: {views}</p>
//             <h2 className="font-semibold">{video.owner?.name}</h2>
//             <p className="text-gray-500 text-sm">{video.owner?.email}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState<any>(null);
  const [views, setViews] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [viewed, setViewed] = useState(false); // track one-time view

  useEffect(() => {
    if (!id) return;

    async function fetchVideo() {
      const res = await fetch(`/api/videos/${id}`);
      const data = await res.json();
      setVideo(data.video);
      setViews(data.video.views || 0);
    }

    fetchVideo();
  }, [id]);

  const handlePlay = async () => {
    if (viewed || !id) return;

    const res = await fetch(`/api/videos/${id}/view`, { method: "POST" });
    const data = await res.json();
    setViews(data.views);
    setViewed(true);
  };

  if (!video) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <video
        ref={videoRef}
        controls
        autoPlay
        className="w-full rounded-lg shadow-lg"
        src={video.videoURL}
        onPlay={handlePlay} // increment view on first play
      />

      <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
      <p className="text-gray-600 mt-2">{video.description}</p>

      <div className="flex items-center gap-3 mt-6">
        <Image
          src={video.owner?.image || "/default-avatar.png"}
          alt={video.owner?.name || "Uploader"}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <p className="text-gray-500 text-sm">Views: {views}</p>
          <h2 className="font-semibold">{video.owner?.name}</h2>
          <p className="text-gray-500 text-sm">{video.owner?.email}</p>
        </div>
      </div>
    </div>
  );
}
