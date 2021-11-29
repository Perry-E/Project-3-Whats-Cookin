import { useHistory } from "react-router";
import { CardPortalBase } from "./components";

export default function FindMealsPortal(props) {
  const history = useHistory();

  return(
    <CardPortalBase onClick={() => history.push('/meals')} style={props.style}>
      <i className="fa-solid fa-plus" style={{fontSize: '1.5rem'}}/>
      <h3>Find meals to add</h3>
    </CardPortalBase>
  )
}