import styled from "styled-components"

import Chip from '../../components/Chips'

const Title = styled.h2`
  margin: 0;
  margin-bottom: 6px;
`

const Body = styled.p`
  margin: 0;
  max-width: 400px;
`

export default function StepSection(props) {
  const {steps, display} = props;
  return (
    <>
      <Title>{steps[display].title}</Title>
      <Body>{steps[display].body}</Body>

      <Chip.Tag 
        text={`Step ${display + 1} of ${steps.length}`}
        color={'#999999'}
        style={{alignSelf: "flex-start", marginTop: 12}}
      />
    </>
  )
}