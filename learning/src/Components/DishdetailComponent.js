
import React, { Component } from "react"
import {Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem, Row, Label, Modal, ModalBody, Button, ModalHeader} from 'reactstrap';

import { LocalForm, Errors, Control } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish(dish) {
   
    if (dish != null)
        return ( <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
        <Card>
            <CardImg top src={baseUrl + dish.dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </FadeTransform>
        
        );
    else
        return (
            <div></div>
        );
}

function RenderComments({comments, dishId,postComment}) {
    
    
        return(
           <div>
               <h4>Comments</h4>

              
                   <Stagger in>
                   {comments.map((comment) => {
                       return (
                           <Fade in>
                           <li key={comment.id}>
                           <p>{comment.comment}</p>
                           <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                           </li>
                           </Fade>
                       );
                   })}
                   </Stagger>
       
               ))
              
               <CommentForm dishId={dishId} postComment={postComment} />
           </div>
        );
        
        

}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length < len)
const minLength = (len) => (val) => !(val) || (val.length >= len)

class CommentForm extends Component {
    
    constructor(props) {
        super(props)
        this.state = {

            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    Submit Comment
                    
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="Firstname" >Rating</Label>
                            </Row>

                            <Row className="form-group">
                                <Control.select model=".rating" id="rating" name="rating">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4 </option>
                                    <option value="5">5</option>
                                </Control.select>

                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="name" >Your Name</Label>
                            </Row>

                            <Row className="form-group">
                                <Control.text
                                    model=".Name"
                                    id="Name"
                                    name="Name"
                                    placeholder="Your Name"
                                    validators={{
                                        required, minLength: minLength(2), maxLength: maxLength(15)
                                    }}


                                />

                                <Errors
                                    className="text-danger"
                                    model=".Name"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}

                                />

                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" >Comment</Label>
                            </Row>

                            <Row className="form-group">
                                <Control.textarea model=".comment" id="comment" name="comment" rows="6" />
                            </Row>

                            <Row className="form-group">
                                <Button type="submit" color="primary" md={{ size: 10, offset: 2 }}>
                                    Submit
                                </Button>
                            </Row>


                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

    const DishDetail = (props) => {
        if(props.isLoading)
        {
            return(
                <div className ="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if(props.errMess)
        
        {
            return(
                <div className ="container">
                    <div className="row">
                        {props.errMess}
                    </div>
                </div>
            );
        }
        else if(props.dish!=null)
        {

            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
    
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            
                            <RenderDish dish={props.dish} />
                            
                        </div>
                        <div className="col-12 col-md-5">
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
    
                            
    
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            <div></div>
        }
    }



export default DishDetail