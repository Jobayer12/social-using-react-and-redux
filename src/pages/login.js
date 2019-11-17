import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress'
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
import AppIcon from "../images/monkey.png";

import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';


const styles ={
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  textfield: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position:'relative'
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop:15
  },
  account:{
    margin: "10px auto 10px auto"
  },
  progress:{
    position:'absolute'
  }
}

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({errors:nextProps.UI.errors})
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData,this.props.history);
    
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

  };
  

  render() {
    const { classes,UI:{loading} } = this.props;
    const {errors}=this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button} 
              disabled={loading}
            >
              Login
              {loading&&(
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>


            <br/>
            <br/>
            <small className={classes.account}>
              don't have an account?signup <Link to="/signup">here</Link>
            </small>
            
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser:PropTypes.func.isRequired,
  user:PropTypes.object.isRequired,
  UI:PropTypes.object.isRequired
};

const mapStateToProps=(state)=>({
  user:state.user,
  UI:state.UI
});

const mapActionToProps={
  loginUser
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(login));
