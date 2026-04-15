export const errorMiddleware = (err , req , res , next) => {
    res.status(res.statusCode !== 200 ? res.statusCode : 500).json({
        message: err.message
    }); 
}