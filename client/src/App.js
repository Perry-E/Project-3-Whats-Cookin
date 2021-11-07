import { Route, Switch } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import LogIn from "./pages/LogIn";
import NavigationBar from "./components/NavigationBar";
import Landing from "./pages/Landing/index";
import CreateRecipe from "./pages/CreateRecipe/index";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import RecipePage from "./pages/Recipe";
import DisplayMeals from "./pages/DisplayMeals";
import MealPlan from "./pages/MealPlan";

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
        <Route exact path="/edit/:recipeId">
          <CreateRecipe mode='edit' />
        </Route>

        <Route path="/login">
          <LogIn onLoginSuccess={(userInfo) => setUserData(userInfo)} />
        </Route>

        <Route path="/signup" component={SignUp} />
        <Route path="/profile/:userId" component={UserProfile} />
        <Route path="/recipe/:recipeId" component={RecipePage} />
        <Route path="/planner/:mealPlanId/" component={MealPlan} />
      </Switch>
    </div>
  );
}

export default App;
