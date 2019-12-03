import React from "react"
import DeleteAccessGroupButton from "../AccessGroup/DeleteAccessGroupButton"
import EditAccessGroupButton from "../AccessGroup/EditAccessGroupButton"

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { access } from "fs";


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ServiceList = ({ accessGroups = [] }) => {
  
  console.log()
  const classes = useStyles();

  const [accessgroupID, setAccessGroup] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  
  return (
    <div>
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        Access Groups
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={accessgroupID}
        onChange={(e) => setAccessGroup(e.target.value) }
        labelWidth={labelWidth}
      >
      {accessGroups.map(accessgroup => (
        <MenuItem value={accessgroup.id}>
          {accessgroup.name}
        </MenuItem>
        ))}
        
      </Select>
    </FormControl>
    <EditAccessGroupButton id={accessgroupID} />
    <DeleteAccessGroupButton id={accessgroupID} />

    </div>
  )
  
}
export default ServiceList

/*

    <List>
      {accessGroups.map(service => (
        <ListItem key={service.id}>
          {service.name}
          <EditServiceButton id={service.id} />
          <DeleteServiceButton id={service.id} />
        </ListItem>
      ))}
    </List>

 <Grid item xs={4}>
              <label>
                Service
                <Field
                  name="serviceId"
                  component={ReactSelectAdapter}
                  options={services.services.map(service => ({
                    label: service.name,
                    value: service.id
                  }))}
                  validate={required}
                />
              </label>
            </Grid>

*/