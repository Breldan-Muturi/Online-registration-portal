export const errorHandler = (err, req, res, next) => {
     const statusCode = res.statusCode ? res.statusCode : 500
     const message = err.message || 'Something went wrong'
     res.status(statusCode)
     res.json({
         message,
         stack: process.env.NODE_ENV === 'production' ? null : err.stack
     })
}
