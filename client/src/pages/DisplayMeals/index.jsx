import React from "react";
import { useState } from "react";
import Card from "../../components/Cards";
import { Section } from "../../components/Containers";
import SearchBar from "../../components/SearchBar";

const DisplayMeals = (props) => {
  const allMeals = props.recipes;
  const [filteredMeal, setFilteredMeal] = useState(allMeals);

  return (
    <>
      <div className="menuIndex">
        <Section>
          <h1>Meals</h1>
        </Section>

        <SearchBar recipes={allMeals} setFilteredMeal={setFilteredMeal} />
        
        <div className="container">
          {filteredMeal?.map((item) => {
            return (
              <Card.Recipe
                recipe={item}
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
