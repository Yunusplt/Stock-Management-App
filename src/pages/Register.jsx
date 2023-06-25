import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { Formik } from "formik";
import useAuthCall from "../hooks/useAuthCall";
import RegisterForm, { RegisterSchema } from "../components/RegisterForm";




const Register = () => {
  const {register} = useAuthCall()
  
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="40" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>
          {/* //!################################################################## */}
          <Formik
            //todo apiye register istegi attigimda bana ne lazimsa onlardan olusturuyorum initialValuesleri. Postmannden bakilabilir.
            initialValues={{
              username: "",
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              password2: "",
            }}
            validationSchema={RegisterSchema}
            //todo submit işlemi gerçekleştiğinde yapmasını istediğimiz işlemleri buraya yazıyoruz.
            onSubmit={(values, actions) => {
              // same shape as initial values
              console.log(values);
              register(values); //todo formdan gelen values
              actions.resetForm();
            }}
            component={props=> <RegisterForm {...props}/>}
          ></Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/">Do you have an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={0} sm={7} md={6}>
          <Container>
            <img src={image} alt="" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
