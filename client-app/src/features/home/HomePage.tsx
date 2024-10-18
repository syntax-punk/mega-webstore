import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function SamplePrevArrow() {
  return (
    <div/>
  );
}

function HomePage() {

  const navStyles = {
    color: 'inherit',
    textDecoration: 'underline',
    typography: 'h5',
    '&:hover': {
      color: 'grey.500'
    },
    '&.active': {
      color: 'text.secondary'
    }
  }

  const sliderSettings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    cssEase: "linear",
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const images = [
    "/images/hero1.png",
    "/images/hero2.png",
    "/images/hero3.png",
    "/images/hero4.png",
    "/images/hero5.png",
    "/images/hero6.png",
    "/images/hero7.png",
    "/images/hero8.png",
    "/images/hero9.png",
    "/images/hero10.png",
    "/images/hero11.png",
    "/images/hero12.png",
    "/images/hero13.png",
  ];

  return (
    <>
      <Slider {...sliderSettings}>
        {images.sort(() => Math.random() - 0.5).map((image, index) => (
          <div key={index}>
            <img 
              src={image} 
              alt="Hero image" 
              style={{ display: "block", margin: "auto", maxHeight: 500 }} />
          </div>
        ))}
      </Slider>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap="1rem" sx={{ p:4 }}>
        <Typography variant="h2">
          megastore
        </Typography>
        <Typography component={Link} to="/catalog" sx={navStyles} > 
          go to the catalog
        </Typography>
      </Box>
    </>
  );
}

export { HomePage }