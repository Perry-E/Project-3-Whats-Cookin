import styled from "styled-components";

/** Row - flex div with horizontal orientation
 * - availble props: vCenter, hCenter to handle alignment 
 */
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: ${(prop) => prop.vCenter ? "center" : "initial" };
  justify-content: ${(prop) => prop.hCenter ? "center" : "initial" };
`

export const GridRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${prop => prop.flexed ? '1fr' : 'max-content'};
  grid-template-columns: ${prop => prop.colTemplate || 'initial'};
  grid-column-gap: ${prop => prop.gap || '12px'};
`

/** Col - flex div with vertical orientation
 * - availble props: vCenter, hCenter to handle alignment 
 */
export const Col = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: ${(prop) => prop.hCenter ? "center" : "initial" };
  justify-content: ${(prop) => prop.vCenter ? "center" : "initial" };
`

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  align-items: center;
  background-color: white;
  box-sizing: border-box;
  `
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 4rem;
  padding-top: ${prop => prop.first ? '8rem' : '4rem'};
  padding-bottom: ${prop => prop.last ? '8rem' : '4rem'};
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  `

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  max-width: 1400px;
  box-sizing: border-box;
  width: ${prop => prop.fullWidth ? "100%" : "initial"};
`
