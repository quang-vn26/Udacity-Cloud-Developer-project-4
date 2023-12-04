import { uuid } from 'uuidv4';

import { TodosAccess } from '../dataLayer/todosAccess.mjs';
import { createLogger } from '../utils/logger.mjs';
import { commonAttachmentUtil } from '../fileStorage/attachmentUtils.mjs';


const loggerApp = createLogger('File todos.mjs');
const todosAccess = new TodosAccess();
const attachmentUtil = new commonAttachmentUtil();

// get all items for user
export async function getTodos(userId) {

    loggerApp.info('Todos: Get todo');

    return todosAccess.getTodos(userId);
}

// create new item 
export async function createTodo(newTodo, userId) {

    loggerApp.info('Todos: Create todo');

    // create uuid
    const todoId = uuid();

    const createdAt = new Date().toISOString();

    // new item
    const newItem = {
        todoId,
        userId,
        attachmentUrl: null,
        createdAt: createdAt,
        done: false,
        ...newTodo
    };

    // wait for create new todo
    return await todosAccess.createTodo(newItem);
}

// update item todo
export async function updateTodo(userId, todoId, todoUpdate) {

    loggerApp.info('Todos: updateTodo');

    return await todosAccess.updateTodo(userId, todoId, todoUpdate);
}

//delete item todo
export async function deleteTodo(todoId, userId) {

    loggerApp.info('Todos: deleteTodo');

    return await todosAccess.deleteTodo(todoId, userId);
}

//create upload url for todo item
export async function createAttachmentPresignedUrl(todoId, userId) {

    loggerApp.info('Todos: createAttachmentPresignedUrl');

    const attachmentImageUrl = await attachmentUtil.createAttachmentUrl(todoId);

    // create update item todo
    await todosAccess.updateTodoAttachmentUrl(todoId,userId,attachmentImageUrl)

    return await attachmentUtil.createUploadUrl(todoId);
}
