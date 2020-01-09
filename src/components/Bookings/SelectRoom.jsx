import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

function SelectRoom({ rooms, setRoom }) {
  const classes = useStyles()

  const handleChange = event => {
    setRoom(event.target.value)
  }

  return <div></div>
}
export default SelectRoom
