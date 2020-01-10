import React from "react"
import useVisible from "../GeneralHooks/useVisible"
import EditUserForm from "./EditUserForm"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
  buttonStyle: {
    minHeight: 30,
    marginTop: 20,
  },
}));

const EditUserButton = ({ id }) => {
  const { open, toggle} = useVisible()
  const classes = useStyles();
  const handlePress = () => {
    if(id){
    toggle()
  }
}
  return (
    <>
      {open && <EditUserForm id={id} onClose={toggle} />}
      <Button
        className={classes.buttonStyle} 
        onClick={() => handlePress()} 
        variant="contained" 
        color="primary" 
        size="small">
        {" "}
        Edit
      </Button>
    </>
  )
}

export default EditUserButton
