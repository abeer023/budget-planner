import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { logoutUser } from '../../actions/userActions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  avatar: {
    margin: 10
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    width: 200
  },
  formControl: {
    margin: theme.spacing(1)
  }
});

class Logout extends React.Component {
  handleLogout = () => {
    this.props.logout();
    this.props.history.push('/');
  };

  render() {
    const { classes, user } = this.props;
    return (
      <React.Fragment>
        <Typography variant='subtitle2' color='inherit' className={classes.grow} noWrap>Welcome {user.name}
        </Typography>
        <Button color='inherit' align='right' onClick={this.props.startLogout}>{'   '}Logout</Button>

      </React.Fragment>
    );
  }
}

Logout.defaultProps = {};

Logout.propTypes = {
  classes: PropTypes.object,
  loggingIn: PropTypes.bool,
  startLogout: PropTypes.func,
  name: PropTypes.string,
};

const mapStateToProps = state => {
  const {  user } = state.auth;
  return {  user };
};

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(logoutUser())
});

export default compose(
  withStyles(styles, { name: 'Logout' }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Logout);
