import handler from "../dynamodb-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  console.log("event:", event);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    //Must have Key or KeyConditionExpression
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "123",
    },
  };
  //must put an empty object to test

  const result = await dynamoDb.query(params); //(Why query, not get?)
  //   if (!result.Item) {
  //     throw new Error("Item not found.");
  //   }

  // Return the retrieved item
  return result.Items;
});
