import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';

import { createLogger } from '../../utils/logger.mjs';
import { createTodo } from '../../businessLogic/todos.mjs';
import { getUserId } from '../utils.mjs';

const logger = createLogger('Todos logger createTodos');

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {

    logger.info('create new todo');

    // get json data
    const newTodo = JSON.parse(event.body)

    // TODO: Implement creating a new TODO item
    // Write your logic here
    
    const userId = getUserId(event);
    const newIitem = await createTodo(newTodo, userId);

    return {
      statusCode: 200,
      body: JSON.stringify({ item: newIitem })
    };
  });

