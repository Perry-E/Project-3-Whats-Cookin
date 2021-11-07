import { useReducer } from 'react'
import { Col, GridRow } from '../Containers'
import Button from '../Buttons'
import Input, { TextArea, Label } from '../Inputs'
import ErrorPrompt from '../ErrorPrompt'
import axios from 'axios';

const initialState = {
  form: { title: '', rating: 5, comment: '' },
  error: { title: '', rating: '' },
}

const reducer = (state, aciton) => {
  switch (aciton.type) {
    case "SET_FORM":
      return { ...state, form: { ...state.form, ...aciton.payload } }
    case "SET_ERROR":
      return { ...state, error: { ...state.error, ...aciton.payload } }

    default: return state;
  }
}

export default function ReviewInput(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { form, error } = state;

  const setForm = (value) => {
    dispatch({ type: "SET_FORM", payload: value })
  }
  const setError = (value) => {
    dispatch({ type: "SET_ERROR", payload: value })
  }

  function handleChange(e) {
    const { name, value } = e.currentTarget;

    setForm({ ...form, [name]: value })
  }

  function checkForm() {
    setError(initialState.error);

    if (form.title === '') {
      setError({ title: "Include a review title" })
    }

    if (form.rating === '') {
      setError({ rating: "Leave a review raitng" })
    }

    if (error.title === "" && error.rating === "") {
      submitForm()
    }

  }

  function submitForm() {
    axios.post(`/api/reviews/${props.recipeId}`, form)
      .then((res) => {
        console.log(res.data)
        props.onSubmitSuccess()
      })
  }

  const SubmitButton = () => (
    <Button.Primary
      color="#FFCB14"
      onClick={() => checkForm()}
      rounded
      style={{ width: 100 }}
    >
      Post
    </Button.Primary>
  )

  return (
    <>
      <Col style={{ alignItems: 'flex-start', marginBottom: 18 }}>
        <Col style={{ marginBottom: 6, alignItems: 'flex-start' }}>
          <Label>Review Title</Label>
          <Input
            name='title'
            placeholder="Review Title"
            value={form.title}
            onChange={handleChange}
            error={error.title}
          />
          {error.title && <ErrorPrompt>{error.title}</ErrorPrompt>}
        </Col>
        <Col style={{ marginBottom: 6, alignItems: 'flex-start' }}>
          <Label>Rating</Label>
          <Input
            name='rating'
            type="number"
            value={form.rating}
            min={1} max={5}
            onChange={handleChange}
            error={error.rating}
          />
          {error.rating && <ErrorPrompt>{error.rating}</ErrorPrompt>}
        </Col>
        <Label>Comment</Label>
        <TextArea
          name='comment'
          type="textArea"
          placeholder="Leave a comment"
          value={form.comment}
          onChange={handleChange}
        />
      </Col>
      <GridRow>
        <SubmitButton />
      </GridRow>
    </>
  )
}