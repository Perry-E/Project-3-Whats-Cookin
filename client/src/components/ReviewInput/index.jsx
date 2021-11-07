import { useState } from 'react'
import {Col} from '../Containers'
import Button from '../Buttons'
import axios from 'axios';

export default function ReviewInput() {
  const [form, setForm] = useState({title: '', rating: 1, comment: ''})

  function handleChange(e) {
    const {name, value} = e.currentTarget;

    setForm({...form, [name]: value})
  }

  function handleSubmit() {
    // ! pass recipe id here
    axios.post(`/api/reviews/617f4509770fdb23f0e13b3f`, form)
    .then((res) => {console.log(res.data)})
  }

  return (
    <Col style={{maxWidth: 300, padding: '2rem'}}>
      <input 
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input 
        name="rating" 
        value={form.rating} 
        onChange={handleChange} 
        type="number" 
        max={5} 
        min={1}
      />
      <textarea
        name='comment'
        value={form.comment}
        onChange={handleChange}
        placeholder="Comment"
        
      />
      <Button.Primary onClick={handleSubmit}>Add Review</Button.Primary>
    </Col>
  )
}