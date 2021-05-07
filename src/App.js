import React from "react"
import Navbar from "./components/Navbar"
import Routes from "./routes/routes"

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}
