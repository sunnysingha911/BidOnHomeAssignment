import React, { useEffect } from "react"
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { Field, Form, Formik } from "formik"
import { TextField } from "formik-material-ui"
import * as Yup from "yup"
import { Transition } from "./Transitions"
import { login } from "../redux/actions/LoginAction"
import { useDispatch, useSelector } from "react-redux"

const validationSchema = Yup.object().shape({
  userName: Yup.string().required().label("User Name"),
  email: Yup.string().email().required().label("Email Id"),
  password: Yup.string().required().label("Password"),
})

const useStyles = makeStyles((theme) => ({
  form: {
    padding: "2rem",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "0rem",
      paddingRight: "0rem",
    },
  },
}))

function LoginOverlay({ open, setOpen }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { loading, user, error } = useSelector((state) => state.login)

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setOpen(false)
      }, 1000)
    }
  }, [user])

  return (
    <Dialog open={open} onClose={setOpen} TransitionComponent={Transition}>
      <DialogContent>
        <Typography align='center' variant='h6'>
          <strong>Login</strong>
        </Typography>
        <Box mt='1rem' />
        <Formik
          initialValues={{
            userName: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true)
            dispatch(login(values.userName, values.email, values.password))
            setSubmitting(false)
          }}>
          {({
            submitForm,
            isSubmitting,
            touched,
            errors,
            setFieldValue,
            values,
          }) => (
            <Form className={classes.form}>
              <Typography variant='body2' gutterBottom color='textSecondary'>
                <strong>Your Name</strong>
              </Typography>
              <Field
                component={TextField}
                disabled={isSubmitting}
                variant='outlined'
                placeholder='Name'
                size='small'
                fullWidth
                name='userName'
              />
              <Box mt='0.7rem' />
              <Typography variant='body2' gutterBottom color='textSecondary'>
                <strong>Your Email Id</strong>
              </Typography>
              <Field
                type='email'
                component={TextField}
                disabled={isSubmitting}
                variant='outlined'
                placeholder='Email Id'
                size='small'
                fullWidth
                name='email'
              />
              <Box mt='0.7rem' />
              <Typography variant='body2' gutterBottom color='textSecondary'>
                <strong>Password</strong>
              </Typography>
              <Field
                type='password'
                component={TextField}
                disabled={isSubmitting}
                variant='outlined'
                placeholder='Password'
                size='small'
                fullWidth
                name='password'
              />
              <center>
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  fullWidth
                  disabled={
                    !values.userName ||
                    !values.email ||
                    !values.password ||
                    loading
                  }
                  style={{
                    marginTop: "1.2rem",
                  }}>
                  {loading ? "Loging In" : "Login"}
                </Button>

                {error && (
                  <Typography
                    style={{ marginTop: "1rem", color: "red" }}
                    gutterBottom
                    variant='subtitle2'>
                    {error}
                  </Typography>
                )}

                {user && (
                  <Typography
                    style={{ marginTop: "1rem", color: "green" }}
                    gutterBottom
                    variant='subtitle2'>
                    Login Success
                  </Typography>
                )}
              </center>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default LoginOverlay
