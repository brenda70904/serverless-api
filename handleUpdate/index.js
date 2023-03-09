const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
  "id": String,
  "name": String,
  "age": Number,
});

const peopleModel = dynamoose.model('peopleTable', peopleSchema);

exports.handler = async (event) => {

  //id = event.pathParameters
  console.log('path params', event.pathParameters);
  // const id = event?.pathParameters?.id

  let parsedBody = JSON.parse(event.body);
  console.log(parsedBody);

  const response = { statusCode: null, body: null };

  try {

    let results = await peopleModel.update(event.pathParameters, parsedBody);
    response.body = JSON.stringify(results);
    response.statusCode = 200;
  } catch (e) {
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }

  return response;
};
