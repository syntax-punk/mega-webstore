import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./HomePage.css";

function SamplePrevArrow() {
  return (
    <div/>
  );
}

function HomePage() {

  const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h4',
    '&:hover': {
      color: 'grey.500'
    },
    '&.active': {
      color: 'text.secondary'
    }
  }

  const topSliderSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear",
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const bottomSliderSettings = {
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 4,
    autoplay: true,
    rtl: true,
    speed: 10000,
    autoplaySpeed: 500,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const topRowImages = [
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

  const bottomRowImages = [
    "/images/products/boot-ang1.png",
    "/images/products/boot-ang2.png",
    "/images/products/boot-core1.png",
    "/images/products/boot-core2.png",
    "/images/products/boot-redis1.png",
    "/images/products/glove-code1.png",
    "/images/products/glove-code2.png",
    "/images/products/glove-react1.png",
    "/images/products/glove-react2.png",
    "/images/products/helm-core1.png",
    "/images/products/helm-react1.png",
    "/images/products/helm-react2.png",
    "/images/products/helm-react3.png",
    "/images/products/helm-react4.png",
    "/images/products/sb-ang1.png",
    "/images/products/sb-ang2.png",
    "/images/products/sb-core1.png",
    "/images/products/sb-core2.png",
    "/images/products/sb-react1.png",
    "/images/products/sb-ts1.png",
  ];

  return (
    <>
      <Slider {...topSliderSettings}>
        {topRowImages.sort(() => Math.random() - 0.5).map((image, index) => (
          <div key={index}>
            <img 
              src={image} 
              alt="Hero image" 
              style={{ display: "block", margin: "auto", maxHeight: 400 }} />
          </div>
        ))}
      </Slider>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap="1rem" sx={{ p:4 }}>
        <Typography variant="h2">
          megastore
        </Typography>
        <Typography component={Link} to="/catalog" sx={navStyles} > 
          catalog
        </Typography>
      </Box>
      <Slider {...bottomSliderSettings}>
        {bottomRowImages.sort(() => Math.random() - 0.5).map((image, index) => (
          <div key={index}>
            <img 
              src={image} 
              alt="Hero image" 
              style={{ display: "block", margin: "auto", maxHeight: 280 }}  
            />
          </div>
        ))}
      </Slider>
    </>
  );
}

export { HomePage }