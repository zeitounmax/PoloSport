import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaRedditAlien,
  FaWhatsapp,
} from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import Logo from "../images/logo RGB Original Digital.png";
import { useAuth } from "../contexts/AuthContext";

function VideoComponent() {
  const { token } = useAuth();
  const { id: vidId } = useParams();
  const [video, setVideo] = useState([]);
  const [isURLCopied, setIsURLCopied] = useState(false);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/videos/${vidId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setVideo(data);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération de la vidéo :", error);
      });
  }, [vidId]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/video/${vidId}`;
    navigator.clipboard.writeText(url).then(() => {
      setIsURLCopied(true);
      setTimeout(() => setIsURLCopied(false), 2000);
    });
  };

  return video.is_public || (!video.is_public && token) ? (
    <div className="flex flex-col items-center bg-custom-dark p-4">
      <h2 className="text-2xl font-semibold mb-4 text-white">{video.title}</h2>
      <iframe
        className="w-full max-w-[800px] h-auto aspect-[800/640]"
        title={video.title}
        src={`${video.url}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <p className="text-white mt-2">{video.description}</p>
      <div className="flex justify-center space-x-4 mt-4">
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}/video/${vidId}`)}`} target="_blank" rel="noopener noreferrer" className="text-white">
          <FaTwitter />
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/video/${vidId}`)}`} target="_blank" rel="noopener noreferrer" className="text-white">
          <FaFacebook />
        </a>
        <a href={`https://www.instagram.com/?url=${encodeURIComponent(`${window.location.origin}/video/${vidId}`)}`} target="_blank" rel="noopener noreferrer" className="text-white">
          <FaInstagram />
        </a>
        <a href={`https://reddit.com/submit?url=${encodeURIComponent(`${window.location.origin}/video/${vidId}`)}`} target="_blank" rel="noopener noreferrer" className="text-white">
          <FaRedditAlien />
        </a>
        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${window.location.origin}/video/${vidId}`)}`} target="_blank" rel="noopener noreferrer" className="text-white">
          <FaWhatsapp />
        </a>
        <button onClick={handleCopyLink} className="text-white">
          <MdContentCopy />
        </button>
        {isURLCopied && <span className="text-sm mt-2 text-white">URL copiée dans le presse-papiers.</span>}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Pour regarder {video.title}, il faut se connecter.
      </h2>
      <Link to="/login" className="no-underline">
        <img src={Logo} alt="Connectez-vous" className="w-24" />
      </Link>
    </div>
  );
}

export default VideoComponent;
