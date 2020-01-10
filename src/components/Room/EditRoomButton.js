import React from "react"
import useVisible from "../GeneralHooks/useVisible"
import EditRoomForm from "./EditRoomForm"
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
  buttonStyle: {
    minHeight: 30,
    marginTop: 20,
  },
}));


const EditRoomButton = ({ id ,toggleCreate}) => {
  const { open, toggle } = useVisible()
  const classes = useStyles();
  const handlePress = () => {
    if(id){
    toggle()
    toggleCreate()
  }

  }
  return (
    <>
      {open && <EditRoomForm id={id} onClose={toggle} toggleCreate={toggleCreate} />}
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

export default EditRoomButton
