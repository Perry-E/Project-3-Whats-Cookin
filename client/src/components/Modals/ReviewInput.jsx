import Modal from ".";
import { Col, GridRow } from "../Containers";
import Input, { Label, TextArea } from "../Inputs";
import Button from "../Buttons";
import { useState } from "react";
import ErrorPrompt from '../ErrorPrompt';
import axios from "axios";

export default function ReviewInputModal(props) {
  const [form, setForm] = useState({title: '', rating: 5, comment: ''})
  const [error, setError] = useState(false);

  function handleChange(e) {
    const {name, value} = e.currentTarget;
    setForm({...form, [name]: value})
  }

  function checkForm() {
    if (form.title === '') {
      setError(true)
    } else {
      setError(false);
      submitForm()
    }
  }

  async function submitForm() {
    const res = await axios.post(`/api/reviews/${props.recipeId}`, form);
    props.onSuccesfulPost(res.data)
  }

  return(
    <Modal>
      <h3 style={{margin: 0, marginBottom: 6}}>Post a review</h3>
      <p style={{margin: 0, marginBottom: 18, fontSize: '.8rem'}}>Let others know if you liked the meal</p>
      <Col style={{alignItems: 'flex-start', marginBottom: 18}}>
        <Col style={{marginBottom: 6, alignItems: 'flex-start'}}>
          <Label>Review Title</Label>
          <Input 
            name='title' 
            placeholder="Review Title"
            value={form.title}
            onChange={handleChange}
          />
          {error && <ErrorPrompt>Include a review title</ErrorPrompt>}
        </Col>
        <Label>Rating</Label>
        <Input 
          name='rating' 
          type="number"
          value={form.rating}
          min={1} max={5}
          onChange={handleChange}
          style={{marginBottom: 6}}
          />
        <Label>Comment</Label>
        <TextArea 
          name='comment' 
          type="textArea"
          placeholder="Leave a comment"
          value={form.comment}
          onChange={handleChange}
        />
      </Col>

      <GridRow flexed>
        <Button.Ghost 
          color="black" 
          onClick={() => props.closeModal()}
          rounded
        >
          Back
        </Button.Ghost>
        <Button.Primary 
          color="#FFCB14" 
          onClick={() => checkForm()}
          rounded
        >
          Post
        </Button.Primary>
      </GridRow>
    </Modal>
  )
}