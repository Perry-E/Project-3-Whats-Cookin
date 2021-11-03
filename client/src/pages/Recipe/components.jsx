import styled from "styled-components";
import { Col, GridRow, Row } from "../../components/Containers";
import Image from '../../components/ImageDisplays'
import {format} from 'date-fns';

const StepIndicator = styled(Col)`
  background-color: #FFB800;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  box-sizing: border-box;
  color: white;
`

export const StepItem = (props) => (
  <Row style={{alignItems: 'flex-start'}}>
    <StepIndicator style={{marginRight: 12}}>
      <h3 style={{margin: 0}}>{props?.index + 1}</h3>
    </StepIndicator>
    <p style={{flex: 1, margin: 0}}>{props.step?.body}</p>
  </Row>
)

const RatingIndicator = (props) => (
  <span>
    <i className="fa-solid fa-star" style={{marginRight: '6px', color: '#FFCB14'}} />
    {props.rating}
  </span>
)



const ReviewContainer = styled(Col)``;

const ReviewSeperator = styled.div`
  width: 100%;
  border-top: 1px solid #c4c4c4;
  margin: 18px 0;
`;

export const ReviewItem = (props) => {
  const {user, review} = props;

  return (
    <ReviewContainer>
      <GridRow colTemplate={'auto 1fr'}>
      <Image.Profile src={user?.profileImage?.image} size={'80px'} style={{marginRight: '12px'}} />
      <Col>
        <h3 style={{margin: 0}}>{review?.title} {review.rating && (<>| <RatingIndicator rating={review.rating} /></>)}</h3>
        <p style={{margin: 0, marginTop: '3px', color: '#999999', fontSize: '.8rem'}}>{format(new Date(review.createdAt), 'dd/MM/yy h:mmb')}</p>
        {review.comment && (
          <p style={{marginBottom: 0}}>{review?.comment}</p>
        )}
      </Col>
      </GridRow>
      {!props.last && (<ReviewSeperator />)}
    </ReviewContainer>
  )
}