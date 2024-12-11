import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../../Common/Services/AuthService";
import HeaderAuthLink from "./HeaderAuthLink";
import { useNavigate } from "react-router-dom";

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	flexGrow: 1,
	padding: theme.spacing(0),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
}));

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open',})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	backgroundColor: '#565a89', // Header background color
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
	backgroundColor: '#565a89',
	// EDIT HERE
}));

const Header = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [logout, setLogout] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (logout) {
			logoutUser().then((result) => {
			if (result === "success") {
				console.log("Successfully Logged Out.");
				navigate("/auth");
			} else {
				console.log(result);
			}
			});
			setLogout(false);
		}
	}, [logout, navigate]);

	const logoutButtonHandler = (e) => {
		e.preventDefault();
		setLogout(true);
	};

	const handleDrawerOpen = () => setOpen(true);
	const handleDrawerClose = () => setOpen(false);

	return (
		<Box sx={{ display: 'flex'}}>
			<AppBar position="fixed" open={open}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{ mr: 2, ...(open && { display: 'none' }) }}
				>
				<MenuIcon />
				</IconButton>
				<Box
			sx={{
				position: 'fixed',  // Make it fixed to the top
				top: 0,
				left: '50%',
				transform: 'translateX(-50%)', // Centers the title horizontally
				zIndex: 2000, // Ensures it sits on top of the AppBar
				fontFamily: '"Roboto Flex", sans-serif',
				fontWeight: 900,
				color: '#c99700', // Standard Dome Gold
				padding: '10px 20px',
				borderRadius: '12px',
			}}
			>
			<Typography variant="h4" noWrap component="div">
				Schedule Optimizer
			</Typography>
			</Box>
			</Toolbar>
			</AppBar>
			<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
				width: drawerWidth,
				boxSizing: 'border-box',
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}
			>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
				{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<List>
				<ListItem disablePadding>
				<ListItemButton component={Link} to="/">
					<ListItemText primary="Planner" />
				</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
				<ListItemButton component={Link} to="/optimizer">
					<ListItemText primary="Optimizer" />
				</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
				<ListItemButton component={Link} to="/directions">
					<ListItemText primary="Directions" />
				</ListItemButton>
				</ListItem>
			</List>
			<Divider />
			<HeaderAuthLink 
				authorized={isAuthenticated()}
				onLogoutPress={logoutButtonHandler}
			/>
			</Drawer>
			<Main open={open}>
			</Main>
		</Box>
	);
};

export default Header;
