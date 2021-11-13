module.exports=(error,req,res,next) => {
    res.status(500).json({
        code:500,
        message: `${error.message}`,
        path: req.path,
        query: req.query
    })
}