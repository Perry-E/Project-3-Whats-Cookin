import { useState } from "react";
import { Col } from "../Containers";
import Button from "../Buttons";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function MealPlanReviewInput() {
  const [form, setForm] = useState({ title: "", rating: 1, comment: "" });
  const params = useParams();
  const recipeId = params?.recipeId;

  function handleChange(e) {
    const { name, value } = e.currentTarget;
    console.log("HANDLECHANGE", e.currentTarget);
    setForm({ ...form, [name]: value });
  }

  function handleSubmit() {
    // ! pass recipe recipeId here
    axios.post(`/api/reviews/${recipeId}`, form).then((res) => {
      console.log(res.data);
    });
  }

  return (
    <Col style={{ maxWidth: 300 }} className="reviewColumn">
      <h3>Done!</h3>
      <p style={{ marginTop: "-10px" }}>Liked that recipe? Leave a review!</p>

      <label>Review Title</label>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        style={{ marginBottom: "5px" }}
      />

      <label>Rating</label>
      <input
        name="rating"
        value={form.rating}
        onChange={handleChange}
        type="number"
        max={5}
        min={1}
        style={{ marginBottom: "5px" }}
      />

      <label>Comments</label>
      <textarea
        name="comment"
        value={form.comment}
        onChange={handleChange}
        placeholder="Comment"
        style={{ marginBottom: "5px" }}
      />
      <Link to="/">
        <Button.Primary
          onClick={handleSubmit}
          style={{ marginTop: "20px", backgroundColor: "#FFB800" }}
        >
          Add Review
        </Button.Primary>
      </Link>
    </Col>
  );
}
