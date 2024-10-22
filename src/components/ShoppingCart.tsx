import React from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  Stack,
  Button,
  Tooltip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useShoppingCart } from "../context/ShoppingCartProvider.tsx";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./CartItem.tsx";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const navigate = useNavigate();

  return (
    <Drawer anchor="right" open={isOpen} onClose={closeCart}>
      <Box sx={{ width: 350, padding: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Your Cart</Typography>
          <Tooltip title="Close" placement="left" >
            <IconButton onClick={closeCart}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Body */}
        <Stack spacing={2} sx={{ marginTop: 2 }}>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) =>
              <CartItem key={index} {...item} />
            )
          ) : (
            <Typography>Your cart is empty.</Typography>
          )}
        </Stack>

        {/* Footer */}
        {cartItems.length > 0 && (
          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate("/user/checkout")}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
