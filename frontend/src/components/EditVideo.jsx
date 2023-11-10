import React, { useState, useContext, useEffect } from "react";
import { VideoContext } from "../contexts/VideoContext";

function EditVideo() {
  const { videos, setVideos } = useContext(VideoContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [message, setMessage] = useState("");

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

  const handleVideoCheckboxChange = (event, videoId) => {
    if (event.target.checked) {
      setSelectedVideos((prevSelectedVideos) => [
        ...prevSelectedVideos,
        videoId,
      ]);
    } else {
      setSelectedVideos((prevSelectedVideos) =>
        prevSelectedVideos.filter((id) => id !== videoId)
      );
    }
  };

  const handleFieldChange = (event, videoId) => {
    const { name, value } = event.target;
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === videoId) {
          return {
            ...video,
            [name]: value,
          };
        }
        return video;
      })
    );
  };

  const handleUpdateVideos = async () => {
    try {
      await Promise.all(
        selectedVideos.map(async (videoId) => {
          const selectedVideo = videos.find((video) => video.id === videoId);
          await fetch(
            `${
              import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
            }/videos/${videoId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(selectedVideo),
            }
          );
        })
      );

      setSelectedVideos([]);
      setMessage("Vidéo modifiée!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la modification des vidéos :", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white bg-opacity-75 p-8 rounded-xl shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-semibold mb-6">Modifier une vidéo</h1>

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
          <button type="button" onClick={handleUpdateVideos} className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition">
            Modifier vidéo sélectionnée
          </button>
          {message && <p className="text-center mt-4 text-green-500">{message}</p>}
        </div>

        {videos
          .filter((video) =>
            selectedCategory
              ? video.id_category === categoryNameToIdMap[selectedCategory]
              : video
          )
          .map((video) => (
            <div className="p-4 mb-4 border rounded-md" key={video.id}>
              <input
                type="checkbox"
                checked={selectedVideos.includes(video.id)}
                onChange={(e) => handleVideoCheckboxChange(e, video.id)}
              />
              <span className="ml-2">{video.title}</span>
              <h5 className="mt-2">{video.description}</h5>

              <div className="mt-2">
                <label htmlFor={`updatedTitle_${video.id}`} className="block text-sm font-medium text-gray-600">Nouveau titre :</label>
                <input
                  type="text"
                  id={`updatedTitle_${video.id}`}
                  name="title"
                  value={video.title}
                  onChange={(e) => handleFieldChange(e, video.id)}
                  className="mt-2 p-3 w-full border rounded-md"
                />
              </div>

              <div className="mt-2">
                <label htmlFor={`updatedDescription_${video.id}`} className="block text-sm font-medium text-gray-600">Nouvelle description :</label>
                <textarea
                  id={`updatedDescription_${video.id}`}
                  name="description"
                  value={video.description}
                  onChange={(e) => handleFieldChange(e, video.id)}
                  className="mt-2 p-3 w-full border rounded-md"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default EditVideo;