import React from "react";
import { signOut } from "../firebase/auth";
import { useHistory } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";

export default function Header() {
  const history = useHistory();
  const { user } = useSession();
  const logoutUser = async () => {
    await signOut();
    history.push("/signin");
  };
  return (
    <header>
      <h2>Fud</h2>
      {!!user && <button onClick={logoutUser}>Sign out</button>}
    </header>
  );
}
