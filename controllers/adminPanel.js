//1. Total Users Resgistered function
module.exports.totalUsersRegistered = function(){
return "Returns total number of users Resgistered count";
}

//2. Total Agents Resgistered function
module.exports.totalAgentsRegistered = function(){
  return "Returns total number of agents Resgistered count";
}

//3. present users logged in the portal
module.exports.currentUsersLog = function(){
  return "Returns emails of current logged users in the portal";
}

//4. present Agents logged in the portal
module.exports.currentAgentsLog = function(){
  return "Returns emails of current logged agents in the portal";
}

//5. user access management function to manage access controls of all the users registered in the portal
module.exports.userAccessManagement = function(){
  return "Returns all the registered users information in the portal";
}

//6. agent access management function to manage access controls of all the agents registered in the portal
module.exports.agentAccessManagement = function(){
  return "Returns all the registered agents information in the portal";
}

//7. Block user function
//parameter===> 1. email:string;
module.exports.blockUser = function(email){
  return "Returns email of blocked user "+email;
}

//8. unBlock user function
//parameter===> 1. email:string;
module.exports.unBlockUser = function(email){
  return "Returns email of unblocked user "+email;
}

//9. Block Agent function
//parameter===> 1. email:string;
module.exports.blockAgent = function(email){
  return "Returns email of blocked Agent "+email;
}

//10. unBlock Agent function
//parameter===> 1. email:string;
module.exports.unBlockAgent = function(email){
  return "Returns email of unblocked Agent "+email;
}
