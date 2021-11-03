import { Route, Switch } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import LogIn from "./pages/LogIn";
import NavigationBar from "./components/NavigationBar";
import Landing from "./pages/Landing/index";
import CreateRecipe from "./pages/CreateRecipe/index";
import SignUp from "./pages/SignUp";
import DisplayMeals from "./pages/DisplayMeals";

function App() {
  const [userData, setUserData] = useState({});
  const [allMeals, setAllMeals] = useState();

  useEffect(() => {
    async function fetchRecipeData() {
      const res = await axios.get("/api/recipes");
      setAllMeals(res.data);
    }
    fetchRecipeData();
  }, []);
  
  return (
    <div style={{ backgroundColor: "white" }}>
      <NavigationBar userData={userData} />
      <Switch>
        <Route exact path="/" component={Landing} />

        <Route exact path="/meals">
          <DisplayMeals recipes={allMeals} />
        </Route>

        <Route exact path="/create" component={CreateRecipe} />

        <Route path="/login">
          <LogIn onLoginSuccess={(userInfo) => setUserData(userInfo)} />
        </Route>

        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
