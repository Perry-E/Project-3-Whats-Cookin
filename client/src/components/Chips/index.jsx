import styled from "styled-components";
import { hexToRGB } from "../../util";

const ChipContainer = styled.div`
  color: ${prop => prop.color || 'black'};
  background-color: ${prop => prop.backgroundColor || `rgba(0,0,0,.2)`};
  padding: 3px 6px;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`
const Text = styled.p`
  margin: 0;
  font-size: .8rem;
`

const EstTimeChip = (props) => {
  const {time} = props;

  return (
    <ChipContainer color={'#1F93FF'} backgroundColor={'rgba(31, 147, 255, .2)'} style={props.style}>
      <Text>
        <i className="fa-regular fa-clock" style={{marginRight: 6}}/>
        {time?.hour ? `${time.hour}hr ` :  ''}
        {time?.minutes ? `${time.minutes}min` :  ''}
      </Text>
    </ChipContainer>
)}

const ShoppingListChip = (props) => {
  const {shoppingList} = props;
  const itemsGot = shoppingList.filter((item) => item.got === true).length

  return (
    <ChipContainer color={'#404040'} backgroundColor={'rgba(64, 64, 64, .2)'} style={props.style}>
      <Text>
        <i className="fa-solid fa-basket-shopping" style={{marginRight: 6}}/>
        {`${itemsGot} of ${shoppingList.length}`}
      </Text>
    </ChipContainer>
)}

const TagChip = (props) => {
  return (
    <ChipContainer color={props.color || '#ffab00'} backgroundColor={hexToRGB(props.color || '#ffab00', .2)} style={props.style}>
      <Text>{props.text}
      </Text>
    </ChipContainer>
  )
}

const Chip = {
  EstTime: EstTimeChip,
  ShoppingList: ShoppingListChip,
  Tag: TagChip
};

export default Chip;