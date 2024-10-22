import * as React from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import CheckoutItem from "./checkoutItem/CheckoutItem.tsx";

import { useShoppingCart } from "../../../context/ShoppingCartProvider.tsx";


function Info({ title, totalPrice, direction }) {
  const { cartItems } = useShoppingCart();

  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        {title}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      {cartItems && cartItems.length > 0 ? (
        <List disablePadding>
          {cartItems?.map((item, index) => (
            <CheckoutItem key={index} cartItem={item} direction={direction} />
          ))}
        </List>
      ) : (
        <>No Products in cart</>
      )}
    </React.Fragment>
  );
}

Info.propTypes = {
  title: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
};

export default Info;
