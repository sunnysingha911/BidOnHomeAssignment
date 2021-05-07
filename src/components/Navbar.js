import React, { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  CssBaseline,
  Button,
} from "@material-ui/core"
import PropTypes from "prop-types"
import LoginOverlay from "./LoginOverlay"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../redux/actions/LoginAction"

function ElevationScroll(props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
}

const Navbar = () => {
  const [loginModal, setLoginModal] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.login)
  const history = useHistory()

  return (
    <div>
      <CssBaseline />
      <ElevationScroll>
        <AppBar position='fixed' color='primary'>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant='h6'>Product Inventory Management</Typography>

            {user ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography>{user.userName}</Typography>
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: "#ff5722",
                    color: "#fff",
                    marginLeft: "1rem",
                  }}
                  onClick={() => {
                    dispatch(logOut())
                    history.push("/")
                  }}>
                  Log out
                </Button>
              </div>
            ) : (
              <Button onClick={() => setLoginModal(true)}>Login</Button>
            )}
            <LoginOverlay
              open={loginModal}
              setOpen={() => setLoginModal(false)}
            />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Toolbar />
    </div>
  )
}

export default Navbar
