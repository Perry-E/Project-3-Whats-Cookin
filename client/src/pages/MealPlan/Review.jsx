import { Container } from "../../components/Containers";
import { useLocation } from "react-router";
import Button, { BackButton } from "../../components/Buttons";
import { Link } from "react-router-dom";
import MealPlanReviewInput from "../../components/ReviewInput/mealPlannerReview";

const CreateReview = () => {
  const location = useLocation();
  const name =
    location?.state?.data?.location?.state?.data?.mealPlanData?.recipe?.name;
  const img =
    location?.state?.data?.location?.state?.data?.mealPlanData?.recipe?.picture
      ?.avatar;

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
      <h1>{name}</h1>
      <MealPlanReviewInput />
      <img
        src={img}
        alt="food"
        style={{
          height: "400px",
          width: "350px",
          marginLeft: "500px",
          marginTop: "20px",
          position: "absolute",
        }}
      />
      <Link to={"/"}>
        <Button.Alt
          style={{
            width: "150px",
            color: "white",
            backgroundColor: "black",
            marginTop: "60px",
          }}
        >
          Home
        </Button.Alt>
      </Link>
    </Container>
  );
};

export default CreateReview;
