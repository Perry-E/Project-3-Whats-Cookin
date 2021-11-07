import styled from "styled-components";
import { hexToRGB } from "../../util";

/** Base styling for all buttons */
const ButtonBase = styled.button`
  padding: 9px 12px;
  border-radius: ${(prop) => prop.rounded ? '6px' : "initial"};
  border: 0;
  box-sizing: border-box;
  font-size: .8rem;
  cursor: pointer;
  :hover{
    opacity: .8;
  }
`

const PrimaryButton = styled(ButtonBase)`
  background-color: ${(prop) => prop.color || 'black'};
  color: white;
`

const AltButton = styled(ButtonBase)`
  background-color: ${(prop) => prop.color || '#FFB800'};
  color: 'black';
`

const GhostButton = styled(ButtonBase)`
  box-sizing: border-box;
  background-color: transparent;
  border: 1px solid ${(prop) => prop.color || '#FFB800'};
  color: ${(prop) => prop.color || '#FFB800' };
  :hover {
    background-color: ${(prop) => hexToRGB(prop.color || '#FFB800', .05)}
  }
`

const Button = {
  Primary: PrimaryButton,
  Alt: AltButton,
  Ghost: GhostButton,
};

export default Button;

export { default as BackButton } from './BackButton';