import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { getAll, remove } from "../../Actions/categoryActions";
import { updateModal } from "../../Actions/modalActions";
import CategoryForm from "../../Components/CategoryForm";
import "./index.sass";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function Datatable({ data, handleSelect, handleRemove }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="center" onClick={() => handleSelect(row.id)}>
                <IconButton aria-label="edit" className={classes.margin}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell align="center" onClick={() => handleRemove(row.id)}>
                <IconButton aria-label="delete" className={classes.margin}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function Category() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categoryReducer.categories);
  useEffect(() => {
    async function fetchData() {
      dispatch(getAll());
    }
    fetchData();
  }, [dispatch]);

  const handleSelect = id => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <CategoryForm id={id} />
        }
      })
    );
  };

  const handleRemove = id => {
    dispatch(remove(id));
  };

  const handleAdd = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <CategoryForm />
        }
      })
    );
  }

  return (
    <div className="category-container">
      <div className="category-container__header">
        <div className="category-container__title">Categories</div>
        <div className="category-container__button" onClick={() => handleAdd()}>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <Datatable
        data={categories}
        handleSelect={handleSelect}
        handleRemove={handleRemove}
      />
    </div>
  );
}
