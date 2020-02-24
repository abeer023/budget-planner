import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Logout from '../users/Logout';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
});

class Layout extends React.Component {
  constructor(props) {
    super(props);    
    this.conditRenderEssential = this.conditRenderEssential.bind(this);
  }

  conditRenderEssential = () =>
    this.props.loggedIn ? (
      <Logout />
    ) : null

  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" color="inherit" style={{ flex: 1 }}>
              Budget Planner
            </Typography>
            {this.conditRenderEssential()}
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loggingIn, loggedIn } = state.auth;
  return { loggingIn, loggedIn };
};

export default compose(
  withStyles(styles, { name: 'Layout' }),
  connect(
    mapStateToProps
  )
)(Layout);
