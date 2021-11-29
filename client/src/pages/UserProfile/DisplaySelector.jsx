import styled from "styled-components";
import { Col, Container, Row } from "../../components/Containers";

const Tabs = [
  {name: 'Planner', value: 'planner'},
  {name: 'My Recipes', value: 'recipes'},
]

const DisplayTab = styled.div`
  color: ${prop => prop.active ? 'rgba(255, 184, 0, 1)' : 'black' };
  background-color: ${prop => prop.active ? 'rgba(255, 184, 0, .1)' : 'transparent' };
  padding: 6px 12px;
  margin: 0 100px;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
`;

const TabText = styled.p`
  margin: 0;
`

const SelectorContainer = styled(Col)`
  width: 100%;
  border-bottom: 1px solid #c4c4c4;
  align-items: center;
`;

const DisplaySelector = (props) => (
  <SelectorContainer>
    <Container>
      <Row>
        {Tabs.map((tab) => (
          <DisplayTab 
            onClick={() => props.onTabClick(tab.value)} 
            active={props.currentTab === tab.value}
            key={tab.value}
          >
            <TabText>{tab.name}</TabText>
          </DisplayTab>
        ))}
      </Row>
    </Container>
  </SelectorContainer>
)

export default DisplaySelector;