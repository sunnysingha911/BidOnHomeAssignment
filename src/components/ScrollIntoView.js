import { PureComponent } from "react"
import { withRouter } from "react-router-dom"

/**THIS COMPONENT SCROLL THE PAGE TO TOP ON EACH ROUTE CHANGE */

class ScrollIntoView extends PureComponent {
  componentDidMount = () => window.scrollTo(0, 0)

  componentDidUpdate = (prevProps) => {
    if (this.props.location !== prevProps.location) window.scrollTo(0, 0)
  }

  render = () => this.props.children
}

export default withRouter(ScrollIntoView)
