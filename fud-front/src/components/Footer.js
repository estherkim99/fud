import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	footer: {
		position: 'absolute',
		height: 'fit-content',
		bottom: '0',
		padding: '3px 0px'
	},
	copyright: {
		fontSize: 'small',
	}
}));



export default function Footer() {
	const classes = useStyles();
	
	return (
		<Container className={classes.footer} elevation={0} >
			<Typography className={classes.copyright} component="p">&copy; Copyright 2021 Fud Team - Submission for Hack@Brown 2021 </Typography>
		</Container >
	);
}
