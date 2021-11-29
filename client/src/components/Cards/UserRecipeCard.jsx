import axios from "axios";
import { useHistory } from "react-router";
import Button from "../Buttons";
import { CardBase, CardButtonRow, CardContent, CardImage } from "./components";

const UserRecipeCard = (prop) => {
  const history = useHistory();

  const EditButton = () => (
    <Button.Primary rounded onClick={() => history.push(`/edit/${prop.id}`)}>
      edit
    </Button.Primary>
  );

  const DeleteButton = () => {
    const handleDelete = async () => {
      const res = await axios.delete(`/api/recipes/${prop.id}`)
      prop.onRecipeDelete(res.data)
    }

    return (
    <Button.Ghost color={'black'} rounded onClick={handleDelete}>
      delete
    </Button.Ghost>
  )};

  return (
    <CardBase style={prop.style}>
      <CardImage src={prop.image} onClick={() => history.push(`/recipe/${prop.id}`)}/>

      <CardContent>
        <h3>{prop.name}</h3>

        <CardButtonRow flexed>
          <EditButton />
          <DeleteButton />
        </CardButtonRow>

      </CardContent>

    </CardBase>
  );
};

export default UserRecipeCard;