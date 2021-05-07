import { createMuiTheme } from "@material-ui/core/styles"

export const theme = createMuiTheme({
  palette: {
    primary: { main: "#ffc107", light: "#ffcd38", dark: "#b28704" },
    text: {
      primary: "#484848",
      secondary: "#777777",
    },
  },
  typography: {
    fontFamily: `"Roboto", sans-serif`,
  },
})
