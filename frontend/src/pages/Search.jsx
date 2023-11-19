import React, { useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { VideoContext } from "../contexts/VideoContext";
import Logo from "../images/logo RGB Original Digital.png";
import { useAuth } from "../contexts/AuthContext";

function Search() {
  const { token } = useAuth();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { videos } = useContext(VideoContext);
  const resultsVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-semibold text-center py-4">
        Les résultats de la recherche: {query}
      </h1>
      {resultsVideos.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {resultsVideos.map((video) =>
            video.is_public || (!video.is_public && token) ? (
              <Link
                key={`${video.id}`}
                to={`/videos/${video.id}`}
                className="m-4 max-w-sm rounded-md overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <img
                  className="w-full h-40 object-cover"
                  src={video.thumbnail_url}
                  alt={video.title}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{video.title}</h2>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                key={`${video.id}`}
                className="m-4 max-w-sm rounded-md overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <img
                  className="w-full h-40 object-cover"
                  src={Logo}
                  alt="Connecte Toi"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">
                    Pour regarder {video.title} il faut se connecter.
                  </h2>
                </div>
              </Link>
            )
          )}
        </div>
      ) : (
        <p className="text-center py-4">
          Aucune vidéo trouvée pour la recherche
        </p>
      )}
    </div>
  );
}

export default Search;
