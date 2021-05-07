import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@material-ui/core"
import React from "react"
import AddProductPage from "../pages/AddProductPage"
import { Transition } from "./Transitions"

const EditProductOverLay = ({
  name,
  price,
  quantity,
  imageUrl,
  description,
  productId,
  open,
  setOpen,
}) => {
  return (
    <Dialog
      scroll='body'
      open={open}
      onClose={setOpen}
      TransitionComponent={Transition}>
      <DialogContent style={{ margin: "1.5rem 0rem", overflow: "hidden" }}>
        <AddProductPage
          edit={{
            name,
            price,
            quantity,
            imageUrl,
            description,
            productId,
            setOpen,
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditProductOverLay
