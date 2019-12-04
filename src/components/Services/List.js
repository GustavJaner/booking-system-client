import React from "react"
import DeleteServiceButton from "../Service/DeleteServiceButton"
import EditServiceButton from "../Service/EditServiceButton"

/*import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';*/

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ServiceList = ({ services = [] }) => {
  
  const classes = useStyles();

  const [serviceID, setService] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  
  return (
    <div>
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        Services
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={serviceID}
        onChange={(e) => setService(e.target.value) }
        labelWidth={labelWidth}
      >
      {services.map(service => (
        <MenuItem value={service.id}>
          {service.name}
        </MenuItem>
        ))}
        
      </Select>
    </FormControl>
    <EditServiceButton id={serviceID} />
    <DeleteServiceButton id={serviceID} />

    </div>
  )
  
}
export default ServiceList
