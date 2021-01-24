import React from "react";
import { useSession } from "../firebase/UserProvider";
import Header from "../components/Header";
import Container from "@material-ui/core/Container";

function Home(prop) {
	const { user } = useSession();
	if (!user) {
        prop.history.push(`/signin`);
	}

	return (
		<div>
			<Header></Header>
			<Container component="main" maxWidth="xs">
				{!!user && (
					<div>
						<p>Name: {user.displayName}</p>
						<p>Email: {user.email}</p>
					</div>
				)}
			</Container>
		</div>
	);
};

export default Home;
