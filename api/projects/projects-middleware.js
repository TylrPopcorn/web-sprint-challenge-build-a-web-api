// add middlewares here related to projects
const project_model = require("./projects-model")

function validateID(req, res, next) {
    if (!req.params || !req.params.id) {
        res.status(404).json({
            message: "Params DO NOT meet requirements."
        })
    } else {
        project_model.get(req.params.id)
            .then(result => {
                if (!result) {
                    res.status(404).json({
                        status: 404, message: `CANNOT find project with id: ${req.params.id}`
                    })
                    return;
                }

                console.log(result)
                req.CURRENT = result
                next()
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = {
    validateID,
}