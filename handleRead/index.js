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


  const id = event?.pathParameters?.id

  const response = { statusCode: null, body: null };

  try {
    if (!id) {
      let result = await peopleModel.scan().exec();
      console.log(result);
      response.body = JSON.stringify(result);
      response.statusCode = 200;
    } else {
      let result = await peopleModel.get(id)
      response.body = JSON.stringify(result);
      response.statusCode = 200;


    }
  } catch (e) {
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }

  return response;
};

