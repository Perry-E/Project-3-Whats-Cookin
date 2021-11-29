import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DisplayLunch = (props) => {
    const allLunch = props.recipes
    console.log("lunch props", allLunch)
    const [lunch, setlunch] = useState();

  useEffect(() => {
      //* Filter by type (Lunch)
      const lunchData = allLunch?.filter((item)=>{
        return(
            item.type === "Lunch"
        )
      })
      setlunch(lunchData)
  }, [allLunch]);

  //* All recipe data
  console.log("Lunch", lunch)


  return (
    <>
      <div className="menuIndex">
        <h1>Meals</h1>

        <h3>Lunch</h3>
        <div className="container">
          {lunch?.map((item) => {
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

export default DisplayLunch;
