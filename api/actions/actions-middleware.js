// add middlewares here related to actions
const action_model = require("./actions-model")

function validateID(req, res, next) {
    if (!req.params || !req.params.id) {
        next({
            message: "Params DO NOT meet requirements."
        })
    } else {
        action_model.get(req.params.id)
            .then(result => {
                if (!result) {
                    next({
                        status: 404, message: `CANNOT find project with id: ${req.params.id} 
                `})
                    return;
                }

                req.CURRENT = result
                next()
            })
            .catch(err => {
                next(err)
            })
    }
}

function validateBODY(req, res, next) {
    if (!req.body || !req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({
            message: "Body DOES NOT meet requirements."
        })
    } else {
        next()
    }
}

module.exports = {
    validateID,
    validateBODY,
}