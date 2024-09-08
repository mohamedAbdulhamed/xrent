import * as React from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

// Cart Products
const products = [
  {
    name: "منتج باللغه العربية",
    desc: "منتج باللغه العربية",
    price: "EGP15.00",
  },
  {
    name: "Dedicated support",
    desc: "Included in the Professional plan, and this is a very loooooooong desctription.",
    price: "Free",
  },
  {
    name: "Hardware",
    desc: "Devices needed for development",
    price: "EGP 69.99",
  },
  {
    name: "Landing page template",
    desc: "License",
    price: "EGP 49.99",
  },
];

const isArabic = (text) => {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
};

const DIRECTIONS = {
  rtl: "rtl",
  ltr: "ltr"
}

const flexDirection = (text, direction) => {
  const isRtl = direction === DIRECTIONS.rtl;
  const isTextArabic = isArabic(text);
  
  return (isRtl && !isTextArabic) || (!isRtl && isTextArabic) ? 'row-reverse' : 'row';
};


function Info({ title, totalPrice, direction }) {

  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        {title}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          // replace name with id in the key prop
          <ListItem
            key={product.name}
            sx={{
              py: 1,
              px: 0,
              display: "flex",
              flexDirection: flexDirection(product.name, direction),
              textAlign: isArabic(product.name) ? "right" : "left",
            }}
          >
            <ListItemText
              sx={{ margin: "6px 10px" }}
              primary={product.name}
              secondary={
                product.desc.length > 50
                  ? `${product.desc.slice(0, 50)}...`
                  : product.desc
              }
            />
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  title: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
};

export default Info;
