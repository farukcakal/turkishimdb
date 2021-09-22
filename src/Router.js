import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import Persons from "./pages/Persons";
import Series from "./pages/Series";
import Tv from "./pages/Tv";
import Person from "./pages/Person";
import Container from "./components/Container";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import { Route, Switch } from "react-router-dom";

function Router() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Navbar />
          <Container />
        </Route>
        <Route path="/movies">
          <Navbar />
          <Movies />
        </Route>
        <Route path="/series">
          <Navbar />
          <Series />
        </Route>
        <Route path="/persons">
          <Navbar />
          <Persons />
        </Route>
        <Route path="/movie/:id">
          <Navbar />
          <Movie />
        </Route>
        <Route path="/tv/:id">
          <Navbar />
          <Tv />
        </Route>
        <Route path="/person/:id">
          <Navbar />
          <Person />
        </Route>
        <Route path="/login">
          <Navbar />
          <Login />
        </Route>
        <Route path="/register">
          <Navbar />
          <Register />
        </Route>
        <Route path="/dashboard">
          <Navbar />
          <Dashboard />
        </Route>
        <Route path="/reset">
          <Navbar />
          <Reset />
        </Route>
      </Switch>
    </div>
  );
}

export default Router;
