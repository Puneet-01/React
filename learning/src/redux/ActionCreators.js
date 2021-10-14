import * as ActionTypes from './ActionTypes';

import { baseUrl } from '../shared/baseUrl';


export const fetchDishes = () => (dispatch) => {
    
    dispatch(dishesLoading(true));

    return fetch(baseUrl + "dishes")
    .then(response=>{
        if(response.ok){
            return response
        }
        else
        {
            var error = new Error("Error "+ response.status, + " : ",+response.text);
            error.response=response;
            throw error;
        }
    },
    error =>{
        var errmess=new Error (error.message)
        throw errmess
    }
    )
    .then(response=>response.json())
    .then(dishes =>dispatch(addDishes(dishes)))
    .catch(error =>dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({

    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const addComment = (comment) =>({
    type:ActionTypes.ADD_COMMENT,
    payload:{
        comment:comment
    }


})

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    fetch(baseUrl + "comments" , {
        method:'POST',
        body: JSON.stringify(newComment),
        headers:{
            "Content-type":"application/json"
        },
        credentials : 'same-origin'
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(data => dispatch(addComment(data)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
}

export const fetchComments = () => (dispatch) =>{
    return fetch(baseUrl+"comments")
    .then(response=>{
        if(response.ok){
            return response
        }
        else
        {
            var error = new Error("Error "+ response.status, + " : ",+response.text);
            error.response=response;
            throw error;
        }
    },
    error =>{
        var errmess=new Error (error.message)
        throw errmess
    }
    )
    .then(response=>response.json())
    .then(data=>dispatch(addComments(data)))
    .catch(error =>dispatch(commentsFailed(error.message)))
}

export const addComments= (comments) =>({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
})

export const commentsFailed = (errmess) =>({
    type:ActionTypes.COMMENTS_FAILED,
    payload:errmess
})

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading());
     return fetch(baseUrl+"promotions")
     .then(response=>{
        if(response.ok){
            return response
        }
        else
        {
            var error = new Error("Error "+ response.status, + " : ",+response.text);
            error.response=response;
            throw error;
        }
    },
    error =>{
        var errmess=new Error (error.message)
        throw errmess
    }
    )
     .then(response=>response.json())
     .then(data=>dispatch(addPromos(data)))
     .catch(error =>dispatch(promosFailed(error.message)))
}

export const promosLoading = () =>({
    type:ActionTypes.PROMOS_LOADING
    
})

export const addPromos = (promos) => ({
    type:ActionTypes.ADD_PROMOS,
    payload:promos
})

export const promosFailed = (errmess) => ({
    type:ActionTypes.PROMOS_FAILED,
    payload:errmess
}) 

export const fetchLeaders = () => (dispatch) =>{
    return fetch(baseUrl+"leaders")
    .then(response=>{
        if(response.ok){
            return response
        }
        else
        {
            var error = new Error("Error "+ response.status, + " : ",+response.text);
            error.response=response;
            throw error;
        }
    },
    error =>{
        var errmess=new Error (error.message)
        throw errmess
    }
    )
    .then(response=>response.json())
    .then(data=>dispatch(addLeaders(data)))
    .catch(error =>dispatch(leadersFailed(error.message)))
}

export const addLeaders = (data) =>({
    type:ActionTypes.ADD_LEADERS,
    payload : data
})

export const leadersFailed = (errmess) => ({
    type:ActionTypes.LEADERS_FAILED,
    payload:errmess
})

export const postFeedback = (firstname,lastname,telnum,email,agree,contactType,message) => (dispatch) => {

    const feedback ={
        firstname:firstname,
        lastname:lastname,
        telnum:telnum,
        email:email,
        agree:agree,
        contactType:contactType,
        message:message,
        
    }
    
        
    fetch(baseUrl +"feedback" , {
        method:'POST',
        body: JSON.stringify(feedback),
        headers:{
            "Content-type":"application/json"
        },
        credentials : 'same-origin'
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    
    .then(response => response.json())
    
    .then(data =>alert("Thanks you for you feedback! "+JSON.stringify(data)))
    
    .catch(error =>  { console.log('post feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
    
}

