import React from "react"
import TextField from "material-ui/TextField"
import Toggle from "material-ui/Toggle"
import Select from "react-select"
import { TimePicker, MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

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
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <TimePicker
        {...rest}
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
        value={value === '' ? null : value}
      />
    </MuiPickersUtilsProvider>

  );
}
export function DurationPickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardTimePicker
        {...rest}
        name={name}
        helperText={showError ? meta.error || meta.submitError : undefined}
        error={showError}
        inputProps={restInput}
        ampm={false}
        variant="inline"
        placeholder="01:00"
        label="Duration"
        openTo={["hours, minutes"]}
        format="HH:mm"
        views={["hours", "minutes"]}
        onChange={onChange}
        value={value === '' ? null : value}
      />
    </MuiPickersUtilsProvider>

  );
}

/*
<TimePicker
ampm={false}
openTo="hours"
views={["hours", "minutes", "seconds"]}
format="HH:mm:ss"
label="With seconds"
value={selectedDate}
onChange={handleDateChange}
/>
*/