import styled from "styled-components";

const ItemContainer = styled.p`
  margin: 0;
  margin-bottom: ${prop => !prop.last ? '6px' : 'initial'};
  text-decoration: ${prop => prop.checked ? 'line-through' : 'inital'};
  color: ${prop => prop.checked ? '#C4C4C4' : '#000000'};
`

export default function ShoppingListSection(props) {
  const {listItems} = props;

  function formatUnit(unit) {
    if (unit) {
      if (unit?.length <= 2) {
        return unit;
      } return ` ${unit}`;
    }
    return '';
  }

  return(
    <>
      {listItems && listItems.map((item, index, arr) => (
        <ItemContainer last={index === arr.length -1} checked={item.got}>
          <input 
            type="checkbox"
            checked={item.got}
            onChange={() => props.onItemToggle(item._id, item.got, index)}
            style={{marginRight: 6}}
          />
          <span><b>{item.amount}{formatUnit(item?.unit)}</b> {item.name}</span>
        </ItemContainer>
      ))}
    </>
  )
}