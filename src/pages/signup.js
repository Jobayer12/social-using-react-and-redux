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
import {signUpUser} from '../redux/actions/userActions';


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

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword:"",
      handle:"",
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
    
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword:this.state.confirmPassword,
      handle:this.state.handle
    };
    
    this.props.signUpUser(newUser,this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
};
  

  render() {
    const { classes ,UI:{loading}} = this.props;
    const {errors}=this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            SignUp
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />

            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
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
              SignUp
              {loading&&(
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>


            <br/>
            <br/>
            <small className={classes.account}>
              Already have an account?login <Link to="/login">here</Link>
            </small>
            
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user:PropTypes.object.isRequired,
  UI:PropTypes.object.isRequired,
  signUpUser:PropTypes.func.isRequired
};

const mapStateToProps=(state)=>({
  user:state.user,
  UI:state.UI
});

export default connect(mapStateToProps,{signUpUser})(withStyles(styles)(signup));
