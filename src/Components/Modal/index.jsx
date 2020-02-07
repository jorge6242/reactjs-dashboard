import React from "react";
import Grid from "@material-ui/core/Grid";
import purple from "@material-ui/core/colors/purple";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import { updateModal } from "../../Actions/modalActions";
import { useDispatch, useSelector } from "react-redux";
import "./index.sass";

/**
 * Generic Modal
 *
 * @param {boolean} status Status Modal
 * @param {html} element Children Component
 * @param {boolean} isLoader Status Loader for asynchronous task
 * @param {boolean} customSize Modal Custom Size, default = 600px
 *
 * behavior :
 *
 * import { updateModal } from 'Actions/modalActions';
 *
 * this.props.updateModal({ payload : { status : true , element : <Component/> } }) Open Modal
 *
 */

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    position: "relative",
    top: "45%"
  }
}));

export default function Modal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { status, element, isLoader, customSize, title } = useSelector(
    state => state.modalReducer
  );
  return (
    <div className={`modal-main ${status ? "modal-main--active" : ""} `}>
      <div className="modal-main__backdrop">
        <Grid
          container
          spacing={0}
          className={`modal-main__content ${customSize}`}
        >
          <Grid container spacing={0} className="modal-main_header">
            <Grid item xs={4} className="modal-main_title">
              {title}
            </Grid>
            <Grid
              item
              xs={7}
              className="modal-main_close"
              onClick={() =>
                dispatch(
                  updateModal({ payload: { status: false, element: <div /> } })
                )
              }
            >
              X
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            className={`modal-main__loader ${
              isLoader ? "modal-main__active" : ""
            }`}
          >
            <CircularProgress
              className={classes.progress}
              style={{ color: purple[500] }}
              thickness={7}
            />
          </Grid>
          <Grid container spacing={0} className="modal-main__children">
            {element}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
