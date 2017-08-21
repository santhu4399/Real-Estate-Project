//1. Add ad banner to property function
//parameters===>  1. bannerid:integer;
//                2. propertyid:integer;
//                3. bannername:string;
module.exports.adbannerToProperty = function(bannerid, propertyid, bannername, bannerurl){
  return "Returns the banner name which is added to property with propertyid "+propertyid;
}

//2. delete ad banner to propery function
//parameters===>  1. propertyid:integer;
//                2. bannerid:integer;
//                3. bannername:string;
module.exports.deleteBannerFromProperty = function(bannerid, propertyid, bannername, bannerurl){
  return "Returns the banner name which is deleted from property with propertyid "+propertyid;
}

//3. list all banners related to perticular property
//parameters===>  1. propertyid:integer;
module.exports.listAllAdBannersOfProperty = function(propertyid){
  return "Returns all the ad banners related to property of propertyid "+propertyid;
}
