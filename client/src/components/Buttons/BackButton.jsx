import styled from 'styled-components'
import {useHistory} from 'react-router-dom'

const BackButtonCont = styled.div`
  height: 40px;
  width: 40px;
  background-color: rgba(0,0,0,.1);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.1rem;
`

const BackButton = (props) => {
  const history = useHistory();

  return (
    <BackButtonCont onClick={() => history.goBack()} style={props.style}>
      <i className="fa-solid fa-chevron-left" />
    </BackButtonCont>
  )
}

export default BackButton;