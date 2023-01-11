const errorHandler = (err) => {
    if (!err.statusCode) {
        err.statusCode = 500
    }
    return err
}
export default errorHandler