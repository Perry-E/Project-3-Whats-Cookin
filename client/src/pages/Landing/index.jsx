import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Buttons/index";
import Card from "../../components/Cards";
import { Container, Section } from "../../components/Containers";
import { Banner, TutorialRow } from "./components";
import Footer from "../../components/Footer";
import styled from "styled-components";

const Subheader = styled.h2`
  margin: 0;
  margin-bottom: 18px;
  text-align: ${prop => prop.left ? "left" : prop.centered ? "center" : 'initial'};
`;

const Landing = () => {
  const [card, setCard] = useState();

  useEffect(() => {
    async function fetchRecipeData() {
      const res = await axios.get("/api/recipes");
      setCard(res.data);
    }
    fetchRecipeData();
  }, []);
  // console.log("card", card);

  return (
    <>
      <div className="landing-div">
        <Banner />

        <Section>
          <Container fullWidth>
            <Subheader centered>About Us</Subheader>
            <p className="landing">
              Stuck at home coding and thinking about your next fancy meal? Well
              look no further because What's Cookin is your go to service provider
              that offers you a wide array of recipes, from breakfast to dinner!
              Members of What's Cookin are able to use our service to its fullest
              potential, so what are you waiting for, sign up today!
            </p>
          </Container>
        </Section>

        <Section>
        <Container fullWidth>
          <Subheader>How it works</Subheader>
          <TutorialRow  />
          <div className="bar-container" style={{ margin: "0px" }}></div>
          </Container>
        </Section>

        <Section>
          <Container fullWidth>
          <Subheader>Meals</Subheader>

          <div className="container" style={{marginRight: -12, marginBottom: -12}}>
            {card?.map((item, index) => {
              return (<>
                {index < 5 && (
                  <Card.Recipe
                    recipe={item}
                    style={{marginRight: 12, marginBottom: 12}}
                  />
                )}
              </>);
            })}
          </div>
          <Link to={`/meals`}>
            <Button.Ghost rounded style={{marginTop: 18, width: 200, borderStyle: 'dashed'}}>
              See More
            </Button.Ghost>
          </Link>
          </Container>
        </Section>

        <Section className="bottom-signup" last>
          <Container fullWidth>
          <h3 style={{ margin: 0, marginBottom: 10 }}>
            What are you waiting for?
          </h3>
          <p style={{margin: 0, marginBottom: 20, opacity: .6}}>Sign up now and start your journey to great meals!</p>
          <Link
            to={`/signup`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Button.Primary color={'#FFB800'} rounded style={{width: 100}}>
              Sign Up
            </Button.Primary>
          </Link>
          </Container>
        </Section>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
