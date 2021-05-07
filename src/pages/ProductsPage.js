import {
  Box,
  Card,
  CardActionArea,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import { Autocomplete } from "@material-ui/lab"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Filter from "../components/Filters"
import { connect } from "react-redux"
import ProductCard from "../components/ProductCard"
import { filterProducts } from "../redux/actions/ProductActions"

const style = (theme) => ({
  addCard: {
    width: "10rem",
    height: "15rem",
    borderRadius: "0.5rem",
    margin: "1rem",
  },
  cardAction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  gridItem: {
    height: "25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
})

class ProductsPage extends Component {
  render() {
    const { classes } = this.props
    const { loading, product, error, filteredProducts } = this.props.product
    const { user } = this.props.login

    return (
      <Container>
        <Typography variant='h5' gutterBottom>
          My Products
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Filter />
          </Grid>
          <Grid container item xs={12} md={9}>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                size='small'
                options={product}
                onChange={(e, newValue) =>
                  this.props.filterProducts([], [], newValue.name)
                }
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Search...'
                    fullWidth
                  />
                )}
              />
              {!user && (
                <Typography variant='h6'>Login to add Products</Typography>
              )}
            </Grid>
            {user && (
              <Grid item xs={12} sm={4} md={3} className={classes.gridItem}>
                <Card
                  elevation={3}
                  className={classes.addCard}
                  component={Link}
                  to='/addProducts'>
                  <CardActionArea className={classes.cardAction}>
                    <AddCircleIcon
                      style={{
                        height: "3rem",
                        width: "3rem",
                        color: "#dadce0",
                      }}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            )}

            {loading ? (
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='10rem'
                width='100%'>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {filteredProducts && filteredProducts.length === 0 ? (
                  <>
                    {product &&
                      product.map((prod, i) => (
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          key={i}
                          className={classes.gridItem}>
                          <ProductCard
                            name={prod.name}
                            description={prod.description}
                            price={prod.price}
                            quantity={prod.quantity}
                            imageUrl={prod.image}
                            id={prod.productId}
                          />
                        </Grid>
                      ))}
                  </>
                ) : (
                  <>
                    {filteredProducts &&
                      filteredProducts.map((prod, i) => (
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          key={i}
                          className={classes.gridItem}>
                          <ProductCard
                            name={prod.name}
                            description={prod.description}
                            price={prod.price}
                            quantity={prod.quantity}
                            imageUrl={prod.image}
                            id={prod.productId}
                          />
                        </Grid>
                      ))}
                  </>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    login: state.login,
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    filterProducts: (price, quantity, name) => {
      dispatch(filterProducts(price, quantity, name))
    },
  }
}

export default withStyles(style)(
  connect(mapStateToProps, mapDispatchtoProps)(ProductsPage)
)
