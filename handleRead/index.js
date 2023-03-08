// third party library
const dynamoose = require('dynamoose');

// create schema
const peopleSchema = new dynamoose.Schema({
  "id": String,
  "name":String,
  "age":Number,
})
                              // table name
const peopleModel = dynamoose.model('peopleTable', peopleSchema);

// where did that statusCode come from
const response = {statusCode: null, body: null};

try{
  let results = await peopleModel.scan().exec();
  consloe.log(results);
  response.body = JSON.stringify(results);
  response.statusCode = 200;
  
}catch(e){
  response.body = JSON.stringify(e.message);
  response.statusCode = 500;
}

exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};

