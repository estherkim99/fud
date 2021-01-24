import './App.css';
import './firebase/init';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { UserProvider } from "./firebase/UserProvider"
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App" style={{ height: "100vh", width: "100vw" }}>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/profile" component={Profile}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
