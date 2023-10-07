import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";
import style from "../css/LoginPage.module.css";
import { TextField, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useThunk } from "../hooks/use-thunk";
import { findUser } from "../store";
import { useNavigate } from "react-router-dom";
import SyncIcon from "@mui/icons-material/Sync";

function LoginPage() {
  //thunk function for finding existing user
  const [doFindUser, findingUserinProgress, errorInFindingUser] =
    useThunk(findUser);

  const navigate = useNavigate();

  //extracting functions from useForm to validate the form
  const { register, handleSubmit, reset } = useForm({ mode: "all" });

  //handling the form submission
  const onSubmit = (data, e) => {
    e.preventDefault();
    //dispatching logout existing user before login in new user
    doFindUser(data);
    reset();
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
      {/* username */}
      <motion.div
        variants={formContainerVariant}
        initial="offScreen"
        animate="onScreen"
        className={style.form_container}
      >
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography
            component={"h1"}
            style={{ fontWeight: "bold", color: "black" }}
          >
            Log-In
          </Typography>
          <TextField
            {...register("email")}
            label="Email"
            fullWidth
            InputProps={{
              className: style.input,
            }}
          />

          {/* password */}
          <TextField
            {...register("password")}
            type="password"
            label="Password"
            fullWidth
            InputProps={{
              className: style.input,
            }}
          />

          {/* submit or reset Button */}
          <div className={style.actions}>
            <Button variant="contained" color="warning" onClick={() => reset()}>
              reset
            </Button>
            <Button variant="contained" type="submit" color="success">
              {findingUserinProgress ? (
                <SyncIcon className={style.loading_icon} />
              ) : (
                "login"
              )}
            </Button>
            {errorInFindingUser && <span>Error in fetching data...</span>}
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default LoginPage;
