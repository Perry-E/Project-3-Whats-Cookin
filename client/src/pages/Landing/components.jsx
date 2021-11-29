import styled from "styled-components"
import Logo from '../../assets/Logo.svg'
import { Col, GridRow } from "../../components/Containers"

const BannerImg = styled.img`
  border-radius: 0 0 12px 12px;
  height: 400px;
  opacity: .5;
`

const LogoContainer = styled.div`
  position: absolute;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  height: 30px; // used to control height of logo
`
const BannerContainer = styled.div`
  position: relative;
`

export const Banner = () => (
  <BannerContainer>
    <BannerImg 
      src="https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1167&q=80"
      alt="banner"
    />
    <LogoContainer>
      <img src={Logo} alt="What's Cooking" style={{height: '100%', width: '100%'}} />
    </LogoContainer>
  </BannerContainer>
)

const tutorialData = [
  {text: 'Sign Up as a member!'},
  {text: 'Customise your profile and add your next meal to the planner!'},
  {text: 'Add your own recipes and reviews!'},
  {text: 'Follow along with our ingredient checklist and recipe!'},
]

const StepDisplay = styled(Col)`
  background-color: #FFB800;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`

export const TutorialRow = () => (
  <GridRow flexed gap={'30px'} className="how-container">
    {tutorialData.map((item, index) => (
      <Col hCenter>
        <StepDisplay>
          <h4>{index + 1}</h4>
        </StepDisplay>
        <p className="how-text">{item.text}</p>
      </Col>
    ))}
  </GridRow>
)