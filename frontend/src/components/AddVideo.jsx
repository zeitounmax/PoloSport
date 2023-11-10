import React, { useContext, useState } from "react";
import { VideoContext } from "../contexts/VideoContext";

function AddVideo() {
  const { fetchVideos } = useContext(VideoContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [time, setTime] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [message, setMessage] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleThumbnailUrlChange = (event) => {
    setThumbnailUrl(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleCategoryIdChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleAddVideo = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/videos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            url,
            thumbnail_url: thumbnailUrl,
            time,
            id_category: categoryId,
          }),
        }
      );

      if (response.ok) {
        setMessage("Vidéo ajoutée!");
        setTitle("");
        setDescription("");
        setUrl("");
        setThumbnailUrl("");
        setTime("");
        setCategoryId("");
        fetchVideos();
      } else {
        throw new Error("Erreur lors de l'ajout de la vidéo");
      }
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la vidéo :", error);
    }
  };

	return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white bg-opacity-75 p-8 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-6">Ajouter une vidéo</h1>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">Titre</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 p-3 w-full border rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 p-3 w-full border rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-600">URL</label>
          <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} className="mt-2 p-3 w-full border rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-600">URL de la vignette</label>
          <input type="text" id="thumbnailUrl" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} className="mt-2 p-3 w-full border rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-medium text-gray-600">Durée</label>
          <input type="text" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-2 p-3 w-full border rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-600">ID de catégorie</label>
          <input type="text" id="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="mt-2 p-3 w-full border rounded-md" />
        </div>

        <button type="button" onClick={handleAddVideo} className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition">
          Ajouter vidéo
        </button>

        {message && <p className="text-center mt-4 text-green-500">{message}</p>}
      </div>
    </div>
  );
}

export default AddVideo;