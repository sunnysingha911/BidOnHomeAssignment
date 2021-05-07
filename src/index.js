import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"
import { store, persistor } from "./redux/store"
import { BrowserRouter } from "react-router-dom"
import App from "./app"
import { MuiThemeProvider } from "@material-ui/core"
import { theme } from "./theme/ThemeConfig"
import { PersistGate } from "redux-persist/integration/react"

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
