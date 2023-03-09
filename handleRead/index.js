// third party library
const dynamoose = require('dynamoose');

// create schema
const peopleSchema = new dynamoose.Schema({
  "id": String,
  "name": String,
  "age": Number,
});

const peopleModel = dynamoose.model('peopleTable', peopleSchema);


exports.handler = async (event) => {
  // where did that statusCode come from?

  console.log('path params', event.pathParameters);


  const response = { statusCode: null, body: null };

  console.log('event.body: ', event.body);

  try {
    let results = await peopleModel.scan().exec();
    console.log(results);
    response.body = JSON.stringify(results);
    response.statusCode = 200;

  } catch (e) {
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }

  return response;
};

