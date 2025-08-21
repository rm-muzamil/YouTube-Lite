// utils/api.ts
export async function generateThumbnail(videoFile: File) {
    const formData = new FormData();
    formData.append("file", videoFile);

    const res = await fetch("http://localhost:8000/generate-thumbnail/", {
        method: "POST",
        body: formData,
    });

    const blob = await res.blob();
    return URL.createObjectURL(blob); // use this URL in <img src=...>
}
