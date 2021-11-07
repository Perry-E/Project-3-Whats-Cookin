import { useLocation, useParams } from "react-router";
import { Container } from "../../components/Containers";
import Button, { BackButton } from "../../components/Buttons";
import { Link } from "react-router-dom";

const StepsIndex = () => {
  const params = useParams();
  const mealPlanId = params?.mealPlanId;
  const location = useLocation();
  const steps = location?.state?.data?.mealPlanData?.recipe?.steps;
  const recipeId = location?.state?.data?.mealPlanData?.recipe?._id
  console.log("PARAMS STEPS", recipeId)

  return (
    <Container
      style={{
        textAlign: "left",
        paddingLeft: "100px",
        margin: "0 auto",
        width: "600px",
        marginTop: "100px",
      }}
    >
      <BackButton
        style={{ margin: "25px 80px 0px -50px", position: "absolute" }}
      />
      <h1>Steps</h1>
      <div>
        {steps?.map((item) => {
          return (
            <ul key={item?._id}>
              <li>
                <h3>{item?.title}</h3>
              </li>
              <p>{item?.body}</p>
            </ul>
          );
        })}
        <Link
          to={{
            pathname: `/planner/review/${recipeId}`,
            state: { data: { location } },
          }}
        >
          <Button.Alt
            style={{
              width: "150px",
              color: "white",
              backgroundColor: "black",
              marginTop: "60px",
            }}
          >
            Next
          </Button.Alt>
        </Link>
      </div>
    </Container>
  );
};

export default StepsIndex;
