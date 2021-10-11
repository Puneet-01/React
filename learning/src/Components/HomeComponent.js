import React from 'react';
import { Card, CardImg, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { dishesFailed } from '../redux/ActionCreators';
function RenderCard({item,isLoading,ErrMess})
{
  if (isLoading)
  {
    return(
      <Loading />
    );
  }
  else if (ErrMess) {
    <h4>{ErrMess}</h4>
  }
  else
  {

    return(
      <Card>
         <CardImg src={ baseUrl + item?.image} alt={item?.name} />
         {console.log("Image ",baseUrl + item?.image)}
              <CardBody>
              <CardTitle>{item?.name}</CardTitle>
              {item?.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
              <CardText>{item?.description}</CardText>
              </CardBody>
      </Card>
    )
  }
}


function Home(props) {
  console.log("In home ",props);
    return(
      <div className="container">
        <div className="row align-items-start">
        <div className="col-12 col-md m-1">
        <RenderCard item={props.promotion} isLoading={props.promoLoading} errMess={props.promoErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>

        </div>
      </div>
    );
}

export default Home;   