import React from "react"
import { useSelector } from "react-redux"
import { Switch, Route, Redirect } from "react-router-dom"
import ScrollIntoView from "../components/ScrollIntoView"
import AddProductPage from "../pages/AddProductPage"

import ProductsPage from "../pages/ProductsPage"

const Routes = () => {
  const { user } = useSelector((state) => state.login)

  return (
    <Switch>
      <ScrollIntoView>
        <Route path='/' exact component={ProductsPage} />
        {user && <Route path='/addProducts' exact component={AddProductPage} />}
        <Redirect to='/' />
      </ScrollIntoView>
    </Switch>
  )
}

export default Routes
