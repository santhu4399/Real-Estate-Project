//1. Create Property function only accessed by Agents
//parameters===>  1. propertyname:string;
//                2. propertytype:string;
//                3. propertyvariation:string;
//                4. location:string;
//                5. price:integer;
module.exports.createProperty = function(propertyid, Agentid, propertyname, propertytype, propertyvariation, location, price){
  return "successfully added your property for sale";
}

//2. update property details only accessed by Agents
//parameters===>  1. propertyname:string;
//                2. propertytype:string;
//                3. propertyvariation:string;
//                4. location:string;
//                5. price:integer;
module.exports.updateProperty = function(propertyname, propertytype, propertyvariation, location, price){
  return "successfully updated details of selected property";
}

//3. list all properties of single agent
//parameters===>  1. agentid:integer
module.exports.listAllAgentProperties = function(agentid){
  return "Returns list of all properties created by agent with agentid "+agentid;
}

//4. delete property function
//parameters===>  1. propertyid:interger;
module.exports.deleteProperty = function(propertyid){
  return "deletes the property with propertyid "+propertyid;
}

//
