import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { loginUser, logoutUser } from '../../actions/userActions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  grow: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  formControl: {
    margin: theme.spacing(1)
  },
  linkItem: {
    textDecoration: 'none'
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    const { loggedIn = false, logout } = props;
    // if (!!loggedIn) {
    //   logout().then(() => setTimeout(() => this.setState({ open: true })));
    // }

    this.state = {
      open: !loggedIn,
      username: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleClickOpen = () => this.setState({ open: true });

  handleClose = () => {
    this.setState({ open: false });
    this.props.history.push('/');
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    const { username } = this.state;
    if (username) {
      this.props.startLogin(username);
      this.props.history.push('/home');
    }
  }
  handleEnter(e) {
    const { username } = this.state;
    if (username && e.key === 'Enter') {
      this.props.startLogin(username);
      this.props.history.push('/home');
    }
  }

  render() {
    const { classes } = this.props;
    const { username, password } = this.state;

    return (
      <React.Fragment>
        {/*
        <Button variant='outlined' color='primary' onClick={this.handleClickOpen}>
          Open alert dialog
        </Button>
        */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Login to your account'}</DialogTitle>
          <DialogContent>
            <form className={classes.container} noValidate autoComplete='off'>
              <div className={classes.margin}>
                <Grid container spacing={6} alignItems='flex-end'>
                  {/* <Grid item>
                    <AccountCircle />
                  </Grid> */}
                  <Grid item>
                    <TextField
                      id='input-username'
                      className={classes.textField}
                      label='Username'
                      value={username}
                      onChange={this.handleChange('username')}
                    />
                  </Grid>
                </Grid>
              </div>              
            </form>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='default' onClick={this.handleClose}>
              Cancel
            </Button>
            <div className={classes.grow} />
            <Button variant='contained' color='primary' onClick={this.handleSubmit}>
              Login
            </Button>
          </DialogActions>
        </Dialog>
        {/*</div>*/}
      </React.Fragment>
    );
  }
}

Login.defaultProps = {};

Login.propTypes = {
  classes: PropTypes.object,
  loggingIn: PropTypes.bool,
  loggedIn: PropTypes.bool,
  startLogin: PropTypes.func,
  logout: PropTypes.func,
  history: ReactRouterPropTypes.history.isRequired
};

const mapStateToProps = state => {
  const { loggingIn, loggedIn } = state.auth;
  return { loggingIn, loggedIn };
};

const mapDispatchToProps = dispatch => ({
  startLogin: (username) => dispatch(loginUser(username)),
  logout: () => dispatch(logoutUser())
});

export default compose(
  withStyles(styles, { name: 'Login' }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Login);
