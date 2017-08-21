//1. add related legal documents to perticular property
//parameters===>  1. propertyid:integer;
//                2. documentid:integer;
//                3. documentname:string;
module.exports.addDocumentToProperty = function(documentid, propertyid, documentname, documenturl){
  return "Returns the name of document added to property with propertyid "+propertyid;
}

//2. delete related legal document to perticular property
//parameters===>  1. propertyid:integer;
//                2. documentid:integer;
//                3. documentname:string;
module.exports.deleteDocumentFromProperty = function(documentid, propertyid, documentname, documenturl){
  return "Returns the name of document added to property with propertyid "+propertyid;
}

//3. list all documents related to perticular property
//parameters===>  1. propertyid:integer;
module.exports.listAllDocumentsOfProperty = function(propertyid){
  return "Returns all the documents related to property of propertyid "+propertyid;
}
