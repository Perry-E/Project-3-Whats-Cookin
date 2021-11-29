import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button, { BackButton } from "../../components/Buttons";
import { Container } from "../../components/Containers";
import axios from "axios";

const MealPlan = () => {
  const params = useParams();
  const mealPlanId = params?.mealPlanId;

  const [mealPlanData, setMealPlanData] = useState({});
  useEffect(() => {
    async function fetchMealPlanData() {
      const res = await axios.get(`/api/mealPlan/${mealPlanId}`);
      setMealPlanData(res.data);
    }
    fetchMealPlanData();
  }, [mealPlanId]);

  const shoppingList = mealPlanData?.shoppingList;
  const picture = mealPlanData?.recipe?.picture?.avatar;

  
  async function toggleShoppingItem(id, value, index) {
    const array = [...shoppingList];
    array.splice(index, 1, {...shoppingList[index], got: !value})

    await axios.put(`/api/mealPlan/${mealPlanId}/${id}/${!value}`)
    .then((res) => {
      // console.log(res.data)
    })

    setMealPlanData({...mealPlanData, shoppingList: array})
  }

  return (
    <>
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
        <h1>Meal Planner</h1>
        <div>
          {shoppingList?.map((item, index) => {
            return (
              <div key={item._id}>
                <label style={{ marginLeft: "10px" }}>
                  <input
                    type="checkbox"
                    id={`${item._id}`}
                    name={`${item.name}`}
                    checked={item.got}
                    style={{ marginLeft: "10px", marginBottom: "15px" }}
                    className="strikethrough"
                    onChange={() => toggleShoppingItem(item._id, item.got, index)}
                  />{" "}
                  <span>
                    <b>{`${item.amount} ${item.unit}`}</b> {`${item.name}`}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
        <Link
          to={{
            pathname: `/planner/${mealPlanId}/steps`,
            state: { data: { mealPlanData } },
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
        <img
          src={picture}
          alt="food"
          style={{
            height: "400px",
            width: "350px",
            marginLeft: "500px",
            marginTop: "20px",
            position: "absolute",
          }}
        />
      </Container>
    </>
  );
};

export default MealPlan;
