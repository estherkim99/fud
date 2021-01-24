import React from "react";
import { useSession } from "../firebase/UserProvider";
import Header from "../components/Header";
import { Grid, Avatar, Typography, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	cover: {
		height: '200px',
		width: '100%',
		backgroundColor: '#F5F5F5'
	},
	button: {
		position: 'relative',
		display: 'block',
		float: 'right',
		padding: '10px 15px',
		margin: '10px'
	},
	profile: {
		height: '100px',
		width: '100px',
		position: 'absolute',
		top: '150px',
		left: '7.5vw'
	},
	name: {
		display: 'inline-block',
		position: 'absolute',
		float: 'left',
		top: '225px',
		left: 'calc(7.5vw + 120px)',
		fontFamily: 'Redressed, cursive',
	}
}))

export default function Profile() {
	const classes = useStyles();
	const { user } = useSession();
	if (!user) {
		return null;
	}

	const userInfo = {
		followers: 143, 
		following: 120
	}

	return (
		<div>
			<Header></Header>
			<Grid container component="main" maxWidth="xs">
				<div className={classes.cover}>
					<div>
					<Typography variant='h4' className={classes.name}>{user.displayName}</Typography>
					<Button className={classes.button}>{userInfo.followers} Followers</Button>
					<Button className={classes.button}>{userInfo.following} Following</Button>
					</div>
				</div>
				<Avatar className={classes.profile}></Avatar>


				{!!user && (
					<Container>
						<div style={{height: '40px', 'width': '100px'}}></div>
						
						{/* <p>Email: {user.email}</p> */}
					</Container>
				)}
			</Grid>
		</div>
	);
};
