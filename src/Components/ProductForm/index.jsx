import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import _ from "lodash";

import { get, update, create } from "../../Actions/productActions";
import { getAll as getAllCategories } from "../../Actions/categoryActions";
import CustomTextField from "../FormElements/CustomTextField";
import CustomSelect from "../FormElements/CustomSelect";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -9,
    marginLeft: -9
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  select: {
    padding: '10px 0px 10px 0px',
    width:' 100%',
    backgroundColor: 'transparent',
    border: 0,
    borderBottom: '1px solid grey',
    fontSize: '16px'
  }
}));

export default function ProductForm({ id }) {
  const classes = useStyles();
  const loading = useSelector(state => state.productReducer.loading);
  const categories = useSelector(state => state.categoryReducer.categories);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    errors,
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    async function fetch() {
      const res = await dispatch(getAllCategories());
      if (id) {
        const { description, price, categories_id } = await dispatch(get(id));
        setValue("description", description);
        setValue("price", price);
        setValue("categories_id", categories_id);
      } else {
        const first = _.head(res);
        setValue("categories_id", first.id);
      }
    }
    fetch();
  }, [id, dispatch, setValue]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleForm = form => {
    if (id) {
      dispatch(update({ id, ...form }));
    } else {
      dispatch(create(form));
    }
  };

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Product
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <CustomTextField
            placeholder="Description"
            field="description"
            required
            register={register}
            errorsField={errors.description}
            errorsMessageField={
              errors.description && errors.description.message
            }
          />
          <CustomTextField
            placeholder="Price"
            field="price"
            required
            register={register}
            errorsField={errors.price}
            errorsMessageField={errors.price && errors.price.message}
          />

          <CustomSelect
            field="categories_id"
            required
            register={register}
            errorsMessageField={errors.categories_id && errors.categories_id.message}
          >
            {categories.map((category, i) => (
              <option key={i} value={category.id}>
                {category.description}
              </option>
            ))}
          </CustomSelect>

          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
            >
              {id ? "Update" : "Create"}
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </form>
      </div>
    </Container>
  );
}
