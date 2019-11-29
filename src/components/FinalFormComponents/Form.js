import React from "react"
import TextField from "material-ui/TextField"
import Toggle from "material-ui/Toggle"
import Select from "react-select"

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
