import { useHistory } from "react-router";
import { CardPortalBase } from "./components";

export default function CreateRecipePortal(props) {
  const history = useHistory();

  return(
    <CardPortalBase onClick={() => history.push('/create')} style={props.style}>
      <i className="fa-solid fa-plus" style={{fontSize: '1.5rem'}}/>
      <h3>Create Recipe</h3>
    </CardPortalBase>
  )
}