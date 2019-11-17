import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyle from "@material-ui/core/styles/withStyles";

//dialog
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

//icon
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
//classes
import { postScream } from "../redux/actions/dataAction";
import MyButton from "../utils/MyButton";
import { connect } from "react-redux";

const styles = {
    submitButton:{
        position:'relative',
        float:'right',
        marginTop:10
    },
    progressSpinner:{
        position:'absolute'
    },
    closeButton:{
        position:'absolute',
        left:'90%',
        top:'10%'
    }
};

class POSTScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {}
  };
  componentWillReceiveProps(nextProps){
      if(nextProps.UI.errors){
          this.setState({
              errors:nextProps.UI.errors
          })
      }
      if(!nextProps.UI.errors&&!nextProps.UI.loading){
          this.setState({body:''});
          this.handleClose();
      }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false ,errors:{}});
  };
  handleChange=(event)=>{
      this.setState({
          [event.target.name]:event.target.value
      })
  }
  handleSubmit=(event)=>{
      event.preventDefault();
      this.props.postScream({body:this.state.body})
  }
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="pos a scream">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>

          <DialogTitle>Edit Your Details</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Scream!!"
                multiline
                rows="3"
                placeholder="Scream at your social apps"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.TextFields}
                onChange={this.handleChange}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

POSTScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postScream }
)(withStyle(styles)(POSTScream));
