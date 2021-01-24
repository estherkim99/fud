import React from "react";
import { fade, makeStyles } from '@material-ui/core/styles';
import { signOut } from "../firebase/auth";
import { useHistory } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";
import { AppBar, Toolbar, IconButton, Button, Typography, InputBase, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		backgroundColor: '#DEFFD6',
		color: 'black',
		boxShadow: 'none',
	},
	titleContainer: {
		flexGrow: 1,
	},
	title: {
		textAlign: 'left',
		fontFamily: 'Redressed, cursive',
		fontSize: 'xxx-large',
		textTransform: 'none'
	},
	search: {
		position: 'relative',
		flexGrow: 1,
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
		width: '100%'
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '50%',
		[theme.breakpoints.up('md')]: {
			width: '80%',
		},
	},
	inputInput: {
		textAlign: 'left',
		padding: theme.spacing(1, 1, 1, 0),
		width: '100%'
	},
}));



export default function Header() {
	const classes = useStyles();
	const history = useHistory();
	const { user } = useSession();
	const logoutUser = async () => {
		await signOut();
		history.push("/signin");
	};

	const [anchorMenuEl, setAnchorMenuEl] = React.useState(null);
	const openMenu = (event) => {
		setAnchorMenuEl(event.currentTarget);
	};

	const closeMenu = () => {
		setAnchorMenuEl(null);
	};

	return (
		<AppBar position="static" className={classes.appBar}>
			<Toolbar>
				<Button className={classes.titleContainer} onClick={() => history.push("/")}>
					<Typography className={classes.title}>
						fud
          		</Typography></Button>
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder="Search"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ 'aria-label': 'search' }}
					/>
				</div>

				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
					onClick={openMenu}
				>
					<AccountCircle />
				</IconButton>

				<Menu
					id="menu-appbar"
					anchorEl={anchorMenuEl}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorMenuEl)}
					onClose={closeMenu}
				>
					<MenuItem onClick={closeMenu}>
						{!!user && <Button color="inherit" onClick={() => history.push('/profile')}>View Profile</Button>}
					</MenuItem>
					<MenuItem onClick={closeMenu}>
						{!!user && <Button color="inherit" onClick={() => logoutUser}>Sign Out</Button>}
					</MenuItem>
				</Menu>
			</Toolbar >
		</AppBar >
	);
}
