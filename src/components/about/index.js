import React, { Component } from "react";
import Layout from "../shared/Layout";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const classes = {
  root: {
    flexGrow: 1,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const AboutCard = props => {
  return (
    <div>
      <Card style={classes.card}>
        <CardContent>
          <Typography style={classes.title} color="textSecondary">
            React App
          </Typography>
          <Typography variant="h5" component="h2">
            Manage your monthly budget
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" style={{ flex: 1, float: 'right' }} href="/#/login">Login</Button>
        </CardActions>
      </Card>
    </div>
  );
};

class About extends Component {
  render() {
    return (
      <Layout>
        <AboutCard />
      </Layout>
    );
  }
}
export default About;
