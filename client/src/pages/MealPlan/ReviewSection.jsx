import ReviewInput from "../../components/ReviewInput";

export default function ReviewSection(props) {
  return(
    <>
      <ReviewInput
        onSubmitSuccess={() => props.onSubmitSuccess()}
        recipeId={props.recipeId}
      />
    </>
  )
}