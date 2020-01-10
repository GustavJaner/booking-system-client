import React from "react"
import TextField from "material-ui/TextField"
import Toggle from "material-ui/Toggle"
import Select from "@material-ui/core/Select"
import {
  TimePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"

export const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    onChange={(event, value) => input.onChange(value)}
    errorText={meta.touched ? meta.error : ""}
  />
)

export const ToggleAdapter = ({
  input: { onChange, value },
  label,
  ...rest
}) => (
  <Toggle
    label={label}
    toggled={!!value}
    onToggle={(event, isInputChecked) => onChange(isInputChecked)}
    {...rest}
  />
)

export const ReactSelectAdapter = ({ input, ...rest }) => (
  <Select {...input} {...rest} searchable />
)

export function TimePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <TimePicker
        {...rest}
        style={{ minWidth: 255  }}
        name={name}
        helperText={showError ? meta.error || meta.submitError : undefined}
        error={showError}
        inputProps={restInput}
        ampm={false}
        disableToolbar={true}
        format="HH:mm"
        views={["hours", "minutes"]}
        minutesStep={30}
        onChange={onChange}
        value={value === "" ? null : value}
      />
    </MuiPickersUtilsProvider>
  )
}
export function DurationPickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardTimePicker
        {...rest}
        style={{ minWidth: 255  }}
        name={name}
        helperText={showError ? meta.error || meta.submitError : undefined}
        error={showError}
        inputProps={restInput}
        disableToolbar={true}
        ampm={false}
        format="HH:mm"
        views={["hours", "minutes"]}
        onChange={onChange}
        value={value === "" ? null : value}
      />
    </MuiPickersUtilsProvider>
  )
}

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

export function SelectAdapter({ label, isMulti, options, input, ...rest }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id={`${label}-label`}>{label}</InputLabel>
        <Select
          {...rest}
          {...input}
          style={{minWidth: 250}}
          labelId={`${label}-label`}
          id={label}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={isMulti && input.value === "" ? [] : input.value}
          onChange={input.onChange}
          multiple={isMulti}
        >
          {options.map(option => (
            <MenuItem key={option.name} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
