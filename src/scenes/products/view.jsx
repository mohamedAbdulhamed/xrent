import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CardMedia,
  Typography,
  Rating,
  useTheme,
  IconButton,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import { tokens } from "../../theme";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReviewBox from "../../components/ReviewBox";

const ProductDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const objectFromAxios = {
      name: "Shoe",
      description: "Shoe description",
      images: ["red_shoes1.png", "red_shoes2.png", "red_shoes3.png"],
      price: 132,
      rating: 4.5,
      category: ["Dresses"],
      colors: ["Red", "Black"],
      isForRent: true,
      rentPrice: 153.5,
      depositAmount: 200,
      isForSale: true,
      salePrice: 530,
      status: "In stock",
    };
    setProduct(objectFromAxios);
    setMainImage(`../assets/${objectFromAxios.images[0]}`);
  }, []);

  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const reviews = [
    {
      user: {
        name: "Ranidi Lochana",
        image: "../assets/profile/girl_dp1.jpg",
      },
      review: {
        rating: 4.5,
        description: "Great product! Really loved the quality and design.",
      },
    },
    {
      user: {
        name: "John Doe",
        image: "../assets/profile/man_dp2.jpg",
      },
      review: {
        rating: 4.0,
        description:
          "Good value for money. Will definitely recommend to others.",
      },
    },
    {
      user: {
        name: "Jane Smith",
        image: "../assets/profile/girl_dp3.jpg",
      },
      review: {
        rating: 3.5,
        description:
          "Decent product but could be improved in terms of comfort.",
      },
    },
    {
      user: {
        name: "Jane Smith",
        image: "../assets/profile/man_dp3.jpg",
      },
      review: {
        rating: 3.5,
        description:
          "Decent product but could be improved in terms of comfort. and that is a very loooooong description that should need more than the available space but there should be description length validation that will prevent that.",
      },
    },
    {
      user: {
        name: "Jane Smith",
        image: "../assets/profile/man_dp1.jpg",
      },
      review: {
        rating: 3.5,
        description:
          "Decent product but could be improved in terms of comfort.",
      },
    },
    {
      user: {
        name: "Jane Smith",
        image: "../assets/profile/girl_dp3.jpg",
      },
      review: {
        rating: 3.5,
        description:
          "Decent product but could be improved in terms of comfort.",
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          padding: 3,
          maxHeight: "100vh",
          maxWidth: "100vw",
        }}
      >
        {/* Product images */}
        <Box sx={{ display: "flex", flex: "1 1 50%", maxWidth: "50%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              flex: "1 1 auto",
              alignItems: "center",
            }}
          >
            {product.images?.map((image, index) => (
              <CardMedia
                component="img"
                key={index}
                src={`../assets/${image}`}
                onClick={() => handleImageClick(`../assets/${image}`)}
                sx={{
                  height: "15vh",
                  cursor: "pointer",
                  background: colors.main,
                  borderRadius: 1,
                  padding: "0.5rem",
                  boxShadow: "0 0 6px rgba(0,0,0,0.6)",
                  opacity: 0.8,
                  transition: "opacity 0.3s, transform 0.3s",
                  "&:hover": {
                    opacity: 1,
                    transform: "scale(1.05)",
                  },
                }}
              />
            ))}
          </Box>

          {/* Main Image */}
          <Box
            sx={{
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: "1 1 auto",
              maxWidth: "70%",
            }}
          >
            <CardMedia
              component="img"
              src={mainImage}
              id="imagebox"
              sx={{
                border: "0.2rem solid " + colors.white,
                borderRadius: "0.5rem",
                height: "60vh",
                maxHeight: "100%",
                maxWidth: "100%",
                padding: "1rem",
                boxShadow: "0 0 8px " + colors.main,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Box>
        </Box>

        {/* Product details */}
        <Box
          sx={{
            background: colors.white,
            padding: "1.5rem",
            border: "0.2rem solid " + colors.white,
            borderRadius: "0.5rem",
            boxShadow: "0 0 8px " + colors.black,
            flex: "1 1 50%",
            maxWidth: "50%",
            height: "60vh",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h3" color={colors.primary[900]}>
              {product.name}
            </Typography>
            <IconButton onClick={handleFavoriteClick}>
              <FavoriteIcon
                sx={{ color: isFavorite ? "red" : colors.grey[500] }}
              />
            </IconButton>
          </Box>

          <Typography variant="h3" color={colors.grey[800]}>
            {"EGP " + product.price}
          </Typography>
          <Rating name="read-only" value={product.rating ?? 0.0} readOnly />

          {/* Product Specific Details */}
          <Divider sx={{ my: 2, borderColor: "#0000001f !important" }} />
          <Typography variant="h3" color={colors.grey[900]}>
            Product Details:
          </Typography>

          {/* Rent Information */}
          {product.isForRent && (
            <Box sx={{ my: 1 }}>
              <Typography variant="h5" color={colors.grey[700]}>
                Rent Price:
              </Typography>
              <Typography color={colors.grey[700]}>
                EGP {product.rentPrice} per day
              </Typography>
              <Typography color={colors.grey[700]}>
                Deposit: EGP {product.depositAmount}
              </Typography>
            </Box>
          )}

          {/* Sale Information */}
          {product.isForSale && (
            <Box sx={{ my: 1 }}>
              <Typography variant="h5" color={colors.grey[700]}>
                Sale Price:
              </Typography>
              <Typography color={colors.grey[700]}>
                EGP {product.salePrice}
              </Typography>
            </Box>
          )}

          {/* Colors */}
          <Box sx={{ my: 1 }}>
            <Typography variant="h5" color={colors.grey[700]}>
              Colors:
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {product.colors?.map((color, index) => (
                <Chip
                  key={index}
                  label={color}
                  sx={{
                    background: color.toLowerCase(),
                    color: color.toLowerCase() === "white" ? "#000" : "#fff",
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Product Status */}
          <Box sx={{ my: 1 }}>
            <Typography color={colors.grey[700]}>{product.status}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Divider with the header */}
      <Divider
        sx={{
          margin: "2rem 0",
          position: "relative",
          "::before, ::after": {
            borderTop: `thin solid ${colors.black} !important`,
          },
        }}
      >
        <Typography
          variant="h1"
          align="center"
          sx={{
            fontSize: "3.75rem",
            marginBottom: "30px",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.black,
          }}
        >
          Customer's
          <Typography
            component="span"
            sx={{
              fontSize: "3.75rem",
              background: "linear-gradient(to left, #c72092, #6c14d0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginLeft: "15px",
            }}
          >
            reviews
          </Typography>
        </Typography>
      </Divider>

      {/* Review section */}
      <Box sx={{ padding: "2rem" }}>
        <Grid container spacing={3}>
          {reviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ReviewBox user={review.user} review={review.review} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProductDetail;
