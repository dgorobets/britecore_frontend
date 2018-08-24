import React, { Fragment } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import * as api from "../api";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 5,
    textAlign: "center"
  },
  title: {
    marginLeft: theme.spacing.unit * 3,
    textDecoration: "none",
    textAlign: "left"
  }
});

class Home extends React.Component {
  async componentDidMount() {
    const riskTypes = await api.fetchRiskTypeList();

    this.setState({
      isLoading: false,
      riskTypes
    });
  }

  state = {
    isLoading: true,
    riskTypes: []
  };

  render() {
    const { classes } = this.props;
    const { isLoading, riskTypes } = this.state;

    return (
      <div className={classes.root}>
        {isLoading ? (
          <CircularProgress />
        ) : (
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
            <List>
              {riskTypes.map(r => (
                <ListItem button key={r.id} component={Link} to={`/${r.id}`}>
                  <ListItemText primary={r.name} />
                </ListItem>
              ))}
            </List>
          </Fragment>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
