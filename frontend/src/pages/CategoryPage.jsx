import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { VideoContext } from "../contexts/VideoContext";
import Logo from "../images/logo RGB Original Digital.png";
import { useAuth } from "../contexts/AuthContext";

function CategoryPage() {
  const { token } = useAuth();
  const { categoryName } = useParams();
  const { videos } = useContext(VideoContext);
  const categoryNameToIdMap = {
    Football: 1,
    Basketball: 2,
    Tennis: 3,
    Natation: 4,
    Hockey: 5,
  };

  const categoryId = categoryNameToIdMap[categoryName];
  const getVideosByCategory = (idCategory) => {
    return videos.filter((video) => video.id_category === idCategory);
  };

  const videoElements = getVideosByCategory(categoryId).map((video) => (
    <div key={video.id} className="thumbnail">
      <Link to={`/videos/${video.id}`} className="no-underline text-white">
        <h2 className="text-xl font-bold mb-2">{video.title}</h2>
        <img
          src={video.is_public || token ? video.thumbnail_url : Logo}
          alt={video.title}
          className="imgCategory"
        />
        {!video.is_public && !token && (
          <p className="text-sm">
            Pour regarder {video.title}, il faut se connecter.
          </p>
        )}
      </Link>
    </div>
  ));

  return (
    <div className="text-center bg-custom-dark"> 
      <h1 className="titleCategory text-3xl font-bold mb-4 text-white">{categoryName}</h1>
      <div className="thumbnails-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videoElements}
      </div>
    </div>
  );
}

export default CategoryPage;
