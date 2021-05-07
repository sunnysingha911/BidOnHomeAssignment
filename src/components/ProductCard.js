import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import EditProductOverLay from "./EditProductOverLay"

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "17rem",
    borderRadius: "0.5rem",
    margin: "1rem",
  },
  cardMedia: {
    height: "8rem",
  },
  cardAction: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%",
  },
  cardContent: {
    height: "10rem",
    width: "100%",
  },
}))

const ProductCard = ({ name, description, price, quantity, imageUrl, id }) => {
  const classes = useStyles()
  const { user } = useSelector((state) => state.login)
  const [editModal, setEditModal] = useState(false)
  return (
    <Card elevation={3} className={classes.card}>
      <CardActionArea className={classes.cardAction}>
        <CardMedia
          component='img'
          alt='Product Image'
          className={classes.cardMedia}
          image={imageUrl}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            gutterBottom
            variant='subtitle2'
            color='textSecondary'
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <strong>Quantity {quantity}</strong>
            <strong>Rs {price}/-</strong>
          </Typography>
          <Typography variant='h6' gutterBottom color='textPrimary'>
            <strong>{name}</strong>
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {description.split(" ").splice(0, 10).join(" ")}
            ...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {user && (
          <>
            <Button
              size='small'
              color='primary'
              onClick={() => setEditModal(true)}>
              Edit
            </Button>
            <EditProductOverLay
              open={editModal}
              setOpen={() => setEditModal(false)}
              name={name}
              description={description}
              price={price}
              quantity={quantity}
              imageUrl={imageUrl}
              productId={id}
            />
          </>
        )}
      </CardActions>
    </Card>
  )
}

export default ProductCard
