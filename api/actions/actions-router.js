// Write your "actions" router here!
const express = require("express")
const action_model = require("./actions-model")
const { validateID, validateBODY } = require("./actions-middleware")

const router = express.Router()

router.get("/", (req, res) => {
    //Returns an array of actions (or an empty array) as the body of the response.

    //console.log("GET /api/actions")

    action_model.get()
        .then(result => {
            console.log(result)
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({
                message: "Something did not go right",
                error: err.message,
                //  stack: err.stack,
            })
        })
})

router.get("/:id", validateID, (req, res) => {
    //Returns an action with the given id as the body of the response.
    //If there is no action with the given id it responds with a status code 404.

    //console.log("GET /api/actions/:id")

    res.json(req.CURRENT)
})

router.post("/", validateBODY, (req, res) => {
    //Returns the newly created action as the body of the response.
    //If the request body is missing any of the required fields it responds with a status code 400.
    //When adding an action make sure the project_id provided belongs to an existing project.

    //console.log("POST /api/actions/")
    //  console.log(req.body)
    action_model.insert(req.body)
        .then(result => {
            console.log(result)
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(400).json({
                message: "Something did not go right",
                error: err.message,
                //  stack: err.stack,
            })
        })
})

router.put("/:id", validateBODY, (req, res) => {
    //Returns the updated action as the body of the response.
    //If there is no action with the given id it responds with a status code 404.
    //If the request body is missing any of the required fields it responds with a status code 400.

    //console.log("PUT /:id")

    if (!req.params || !req.params.id || !req.body) {
        res.status(400).json({
            message: "Params or Body DO NOT meet requirements."
        })
    } else {

        action_model.get(req.params.id)
            .then(result => {
                //console.log(req.body, result, "<-----")
                if (result) {

                    action_model.update(req.params.id, req.body)
                        .then(result => {
                            //  console.log(result, " <-----")
                            res.send(result)
                        })
                        .catch(err => {
                            throw Error(err.message)
                        })
                } else {
                    throw Error(`CANNOT find project with id: ${req.params.id}`)
                }
            })
            .catch(err => {
                res.status(404).json({
                    message: "Something did not go right",
                    error: err.message,
                    //  stack: err.stack,
                })
            })
    }

})

router.delete("/:id", validateID, async (req, res) => {
    //Returns no response body.
    //If there is no action with the given id it responds with a status code 404.

    //console.log("DELETE /:id")
    try {
        await action_model.remove(req.params.id)
        res.send(req.CURRENT)
    } catch (err) {
        next(err)
    }

})

module.exports = router;

