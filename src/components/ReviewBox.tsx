import React, { Box, Typography, Avatar, Rating, Paper } from "@mui/material";

type User = {
  name: string | null;
  image: string | null;
}

type ReviewBoxProps = {
  review: {user: User, description: string, rating: number};
}

const ReviewBox = ({ review }: ReviewBoxProps) => {
  const maxLength = 150;

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        maxWidth: 500,
        margin: "15px auto",
        borderRadius: 2,
        minHeight: "100%",
        maxHeight: "100%",
        height: "20vh",
        overflow: "hidden"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={review.user.image || undefined}
          alt="Profile Image"
          sx={{
            width: 60,
            height: 60,
            marginRight: 2,
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            cursor: "pointer",
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.2)" },
          }}
        />
        <Box>
          <Typography variant="h6" component="strong">
            {review.user.name}
          </Typography>
          <Rating
            name="read-only"
            value={review.rating}
            precision={0.5}
            readOnly
            size="small"
          />
        </Box>
      </Box>
      <Typography
        variant="body1"
        sx={{ textAlign: "justify", lineHeight: 1.5, marginTop: 2 }}
      >
        {review.description.length > maxLength
          ? `${review.description.slice(0, maxLength)}...`
          : review.description}
      </Typography>
      {review.description.length > maxLength && (
        <Typography
          variant="caption"
          color="error"
          sx={{ display: "block", marginTop: 1 }}
        >
          The review description exceeds the maximum allowed length.
        </Typography>
      )}
    </Paper>
  );
};

export default ReviewBox;
