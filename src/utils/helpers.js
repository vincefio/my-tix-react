
import axios from 'axios';


const helper = {
  // Returns a promise object we can .then() off inside our Parent component
  getCurrentEvents: function(userID) {
  	console.log()
    return axios.get("/api/currentEvents/" + userID)
  },

    getPastEvents: function(userID) {
    console.log()
    return axios.get("/api/pastEvents/" + userID)
  },
  // getOneEvent: function(id){
  // 	return axios.get("/events/" + id)
  // }

  // getUser: function(){
  // 	return axios.get("/user")
  // }
}
  export default helper;
