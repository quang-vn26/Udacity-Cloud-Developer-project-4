import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';

import { createAttachmentPresignedUrl } from '../../businessLogic/todos.mjs';
import { createLogger } from '../../utils/logger.mjs';
import { getUserId } from '../utils.mjs';


const logger = createLogger('Todos logger generateUploadUrl');

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    logger.info('generate upload url');
    const todoId = event.pathParameters.todoId;

    const userId = getUserId(event);

    // wait for update data and upload file
    const uploadUrl = await createAttachmentPresignedUrl(todoId,userId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl
      })
    }
  });
