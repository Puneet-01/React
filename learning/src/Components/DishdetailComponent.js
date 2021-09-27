
import React, { Component } from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Row, Label, Modal, ModalBody, Button, ModalHeader
} from 'reactstrap';
import Moment from 'moment';
import { LocalForm, Errors, Control } from "react-redux-form";

import { Link } from "react-router-dom";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length > len)
const minLength = (len) => (val) => !(val) || (val.length <= len)

class Dishdetail extends Component {
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

    RenderComments(comments) {
        <h4>Comments</h4>
        return (
            comments.map(comment => (
                <div>
                    <div>

                        <p>{comment?.comment}</p>
                        <p>--{comment?.author},{Moment(comment?.date).format('MM d,YYYY')}</p>
                    </div>
                </div>

            ))

        );

    }
    handleSubmit(values) {
        this.toggleModal();
        console.log("The values are " + JSON.stringify(values));
        alert("The values are " + JSON.stringify(values));
    }

    RenderDish(dish) {

        if (dish != null)
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>


                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>


                    </CardBody>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }

    CommentForm() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    Submit Comment
                    {console.log(this.state.isModalOpen)}
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

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.RenderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5">
                        {this.RenderComments(this.props?.comments)}


                        {this.CommentForm()}

                    </div>
                </div>
            </div>
        );
    }
}


export default Dishdetail