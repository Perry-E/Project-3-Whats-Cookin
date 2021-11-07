import { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import Button, { BackButton } from "../../components/Buttons";
import { Container, Section, Page, GridRow, Col } from "../../components/Containers";
import Image from '../../components/ImageDisplays'
import styled from "styled-components";
import ShoppingListSection from "./ShoppingListSection";
import StepSection from "./StepSection";
import ReviewSection from "./ReviewSection";
import { useQuery } from "../../util";

const ContentContainer = styled(Col)`
  padding: 24px 0;
`;

const initialState = {
  recipe: {},
  shoppingList: [],
  user: '',
  currentStep: 0,
  modal: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };

    default: return state;
  }
}

const MealPlan = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();
  const query = useQuery();
  const history = useHistory();
  const pageQuery = query.get('page')

  const setState = (value) => {
    dispatch({ type: "SET_STATE", payload: value })
  }

  useEffect(() => {
    async function fetchMealPlanData() {
      const res = await axios.get(`/api/mealPlan/${params.mealPlanId}`);
      setState(res.data);
    }
    fetchMealPlanData();
  }, [params.mealPlanId]);


  useEffect(() => {
    if (pageQuery) {
      setState({ currentStep: pageQuery })
    }
  }, [pageQuery])


  async function changeDisplayShown(value) {
    await axios.put(`/api/mealPlan/${params.mealPlanId}/updateStep?value=${value}`);

    setState({currentStep: value});
  }

  async function toggleShoppingItem(id, value, index) {
    const array = [...state.shoppingList];
    array.splice(index, 1, { ...state.shoppingList[index], got: !value })

    await axios.put(`/api/mealPlan/${params.mealPlanId}/${id}/${!value}`)

    setState({ shoppingList: array })
  }

  async function archiveMealPlan() {
    await axios.delete(`/api/mealPlan/${params.mealPlanId}`);
    history.push(`/profile/${state.user}?display=planner`)
  }


  return (
    <Page>
      <Section>
        <Container>
          <GridRow gap={'36px'}>

            <Col>
              <GridRow>
                <BackButton />
                <h1 style={{ margin: 0 }}>Meal Planner</h1>
              </GridRow>

              <ContentContainer>
                {/* Shopping List */}
                {state.currentStep === 0 && (
                  <ShoppingListSection
                    listItems={state.shoppingList}
                    onItemToggle={(id, value, index) => toggleShoppingItem(id, value, index)}
                  />
                )}

                {/* Recipe Steps */}
                {state.currentStep > 0 && state.currentStep <= state?.recipe?.steps?.length && (
                  <StepSection
                    steps={state.recipe.steps}
                    display={state.currentStep - 1}
                  />
                )}

                {/* Review Section */}
                {state.currentStep === state?.recipe?.steps?.length + 1 && (
                  <ReviewSection
                    recipeId={state.recipe._id}
                    onSubmitSuccess={() => archiveMealPlan()}
                  />
                )}
              </ContentContainer>

              <GridRow>
                {state.currentStep > 0 && (
                  <Button.Ghost
                    color={"#000000"}
                    onClick={() => changeDisplayShown(state.currentStep - 1)}
                    style={{ width: 100 }}
                  >
                    Back
                  </Button.Ghost>
                )}
                {state.currentStep <= state?.recipe?.steps?.length && (
                  <Button.Primary
                    onClick={() => changeDisplayShown(state.currentStep + 1)}
                    style={{ width: 100 }}
                  >
                    Next
                  </Button.Primary>
                )}
                {state.currentStep > state?.recipe?.steps?.length && (
                  <Button.Primary
                   onClick={() => archiveMealPlan()}
                   style={{ width: 100 }}
                  >
                   Done
                 </Button.Primary>
                )}
              </GridRow>
            </Col>

            <Image.Recipe 
              src={state.recipe?.picture?.url}
            />

          </GridRow>
        </Container>
      </Section>
    </Page>
  );
};

export default MealPlan;
