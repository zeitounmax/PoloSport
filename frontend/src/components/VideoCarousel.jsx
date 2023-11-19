import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../images/logo RGB Original Digital.png";

function VideoCarousel({ videos, name, slideNumber }) {
  const { token } = useAuth();
  const [slideNum, setSlideNum] = useState(slideNumber);

  // Fonction pour mettre à jour le nombre de diapositives en fonction de la largeur de l'écran
  const updateSlidesNumber = () => {
    if (window.innerWidth <= 768) {
      setSlideNum(1); // 1 diapositive pour les petits écrans
    } else if (window.innerWidth <= 1024) {
      setSlideNum(2); // 2 diapositives pour les écrans moyens
    } else {
      setSlideNum(slideNumber); // Nombre original de diapositives pour les grands écrans
    }
  };

  useEffect(() => {
    updateSlidesNumber();
    window.addEventListener("resize", updateSlidesNumber);
    return () => {
      window.removeEventListener("resize", updateSlidesNumber);
    };
  }, [slideNumber]);

  return (
    <div className="video-carousel mx-auto sm:mx-4 md:mx-6">
      <h1 className="nameCarousel text-xl font-bold mb-4">{name}</h1>
      <Carousel
        showStatus={false}
        showIndicators={false}
        infiniteLoop
        showThumbs={false}
        autoPlay={false}
        interval={3000}
        transitionTime={500}
        swipeable
        selectedItem={0}
        emulateTouch
        useKeyboardArrows
        stopOnHover
        centerMode
        centerSlidePercentage={100 / slideNum}
        axis="horizontal"
      >
        {videos.map((video) =>
          video.is_public || token ? (
            <Link key={video.id} to={`/videos/${video.id}`} className="block">
              <img
                className="imgCarousel w-full object-cover"
                src={video.thumbnail_url}
                alt={video.title}
              />
              <p className="legend text-sm">{video.title}</p>
            </Link>
          ) : (
            <Link
              key={video.id}
              to="/login"
              className="block text-decoration-none"
            >
              <img
                className="logo-f w-full object-cover"
                src={Logo}
                alt="Connectez-vous pour voir"
              />
              <p className="legend text-sm">
                Pour regarder {video.title}, il faut se connecter.
              </p>
            </Link>
          )
        )}
      </Carousel>
    </div>
  );
}

VideoCarousel.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      thumbnail_url: PropTypes.string.isRequired,
      is_public: PropTypes.bool.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  slideNumber: PropTypes.number.isRequired,
};

export default VideoCarousel;
