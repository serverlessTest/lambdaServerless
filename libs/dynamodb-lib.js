import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" }); //update region
//name of region must match with region was set in the table, check table overview,
//to find exactly endpoint
//of this, go to https://docs.aws.amazon.com/general/latest/gr/rande.html
//S3 region must match with table region

const client = new AWS.DynamoDB.DocumentClient();

export default {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};
