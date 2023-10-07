import {
  Button,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import NavBar from "../components/NavBar";
import style from "../css/RegistrationPage.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addUser } from "../store";
import { motion } from "framer-motion";
import { useThunk } from "../hooks/use-thunk";
import SyncIcon from "@mui/icons-material/Sync";

function RegistrationPage() {
  const navigate = useNavigate();

  //using thunk hook to use different state of thunkfunction methods
  const [doAddUser, addingUserLoading, errorInAddingUser] = useThunk(addUser);

  //state for setting user aggreeing to TnC
  const [agreeToTnC, setAgreeToTnC] = useState(false);

  //extracting functions from useForm to validate the form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "all" });

  //implementing validation objects
  const validate = {
    firstName: {
      required: "Firstname is required",
      pattern: {
        value: /[a-z]{3,}/,
        message: "firstname should be at least 3 characters long",
      },
    },
    lastName: {
      required: "Lastname is required",
      pattern: {
        value: /[a-z]{3,}/,
        message: "lastname should be at least 3 characters long",
      },
    },
    email: {
      required: "email is required",
      pattern: {
        value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "email should be valid",
      },
    },
    mobile: {
      required: "mobile number is required",
      pattern: {
        value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
        message: "number should be 10 digits long",
      },
    },
    username: {
      required: "username is required",
      pattern: {
        value: /^[a-zA-Z]\w{6,18}$/,
        message: "username should be 6-18 characters long",
      },
    },
    password: {
      required: "password is required",
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        message:
          "at least one lowercase letter, one Uppercase letter, one digit, one special character, 8-20 characters long",
      },
    },
  };

  //fuctional to set the TnC state to target checked state of checkbox
  const handleChangeInTnC = (e) => setAgreeToTnC(e.target.checked);

  //handling the form submission
  const onSubmit = (data, e) => {
    e.preventDefault();
    doAddUser(data);
    navigate("/", { replace: true });
  };

  //form variant
  const formContainerVariant = {
    offScreen: {
      opacity: 0,
    },
    onScreen: {
      opacity: 1,
      transition: {
        type: "just",
        duration: 0.5,
      },
    },
  };

  return (
    <div>
      <NavBar />
      <motion.div
        variants={formContainerVariant}
        initial="offScreen"
        animate="onScreen"
        className={style.form_container}
      >
        {/* registration/sign-up form */}
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          {/* close form Button */}
          <div className={style.close_icon}>
            <Typography component={"h1"} style={{ fontWeight: "bold" }}>
              Sign-Up Form
            </Typography>
            <span>
              Already have an account?{" "}
              <Link
                to="/registration/log-in"
                style={{ textDecoration: "none" }}
              >
                Log-In
              </Link>
            </span>
            <IconButton onClick={() => navigate("/")}>
              <CloseIcon />
            </IconButton>
          </div>

          {/* user's fullname */}
          <div className={style.user_name}>
            <TextField
              {...register("firstname", validate.firstName)}
              label="FirstName"
              InputProps={{
                className: style.input,
              }}
              helperText={errors && errors.firstname?.message}
            />
            <TextField
              {...register("lastname", validate.lastName)}
              label="LastName"
              InputProps={{
                className: style.input,
              }}
              helperText={errors && errors.lastname?.message}
            />
          </div>

          {/* Email */}
          <TextField
            {...register("email", validate.email)}
            label="Email"
            fullWidth
            InputProps={{
              className: style.input,
            }}
            helperText={errors && errors.email?.message}
          />

          {/* Mobile No. */}
          <TextField
            {...register("mobileNo", validate.mobile)}
            label="Mobile no."
            fullWidth
            InputProps={{
              className: style.input,
            }}
            helperText={errors && errors.mobileNo?.message}
          />

          {/* username */}
          <TextField
            {...register("username", validate.username)}
            label="Username"
            fullWidth
            InputProps={{
              className: style.input,
            }}
            helperText={errors && errors.username?.message}
          />

          {/* password */}
          <TextField
            {...register("password", validate.password)}
            type="password"
            label="Password"
            fullWidth
            InputProps={{
              className: style.input,
            }}
            helperText={errors && errors.password?.message}
          />

          {/* TnC Checkbox */}
          <FormControlLabel
            control={<Checkbox required onChange={handleChangeInTnC} />}
            label="Agree To Terms & Conditions"
            sx={{ color: "black", userSelect: "none" }}
          />

          {/* submit or reset Button */}
          <div className={style.actions}>
            <Button variant="contained" color="warning" onClick={() => reset()}>
              reset
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="success"
              disabled={!agreeToTnC}
            >
              {addingUserLoading ? <SyncIcon /> : "submit"}
            </Button>
            {errorInAddingUser && <span>Error in adding User...</span>}
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default RegistrationPage;
