import { useHistory } from "react-router";
import Chip from "../Chips";
import { GridRow } from "../Containers";
import { CardBase,  CardContent, CardImage } from "./components";

const UserRecipeCard = (prop) => {
  const history = useHistory();

  return (
    <CardBase style={prop.style}>
    <CardImage src={prop.recipe?.picture?.url} onClick={() => history.push(`/recipe/${prop.recipe?._id}`)}/>

      <CardContent>
        <h3>{prop.recipe?.name}</h3>
        <GridRow>
          <Chip.EstTime time={prop.recipe?.time} />
        </GridRow>
      </CardContent>

    </CardBase>
  );
};

export default UserRecipeCard;