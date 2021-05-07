import MuiAccordion from "@material-ui/core/Accordion"
import MuiAccordionSummary from "@material-ui/core/AccordionSummary"
import MuiAccordionDetails from "@material-ui/core/AccordionDetails"
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
  withStyles,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import FilterListIcon from "@material-ui/icons/FilterList"
import { useDispatch } from "react-redux"
import { filterProducts } from "../redux/actions/ProductActions"

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails)

const Filter = () => {
  const [priceArray, setPriceArray] = useState([])
  const [quantityArray, setQuantityArray] = useState([])
  const [filterCount, setFilterCount] = useState(0)
  const dispatch = useDispatch()

  const priceFilters = [500, 1000, 1500, 2000]
  const quantityFilter = [5, 10, 15, 20, 30]

  useEffect(() => {
    dispatch(filterProducts(priceArray, quantityArray))
    setFilterCount(priceArray.length + quantityArray.length)
    return () => dispatch(filterProducts(priceArray, quantityArray))
  }, [priceArray, quantityArray])

  const clearFilters = () => {
    setPriceArray([])
    setQuantityArray([])
  }

  return (
    <Card elevation={3}>
      <Accordion
        square
        style={{
          width: "100%",
        }}>
        <AccordionSummary>
          <Box display='flex' justifyContent='space-between' width='100%'>
            <Typography color='primary' variant='h6'>
              Filters
            </Typography>
            <Box display='flex' alignItems='center'>
              {filterCount > 0 ? (
                <Button onClick={clearFilters}>
                  Clear Filters ({filterCount})
                </Button>
              ) : (
                <Typography
                  variant='button'
                  color='textPrimary'
                  style={{ marginRight: "1rem" }}>
                  No Filters
                </Typography>
              )}
              <FilterListIcon />
            </Box>
          </Box>
        </AccordionSummary>
      </Accordion>

      <Accordion square defaultExpanded={true} style={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl
            component='fieldset'
            onChange={(e) =>
              e.target.checked
                ? setPriceArray((prevState) => [
                    ...prevState,
                    parseInt(e.target.value),
                  ])
                : setPriceArray((prevState) =>
                    prevState.filter((val) => val !== parseInt(e.target.value))
                  )
            }>
            {priceFilters.map((price, i) => (
              <FormControlLabel
                key={i}
                value={price}
                control={
                  <Checkbox
                    checked={priceArray.find((p) => p === price) ? true : false}
                    name='price'
                  />
                }
                label={`Rs ${price} and below`}
              />
            ))}
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion square defaultExpanded={true} style={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Quantity</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl
            component='fieldset'
            onChange={(e) =>
              e.target.checked
                ? setQuantityArray((prevState) => [
                    ...prevState,
                    parseInt(e.target.value),
                  ])
                : setQuantityArray((prevState) =>
                    prevState.filter((val) => val !== parseInt(e.target.value))
                  )
            }>
            {quantityFilter.map((quantity, i) => (
              <FormControlLabel
                key={i}
                value={quantity}
                control={
                  <Checkbox
                    checked={
                      quantityArray.find((q) => q === quantity) ? true : false
                    }
                    name={`${quantity} left`}
                  />
                }
                label={`${quantity} left`}
              />
            ))}
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}

export default Filter
