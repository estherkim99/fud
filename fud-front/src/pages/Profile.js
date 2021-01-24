import React from "react";
import { useSession } from "../firebase/UserProvider";
import Header from "../components/Header";
import { Grid, Avatar, Typography, Container, Button, Tab, Tabs, Card } from "@material-ui/core";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

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
	},
	cardCol: {
		padding: theme.spacing(1),
		// display: 'block'
	},
	media: {
		height: '150px',
		backgroundColor: '#F5F5F5',
	},
}))

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<div>
					{children}
				</div>
			)}
		</div>
	);
}
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

export default function Profile(prop) {
	const classes = useStyles();
	const { user } = useSession();
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	if (!user) {
		prop.history.push(`/signin`);
	}

	const userInfo = {
		followers: 143,
		following: 120,
		name: 'Demo User'
	}

	var recipes = [...Array(10).keys()].map((item, index) => {
		return <Grid item xs={6} md={4} lg={3} className={classes.cardCol} key={index}>
			<Card>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image="/"
				/>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					Read more
        		</Button>
			</CardActions>
		</Card>
		</Grid>
	})
	var achievements = [...Array(10).keys()].map((item, index) => {
		return <Grid item xs={6} md={4} lg={3} className={classes.cardCol} key={index}>
			<Card>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image="/"
				/>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					Read more
        		</Button>
			</CardActions>
		</Card>
		</Grid>
	})
	var stories = [...Array(10).keys()].map((item, index) => {
		return <Grid item xs={6} md={4} lg={3} className={classes.cardCol} key={index}>
			<Card>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image="/"
				/>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					Read more
        		</Button>
			</CardActions>
		</Card>
		</Grid>
	})

	return (
		<div>
			<Header></Header>
			<Grid container component="main">
				<div className={classes.cover}>
					<div>
						<Typography variant='h4' className={classes.name || userInfo.name}>{user.displayName}</Typography>
						<Button className={classes.button}>{userInfo.followers} Followers</Button>
						<Button className={classes.button}>{userInfo.following} Following</Button>
					</div>
				</div>
				<Avatar className={classes.profile}></Avatar>
				<Container>
					<Tabs value={value} onChange={handleChange} variant="fullWidth">
						<Tab label="My Recipes" />
						<Tab label="Achievements" />
						<Tab label="My Stories" />
					</Tabs>

					<TabPanel value={value} index={0} >
						<Grid container>{recipes}</Grid>	
					</TabPanel>
					<TabPanel value={value} index={1} >
						<Grid container>{achievements}</Grid>
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Grid container>{stories}</Grid>
					</TabPanel>

				</Container>
			</Grid>
		</div>
	);
};
