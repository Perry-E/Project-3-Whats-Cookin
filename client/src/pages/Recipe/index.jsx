import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams,  } from "react-router";
import Button from "../../components/Buttons";
import Chip from "../../components/Chips";
import { Col, Container, GridRow, Page, Row, Section } from "../../components/Containers";
import Image from '../../components/ImageDisplays'
import {RatingIndicator, ReviewItem, StepItem} from './components'
import ReviewInputModal from "../../components/Modals/ReviewInput";
import LoginRequiredModal from "../../components/Modals/LoginRequired";

export default function RecipePage(props) {
  const [recipe, setRecipe] = useState({})
  const [reviews, setReviews] = useState([])
  const [loggedUser, setLoggedUser] = useState()
  const [modal, setModal] = useState('')
  const params = useParams()
  const history = useHistory()
  let reviewAvg = 0

  // Calcuate the review rating for the dish
  if (reviews.length > 0) {
    for(const review of reviews) {
      reviewAvg += review.rating;
    }
    reviewAvg /= reviews.length
  }
  
  // On load fetch recipe data
  useEffect(() => {
    async function fetchRecipeData() {
      const res = await axios.get(`/api/recipes/${params.recipeId}`)
      // console.log('recipeInfo',res.data);
      setRecipe(res.data)
    }
    
    async function fetchReviews() {
      const res = await axios.get(`/api/reviews/${params.recipeId}`)
      // console.log('reviews',res.data);
      setReviews(res.data)
    }
    fetchReviews()
    fetchRecipeData()
  }, [params.recipeId])

  // Accept props for userInfo when logged in
  useEffect(() => {
    setLoggedUser(props.userData)
  }, [props.userData])

  // Fetch and set logged user info if available
  useEffect(() => {
    async function fetchLoggedUserInfo() {
      const res = await axios.get('/api/session');
      setLoggedUser(res.data)
    }
    fetchLoggedUserInfo()
  }, [])

  function toggleReviewModal() {
    if (!loggedUser) {
      setModal('reqLogin')
    } else {
      setModal('postReview')
    }
  }

  // Components
  const AddToPlannerButton = () => {
    async function handleAddToPlanner() {
      if(!loggedUser) {
        return setModal('reqLogin')
      } 

      const res = await axios.post(`/api/mealPlan/${params.recipeId}`)

      if (typeof res.data === "object") {
        history.push(`/profile/${loggedUser._id}?display=planner`)
      }

    }

    return (
      <Button.Primary onClick={() => handleAddToPlanner()}>
        Add to Planner
      </Button.Primary>
  )}

  const EditButton = () => (
    <Button.Ghost color={'black'} onClick={() => history.push(`/edit/${params.recipeId}`)}>
      Edit
    </Button.Ghost>
  )

  return(
    <>
    <Page>

      {/* Main info display */}
      <Section first>
        <Container>
          <GridRow colTemplate={"auto 500px"} gap="24px" style={{justifyItems: "center"}}>
            <Image.Recipe src={recipe?.picture?.url} />
            <Col>
              <h1>{recipe?.name}</h1>
              <GridRow>
                  {reviews.length > 0 && (<RatingIndicator rating={reviewAvg}/>)}
                <Chip.EstTime time={recipe?.time} />
              </GridRow>
              <p style={{wordWrap: 'normal'}}>{recipe?.description}</p>
              {recipe?.tags?.length > 0 && (
                <GridRow style={{marginBottom: '1rem', marginTop: -6}} gap={"3px"}>
                  {recipe.tags.map((tag) => (
                    <Chip.Tag text={tag} />
                  ))}
                </GridRow>
              )}
              <GridRow>
                <AddToPlannerButton />
                {loggedUser && recipe.owner === loggedUser?._id && (
                  <EditButton />
                  )}
              </GridRow>

            </Col>
          </GridRow>
        </Container>
      </Section>

      {/* Ingredients */}
      <Section>
        <Container style={{width: '60%'}}>
          <h2 style={{alignSelf: 'flex-start'}}>Ingredients</h2>
          {recipe?.ingredients?.map((ingredient) => (
            <p style={{textAlign: 'center', margin: 0, marginBottom: 12, fontSize: '1.1rem'}}>
              <b style={{color: '#FFB800'}}>{ingredient?.amount}{ingredient?.unit}</b> {ingredient?.name}
            </p>
          ))}

        </Container>
      </Section>

      <Section>
        <Container style={{width: '60%'}}>
          <h2 style={{alignSelf: 'flex-start'}}>Steps</h2>
          <Row style={{flexWrap: 'wrap', paddingBottom: -18, paddingRight: -18}}>

          {recipe?.steps?.map((step, index) => (
            <StepItem 
              index={index}
              step={step}
              style={{marginBottom: 18, marginRight: 18}}
            />
          ))}
          </Row>

        </Container>
      </Section>

      <Section last>
        <Container style={{width: '60%'}}>
          <Row vCenter style={{justifyContent: 'space-between'}}>
            <h2 style={{alignSelf: 'flex-start'}}>Reviews</h2>
            <Button.Ghost color={"black"} onClick={() => toggleReviewModal()}>Post a review</Button.Ghost>
          </Row>
          {reviews.map((review, index, arr) => (
            <ReviewItem
              review={review}
              user={review.user}
              last={index === arr.length - 1}
            />
          ))}

        </Container>
      </Section>


    </Page>
    {modal && (
      <>
      {modal === 'reqLogin' && (
        <LoginRequiredModal closeModal={() => setModal('')} />
      )}

      {modal === 'postReview' && (
        <ReviewInputModal
          recipeId={params.recipeId}
          closeModal={() => setModal('')}
          onSuccesfulPost={(newReview) => {
            setReviews([...reviews, newReview]);
            setModal('')
          }}
        />
      )}
      </>
    )}
    </>
  )
}