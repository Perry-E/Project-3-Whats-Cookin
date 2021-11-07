import axios from "axios";
import { useHistory } from "react-router";
import Button from "../Buttons";
import Chip from "../Chips";
import { CardBase, CardButtonRow, CardContent, CardImage } from "./components";

const MealPlanCard = (prop) => {
  const history = useHistory();

  async function handleDelete() {
    const res = await axios.delete(`/api/mealPlan/${prop.id}`)
    prop.onMealDelete(res.data)
  }

  const GoToPlanButton = () => {
    const yetToStart = prop.shoppingList.filter((item) => item.got === true).length === 0 && prop.currentStep === 0;
    return (
      <Button.Primary 
        color={yetToStart ? "black" : "#FFB800"}
        rounded
        onClick={() => history.push(`/planner/${prop.id}`)}
      >
        {yetToStart ? "start" : "continue"}
      </Button.Primary>
  )};

  const DeleteButton = () => (
    <Button.Alt 
      color={'black'} 
      style={{ backgroundColor: 'rgba(0,0,0,.2)' }} 
      rounded
      onClick={() => handleDelete()}
    >
      <i className="fa-regular fa-trash-can" />
    </Button.Alt>
  );

  return (
    <CardBase style={prop.style}>
      <CardImage src={prop.image} onClick={() => history.push(`/planner/${prop.id}`)}/>

      <CardContent>
        <h3 style={{margin: '12px 0'}}>{prop.name}</h3>
        
        <CardButtonRow style={{gridAutoColumns: 'max-content', marginBottom: '18px'}}>
          <Chip.EstTime time={prop.time}/>
          <Chip.ShoppingList shoppingList={prop.shoppingList}/>
        </CardButtonRow>

        <CardButtonRow style={{gridTemplateColumns: '1fr auto'}}>
          <GoToPlanButton />
          <DeleteButton />
        </CardButtonRow>

      </CardContent>

    </CardBase>
  );
};

export default MealPlanCard;