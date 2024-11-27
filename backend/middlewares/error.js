import multer from 'multer';
import { UniqueConstraintError, BaseError, ValidationError } from 'sequelize';
import ApiError from '../utils/handler/ApiError.handler.js';
// import config from '../config/config';
// import httpStatus from 'http-status';
// import logger from '../config/logger';

const errorConverter = (err, req, res, next) => {
  let error = err;

  if (error instanceof multer.MulterError) {
    // Handle Multer errors
    error = new ApiError(
      httpStatus.BAD_REQUEST,
      error.message,
      error,
      true,
      err.stack
    );
  } else if (
    error instanceof ValidationError ||
    error instanceof UniqueConstraintError
  ) {
    // Handle Sequelize validation and unique constraint errors
    const messages = error.errors.map((e) => e.message);
    error = new ApiError(
      httpStatus.BAD_REQUEST,
      messages.join(', '),
      messages,
      true,
      err.stack
    );
  } else if (!(error instanceof ApiError)) {
    // Handle other errors
    const statusCode =
      error.statusCode || error instanceof BaseError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, error, false, err.stack);
  }

  next(error);
};

// const errorHandler = (err, req, res, next) => {
//   let { statusCode, message } = err;

//   if (config.env === 'production' && !err.isOperational) {
//     statusCode = httpStatus.INTERNAL_SERVER_ERROR;
//     message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
//   }

//   res.locals.errorMessage = err.message;

//   const response = {
//     code: statusCode,
//     message,
//     ...(config.env === 'development' && { stack: err.stack }),
//   };

//   if (config.env === 'development') {
//     logger.error(err);
//   }

//   res.status(statusCode).send(response); // Ensure the response is sent
// };
const errorHandler = (err, req, res, next) => {
    // Destructure the statusCode and message from the error object
    let { statusCode, message } = err;
  
    // If the statusCode is not set, default to INTERNAL_SERVER_ERROR (500)
    if (!statusCode) {
      statusCode = 500; // Fallback to internal server error if no status code is provided
    }
  
    // Create a response object
    const response = {
      code: statusCode,
      message: message || 'An error occurred', // Provide a default message if none is set
    };
  
    // If the error contains a stack trace, add it to the response (for debugging purposes)
    // if (err.stack) {
    //   response.stack = err.stack;
    // }
  
    // Log the error if needed (can be removed if logging isn't necessary)
    console.error(err);
  
    // Send the response to the client with the status code and the response object
    res.status(statusCode).send(response);
  };
  
  
export { errorConverter, errorHandler };
