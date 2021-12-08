import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" }); //update region
//name of region must match with region was set in S3, to find exactly endpoint
//of this, go to https://docs.aws.amazon.com/general/latest/gr/rande.html

// const dynamoDb = new AWS.DynamoDB.DocumentClient();
//line tren da duoc thuc hien o ./lins/dynamodb-lib.js

// export async function main(event, context) {
export const main = handler(async (event, context) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  console.log("event.body:", event.body);
  console.log("context:", context);
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      // The attributes of the item to be created
      userId: "123", // The id of the author
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };
  await dynamoDb.put(params); //tra ve handler se duoc json.stringfy

  return params.Item;
}); //INSIDE HANDLER IS A LAMBDA FUNCTION
// Set response headers to enable CORS (Cross-Origin Resource Sharing)
//   const headers = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Credentials": true,
//   };

//   try {
//     await dynamoDb.put(params).promise();

//     return {
//       statusCode: 200,
//       headers: headers,
//       body: JSON.stringify(params.Item),
//     };
//   } catch (e) {
//     return {
//       statusCode: 500,
//       headers: headers,
//       body: JSON.stringify({ error: e.message }),
//     };
//   }
// }
