import { Slide } from "@material-ui/core"
import React from "react"

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})
