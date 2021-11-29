import { useHistory } from "react-router";
import Chip from "../Chips";
import { GridRow } from "../Containers";
import { CardBase,  CardContent, CardImage } from "./components";

const UserRecipeCard = (prop) => {
  const history = useHistory();

  return (
    <CardBase style={prop.style}>
      <CardImage src={prop.image} onClick={() => history.push(`/recipe/${prop.id}`)}/>

      <CardContent>
        <h3>{prop.name}</h3>
        <GridRow>
          <Chip.EstTime time={prop.time} />
        </GridRow>
      </CardContent>

    </CardBase>
  );
};

export default UserRecipeCard;