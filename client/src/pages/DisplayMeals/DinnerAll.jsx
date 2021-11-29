import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DisplayDinner = (props) => {
    const allDinner = props.recipes
    console.log("Dinner props", allDinner)
    const [dinner, setdinner] = useState();

  useEffect(() => {
      //* Filter by type (dinner)
      const dinnerData = allDinner?.filter((item)=>{
        return(
            item.type === "Dinner"
        )
      })
      setdinner(dinnerData)
  }, [allDinner]);

  //* All recipe data
  console.log("dinner", dinner)


  return (
    <>
      <div className="menuIndex">
        <h1>Meals</h1>

        <h3>Dinner</h3>
        <div className="container">
          {dinner?.map((item) => {
            return (
              <>
                <div key={item._id} className="card">
                  <img
                    src={item.picture}
                    alt="Avatar"
                    style={{ width: "100%" }}
                    className="landing-image"
                  />
                  <div className="card-text" key={item._id}>
                    <Link
                      to={`/recipes/${item._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <h4>
                        <b>{item.name}</b>
                      </h4>
                    </Link>
                    <p>
                      {item.time.hour > 0 ? `${item.time.hour} hours` : null}{" "}
                      {item.time.minutes > 0
                        ? `${item.time.minutes} mins`
                        : null}{" "}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DisplayDinner;