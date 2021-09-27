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

const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders : state.leaders

  }
}

class Main extends Component {
  

  

 
  render() {
    const Homepage = () =>{
      return(
        <Home 
              dish={this.props.dishes?.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions?.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders?.filter((leader) => leader.featured)[0]}
          />
      );
    }
    const DishWithID = ({match}) =>{
   
      return(
      <DishDetail dish={ this.props.dishes.filter((dish) =>dish.id=== parseInt(match.params.dishId))[0] }
        comments={this.props?.comments?.filter((comm)=> comm?.dishId === parseInt(match.params.dishId))}
      />
      );

    }

    return (
      <div className="App">
        <Header />
        <Switch>
            <Route path="/home" component={Homepage} />
            <Route exact path= "/menu" component={()=> <Menu dishes={this.props.dishes}/>} />
            <Route path = "/menu/:dishId" component = {DishWithID}/>
            <Route exact path = "/contactus" component = {Contact} />
            <Route exact path = "/aboutus" component={()=> <About leaders= {this.props.leaders}/>} />
            <Redirect to="/home" />
        </Switch>
        
        
        <Footer />
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps)(Main));
