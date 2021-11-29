import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SearchBarStyle = styled.div`
.search input {
    background-color: #e9ecef;
    border: 0;
    border-radius: 10px;
    font-size: 18px;
    padding: 15px;
    height: 10px;
    width: 300px;
    margin: 0 auto;
    margin-bottom: 80px;
    margin-top: -80px;
  }
`

function SearchBar(props) {
  const allMeals = props.recipes;
  const [searchTerm, setSearchTerm] = useState("");

  //* filter
  const filteredData = allMeals?.filter((item) => {
    console.log("SEARCH TERM", searchTerm, item);
    return (
      searchTerm === "" ||
      item?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  });
  useEffect(() => {
    props.setFilteredMeal(filteredData);
  }, [searchTerm]);

  return (
    <>
    <SearchBarStyle>
      <div className="search">
        <input
          type="text"
          placeholder="Looking for something?"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
    </SearchBarStyle>
    </>
  );
}

export default SearchBar;
