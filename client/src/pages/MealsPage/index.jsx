import axios from "axios"
import { useState, useEffect } from "react"

export default function MealsPage() {
  const [meals,setMeals] = useState([])
  const [mealPlans, setMealPlans] = useState([])

  useEffect(() => {
    async function fetchMealData() {
      const res = await axios.get('/api/recipes')

      setMeals(res.data);
    }

    async function fetchPlanData() {
      const res = await axios.get('/api/mealPlan')
      // console.log(res.data)
      setMealPlans(res.data)
    }
    fetchMealData()
    fetchPlanData()
  }, [])

  async function addToPlanner(_id) {
    axios.post(`/api/mealPlan/${_id}`)
    .then((res) => {
      // console.log(res.data)
    })
  }

  return (
    <div>
      <h1>Availble Meals</h1>
      {meals.map((meal) => {
        const {_id} = meal;

        return (
        <div>
          <h1>{meal.name}</h1>
          <p>{meal.description}</p>
          {meal.tags.map((tag) => (
            <div><p>{tag}</p></div>
          ))}
          {meal.ingredients.map((ingredient) => (
            <p><b>{ingredient.amount} {ingredient.unit}</b> {ingredient.name}</p>
          ))}
          <button onClick={() => addToPlanner(_id)}>Add to Planner</button>
        </div>
      )})}

      
      <h1>Plans</h1>
      {mealPlans.map((mealPlan) => {
        const {name} = mealPlan.recipe

        function toggleShoppingItem(id, value) {
          axios.put(`/api/mealPlan/${mealPlan._id}/${id}/${!value}`)
          .then((res) => {
            // console.log(res.data)
          })
        }

      return(
        <div>
          <h1>{name}</h1>
          {mealPlan.shoppingList.map((listItem) => (
            <p>
              <input checked={listItem.got} type="checkbox" onChange={() => toggleShoppingItem(listItem._id, listItem.got)} onClick={() => !listItem.got}/>
              <b>{listItem.amount} {listItem.unit}</b> {listItem.name}
            </p>
          ))}
        </div>
      )})}



    </div>
  )
}