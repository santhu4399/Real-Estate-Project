//1. search property based on location filter
//parameters===>  1. location:string;
module.exports.searchLocation = function(location){
  return "Returns all property details filtered with the given location "+location;
}

//2. search property based on propertytype filter
//parameters===>  1. propertytype:string;
module.exports.searchPropertyType = function(propertytype){
  return "Returns all property details filtered with property type "+propertytype;
}

//3. search property based on propertyvariation filter
//parameters===>  1. propertyvariation:string;
module.exports.searchPropertyVariation = function(propertyvariation){
  return "Returns all property details filtered with property variation "+propertyvariation;
}

//4. search property based on proximity filters
//parameters===>  1. airportdistance:integer;
//                2. ferrydistance:integer;
module.exports.searchProximity = function(airportdistance,ferrydistance){
  return "Returns all the property details filtered with proximities airportdistance: "+airportdistance+" ferrydistance: "+ferrydistance;
}

//4. search property based on budget with minprice and maxprice filters
//parameters===>  1. minprice:integer;
//                2. maxprice:integer;
module.exports.searchBudget = function(minprice, maxprice){
  return "Returns all the property details filterd with Budget min price: "+minprice+" max price: "+maxprice;
}
