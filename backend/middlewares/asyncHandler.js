const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    // If a status code wasn't already set in the controller, default to 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  });
};

export default asyncHandler;