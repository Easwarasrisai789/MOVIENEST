import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Hnavbar from "./Hnavbar";
import Slider from "react-slick"; // Import Carousel Library

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Dummy movie data
const movies = [
  { id: 1, title: "Movie 1", image: "/images/movie1.jpg" },
  { id: 2, title: "Movie 2", image: "/images/movie2.jpg" },
  { id: 3, title: "Movie 3", image: "/images/movie3.jpg" },
  { id: 4, title: "Movie 4", image: "/images/movie4.jpg" },
  { id: 5, title: "Movie 5", image: "/images/movie5.jpg" },
];

const banners = [
  { id: 1, image: "/mnt/data/image.png" },
  { id: 2, image: "/images/banner2.jpg" },
  { id: 3, image: "/images/banner3.jpg" },
];

const Home = () => {
  const navigate = useNavigate();
  const exploreRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleExplore = () => {
    if (exploreRef.current) {
      exploreRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`); // Navigate to movie details page
  };

  return (
    <>
      <GlobalStyle />
      <Hnavbar />

      {/* Banner Slider */}
      <BannerSlider {...settings}>
        {banners.map((banner) => (
          <BannerImage key={banner.id} src={banner.image} alt="Banner" />
        ))}
      </BannerSlider>

      {/* Explore Button */}
      <ExploreButton onClick={handleExplore}>Explore Movies</ExploreButton>

      {/* Recommended Movies Section */}
      <MoviesSection ref={exploreRef}>
        <h2>Recommended Movies</h2>
        <MoviesRow>
          {movies.map((movie) => (
            <MovieCard key={movie.id} onClick={() => handleMovieClick(movie.id)}>
              <img src={movie.image} alt={movie.title} />
              <p>{movie.title}</p>
            </MovieCard>
          ))}
        </MoviesRow>
      </MoviesSection>
    </>
  );
};

export default Home;

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background: #f0f0f0;
  }
`;

// Styled Components
const BannerSlider = styled(Slider)`
  width: 100%;
  height: 300px;
  .slick-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 300px;
`;

const MoviesSection = styled.div`
  padding: 20px;
  h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
`;

const MoviesRow = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 15px;
  padding-bottom: 10px;
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;
`;

const MovieCard = styled.div`
  flex: 0 0 auto;
  width: 150px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 100%;
    border-radius: 10px;
  }

  p {
    margin-top: 5px;
    font-weight: bold;
  }
`;

const ExploreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: #ff4444;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #cc3333;
  }
`;
