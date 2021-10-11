import Menu from './MenuComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect  } from 'react-router-dom';
import Home from './HomeComponent';
import { Component } from 'react';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { addComment,fetchDishes,fetchComments,fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders : state.leaders

  }
}
const mapDispatchToProps = dispatch => ({
 addComment: (dishId,rating,author,comment) =>dispatch(addComment(dishId,rating,author,comment)),
 fetchDishes : () => {dispatch(fetchDishes())},
 resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
 fetchComments : () => {dispatch(fetchComments())},
 fetchPromos : () => {dispatch(fetchPromos())},
 
});



class Main extends Component {
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  
    
    
  
  render() {
    
    const Homepage = () =>{
      return(
        <Home 
              dish={this.props?.dishes?.dishes?.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promosLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }
    const DishWithID = ({match}) =>{
   
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        commentsErrMess={this.props.comments.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        addComment={this.props.addComment}
      />
      );

    }

    return (
      <div className="App">
        <Header />
        <Switch>
            <Route path="/home" component={Homepage} />
            <Route exact path= "/menu" component={()=> <Menu dishes={this.props.dishes}/>} />
            {console.log("In Main ",this.props.dishes)}
            <Route path = "/menu/:dishId" component = {DishWithID}/>
            <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
            <Route exact path = "/aboutus" component={()=> <About leaders= {this.props.leaders}/>} />
            <Redirect to="/home" />
        </Switch>
        
        
        <Footer />
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
