/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PseudoInputBox } from ".";

const TabItem = styled.div`
  background-color: rgba(0, 0,0,.1);
  font-size: .8rem;
  padding: 0 6px;
  border-radius: 3px;
`
const DeleteButton = styled.i`
  margin-left: 6px;
  opacity: .5;
  :hover {
    opacity: .8;
  }
`

const TagInput = styled.input`
  border: 0;
  :focus {
    outline-width: 0;
  }
`

export default function TagsInput(props) {
  const [value, setValue] = useState([])

  useEffect(() => {
    if (props.value) {
      setValue(props.value)
    }
  }, [props.value])

  function handleSubmit(e) {
    const newValue = [...value, e.target.elements.tagInput.value]
    e.preventDefault();
    setValue(newValue)
    e.target.reset()

    props.onChange(newValue)
  }

  function handleDelete(index) {
    const array = [...value];
    array.splice(index, 1);
    setValue(array)

    props.onChange(array)
  }

  return(
    <form onSubmit={handleSubmit}>
      <PseudoInputBox gap="3px" style={props.style}>
      {value && value.map((data, index) => (
        <TabItem key={data}>
          <p style={{margin: 0}}>
            {data}
            <DeleteButton className="fa-solid fa-xmark" onClick={() => handleDelete(index)} />
          </p>
        </TabItem>
      ))}
      <TagInput name='tagInput' placeholder="Enter a tag"/>
    </PseudoInputBox>
    </form>
  )
}