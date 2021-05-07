import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core"
import React from "react"
import { Field, Form, Formik } from "formik"
import { TextField } from "formik-material-ui"
import * as Yup from "yup"
import { v4 as uuidv4 } from "uuid"
import { addProducts, editProduct } from "../redux/actions/ProductActions"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Product Name"),
  description: Yup.string().label("Description"),
  price: Yup.number().required().label("Price"),
  quantity: Yup.number().integer().required().label("Quantity"),
  image: Yup.string().url().label("Image URL"),
})

const AddProductPage = ({ edit }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  return (
    <Container maxWidth='md'>
      <Paper
        elevation={edit ? 0 : 3}
        style={{ padding: "2rem 0rem", marginBottom: "2rem" }}>
        <Typography gutterBottom variant='h5' align='center'>
          {edit ? "Update Product" : "Add Product"}
        </Typography>
        <Formik
          enableReinitialize={edit ? true : false}
          initialValues={{
            name: edit ? edit.name : "",
            description: edit ? edit.description : "",
            price: edit ? edit.price : "",
            quantity: edit ? edit.quantity : "",
            image: edit ? edit.imageUrl : "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true)
            {
              edit
                ? dispatch(editProduct(edit.productId, { ...values }))
                : dispatch(addProducts({ ...values, productId: uuidv4() }))
            }

            setSubmitting(false)

            setTimeout(() => {
              history.push("/")
            }, 2000)
          }}>
          {({
            submitForm,
            isSubmitting,
            touched,
            errors,
            setFieldValue,
            values,
          }) => (
            <Form style={{ marginTop: "1rem" }}>
              <Container>
                <Grid container spacing={3}>
                  <Grid container direction='column' item xs={12} md={6}>
                    <Typography gutterBottom variant='subtitle1'>
                      Name
                    </Typography>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      placeholder='Product Name'
                      variant='outlined'
                      size='small'
                      fullWidth
                      name='name'
                    />
                    <Box mt='1.36rem' />
                    <Typography gutterBottom variant='subtitle1'>
                      Price
                    </Typography>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      placeholder='Price'
                      variant='outlined'
                      size='small'
                      fullWidth
                      name='price'
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography gutterBottom variant='subtitle1'>
                      Description
                    </Typography>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      placeholder='Description'
                      multiline
                      rows={6}
                      variant='outlined'
                      size='small'
                      fullWidth
                      name='description'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography gutterBottom variant='subtitle1'>
                      Quantity
                    </Typography>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      placeholder='Quantity'
                      variant='outlined'
                      size='small'
                      fullWidth
                      name='quantity'
                    />
                    <Box mt='1.36rem' />
                    <Typography gutterBottom variant='subtitle1'>
                      Image
                    </Typography>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      placeholder='Image URL'
                      variant='outlined'
                      size='small'
                      fullWidth
                      name='image'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    {values.image && (
                      <Card>
                        <CardMedia
                          component='img'
                          alt='Product Image'
                          height='170'
                          style={{ widtth: "10rem" }}
                          image={values.image}
                        />
                      </Card>
                    )}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      type='submit'
                      color='primary'
                      variant='contained'
                      disabled={
                        !values.name || !values.quantity || !values.price
                      }>
                      {edit ? "Update Product" : "Add Product"}
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  )
}

export default AddProductPage
