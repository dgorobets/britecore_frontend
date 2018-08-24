import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { DateTimePicker } from "material-ui-pickers";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";

import * as api from "../api";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit * 3
  },
  title: {
    textDecoration: "none"
  },
  form: {
    width: "25%",
    display: "flex",
    flexDirection: "column"
  },
  submit: {
    textAlign: "right",
    marginTop: theme.spacing.unit * 3
  }
});

class RiskType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      riskType: null
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    const riskType = await api.fetchRiskTypeDetail({ id });
    this.setState({ riskType });
  }

  handleChange = (newValue, value, valueKey) => {
    const { riskType } = this.state;

    const valueObj = riskType.values.find(v => v.id === value.id);
    valueObj[valueKey] = newValue;

    riskType.values = riskType.values.map(
      v => (v.id !== value.id ? v : valueObj)
    );

    this.setState({ riskType });
  };

  renderField = value => {
    const id = `id_${value.attribute.name}`;
    const label = value.attribute.name;

    switch (value.attribute.datatype) {
      case "int":
        return (
          <FormControl key={value.id}>
            <TextField
              id={id}
              label={label}
              value={value.value_int}
              onChange={v =>
                this.handleChange(v.target.value, value, "value_int")
              }
              type="number"
              margin="normal"
            />
          </FormControl>
        );
      case "float":
        return (
          <FormControl key={value.id}>
            <TextField
              id={id}
              label={label}
              value={value.value_float}
              onChange={v =>
                this.handleChange(v.target.value, value, "value_float")
              }
              type="number"
              margin="normal"
            />
          </FormControl>
        );
      case "date":
        return (
          <FormControl key={value.id}>
            <DateTimePicker
              label={label}
              value={value.value_date}
              onChange={v => this.handleChange(v, value, "value_date")}
            />
          </FormControl>
        );
      case "enum":
        return (
          <FormControl key={value.id}>
            <InputLabel>{label}</InputLabel>
            <Select
              value={value.value_enum}
              onChange={v =>
                this.handleChange(v.target.value, value, "value_enum")
              }
            >
              {value.attribute.enum_group.values.map(e => (
                <MenuItem
                  key={`enum-group-${value.attribute.enum_group.id}-${e.id}`}
                  value={e.id}
                >
                  {e.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      default:
        return (
          <FormControl key={value.id}>
            <TextField
              id={id}
              label={label}
              value={value.value_text}
              onChange={v =>
                this.handleChange(v.target.value, value, "value_text")
              }
              margin="normal"
            />
          </FormControl>
        );
    }
  };

  render() {
    const { classes } = this.props;
    const { riskType } = this.state;

    return (
      <div className={classes.root}>
        <Fragment>
          <Typography
            className={classes.title}
            component={Link}
            to="/"
            variant="title"
            gutterBottom
          >
            Risk types
          </Typography>
          {riskType && (
            <Fragment>
              <Typography variant="subheading" gutterBottom>
                {this.state.riskType.name}
              </Typography>
              <form className={classes.form} noValidate autoComplete="off">
                {riskType.values.map(this.renderField)}
              </form>
            </Fragment>
          )}
        </Fragment>
      </div>
    );
  }
}

RiskType.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RiskType);
