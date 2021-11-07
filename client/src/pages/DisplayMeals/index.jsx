import React from "react";
import { useState } from "react";
import Card from "../../components/Cards";
import SearchBar from "../../components/SearchBar";

const DisplayMeals = (props) => {
  const allMeals = props.recipes;
  const [filteredMeal, setFilteredMeal] = useState(allMeals);

  return (
    <>
      <div className="menuIndex">
        <h1 style={{marginBottom:"70px", marginTop:"50px"}}>Meals</h1>
        <SearchBar recipes={allMeals} setFilteredMeal={setFilteredMeal} />
        <div className="container">
          {filteredMeal?.map((item) => {
            return (
              <Card.Recipe
                id={item._id}
                image={item?.picture?.avatar}
                name={item.name}
                time={item.time}
                style={{margin: '6px 12px', marginTop: 0}}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DisplayMeals;
