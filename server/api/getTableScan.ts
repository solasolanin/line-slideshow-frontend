import { DynamoDB as DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

interface TableSchema {
    Items: [
        {
            id: {
                S: string
            },
            body: object
        }
    ]
}

/**
 * @param {Object} event - AWS Lambda Event
 * @param {Object} event.queryStringParameters - Query String Parameters
 * @param {string} event.queryStringParameters.table - DynamoDB Table Name
 */
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const ddb = new DynamoDBClient({
        region: process.env.ENV_AWS_DEFAULT_REGION,
        credentials: {
            accessKeyId: process.env.ENV_AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.ENV_AWS_SECRET_ACCESS_KEY as string,
        }
    })
    const ddbDocClient = DynamoDBDocument.from(ddb)
    const res = await ddbDocClient.scan({
        TableName: query.table as string,
    })
    return res
})