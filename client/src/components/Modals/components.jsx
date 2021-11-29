import styled from 'styled-components';

export const ModalBack = styled.div`
  display: flex;
  position: fixed;
  background-color: rgba(0,0,0,.1);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`

export const ModalCard = styled.div`
  background-color: white;
  padding: 16px;
  box-shadow: 0,0,6px rgba(0,0,0,0.08);
  border-radius: 6px;
  display: block;
  text-align: center;
`
