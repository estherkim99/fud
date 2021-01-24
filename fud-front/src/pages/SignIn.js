import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { signInWithEmailAndPassword } from "../firebase/auth";
import { useForm } from "react-hook-form";
import LoadingWheel from "../components/LoadingWheel";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: "#83BF22" //'#DEFFD6'
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: "#83BF22"
	},
	link: {
		color: "#83BF22",
	}
}));

function SignIn(prop) {
	const { register, handleSubmit, reset } = useForm();
	const classes = useStyles();
	const [isLoading, setLoading] = useState(false);
	const onSubmit = async (data) => {
		let newUser;
		setLoading(true);
		try {
			newUser = await signInWithEmailAndPassword(data);
			reset();
		} catch (error) {
			console.log(error);
		}
		if (newUser) {
			prop.history.push(`/`);
		} else {
			setLoading(false);
		}
	};

	if (isLoading) {
		return <LoadingWheel />;
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign In
        </Typography>
				<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								inputRef={register}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								inputRef={register}
							/>
						</Grid>
					</Grid>
					<Grid container justify="flex-start">
						<Grid item>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
          </Button>
					<Grid container>
						<Grid item xs={5}>
							{/* <Link href="#" variant="body1">
                Forgot password?
              </Link> */}
						</Grid>
						<Grid item xs={7}>
							<Link href="/signup" variant="body1" className={classes.link}>
								Don't have an account? Sign Up
              </Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>{/* <Copyright /> */}</Box>
		</Container>
	);
}

export default SignIn;
