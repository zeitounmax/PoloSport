import React, { useState, useContext, useEffect } from "react";
import { VideoContext } from "../contexts/VideoContext";

function DeleteVideo() {
  const { videos, setVideos } = useContext(VideoContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [message, setMessage] = useState("");

  const handleVideoCheckboxChange = (event, videoId) => {
    if (event.target.checked) {
      setSelectedVideos([...selectedVideos, videoId]);
    } else {
      setSelectedVideos(selectedVideos.filter((id) => id !== videoId));
    }
  };

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/categories`
    )
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const categoryNameToIdMap = {
    football: 1,
    basketball: 2,
    tennis: 3,
    natation: 4,
    hockey: 5,
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDeleteSelectedVideos = async () => {
    try {
      await Promise.all(
        selectedVideos.map(async (videoId) => {
          await fetch(
            `${
              import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5002"
            }/videos/${videoId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        })
      );

      setVideos(videos.filter((video) => !selectedVideos.includes(video.id)));
      setSelectedVideos([]);
      setMessage("Vidéo supprimée!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la suppression des vidéos :", error);
    }
  };

	return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white bg-opacity-75 p-8 rounded-xl shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-semibold mb-6">Supprimer une vidéo</h1>

        <div className="mb-4">
          <label htmlFor="choiceCategory" className="block text-sm font-medium text-gray-600">Catégorie :</label>
          <select className="mt-2 p-3 w-full border rounded-md" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">-- Toutes les vidéos : --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.id} {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="action-section mt-4">
          <button type="button" onClick={handleDeleteSelectedVideos} className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition">
            Supprimer vidéo sélectionnée
          </button>
          {message && <p className="text-center mt-4 text-red-500">{message}</p>}
        </div>

        {videos
          .filter((video) =>
            selectedCategory
              ? video.id_category === categoryNameToIdMap[selectedCategory]
              : video.id
          )
          .map((video) => (
            <div className="p-4 mb-4 border rounded-md flex items-center" key={video.id}>
              <input
                type="checkbox"
                checked={selectedVideos.includes(video.id)}
                onChange={(e) => handleVideoCheckboxChange(e, video.id)}
                className="mr-2"
              />
              <span>{video.title}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DeleteVideo;