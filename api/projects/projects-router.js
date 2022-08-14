// Write your "projects" router here!
const express = require("express");
const project_model = require("./projects-model")
const { validateID } = require("./projects-middleware")

const router = express.Router()

router.get("/", (req, res) => {
    //console.log("GET /api/projects")
    //Returns an array of projects as the body of the response.
    //If there are no projects it responds with an empty array.

    project_model.get()
        .then(result => {
            // console.log(result, "*****")
            res.status(200).json(result)
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
    //Returns a project with the given id as the body of the response.
    //If there is no project with the given id it responds with a status code 404.

    //   console.log("GET api/projects/:id")
    //console.log(req.params.id, " <----")

    res.json(req.CURRENT)
})

router.post("/", (req, res) => {
    //Returns the newly created project as the body of the response.
    //If the request body is missing any of the required fields it responds with a status code 400.

    //  console.log("POST /api/projects ")
    // console.log(req.body, " <----")

    if (!req.body || !req.body.name || !req.body.description) {
        res.status(400).json({
            message: "Body DOES NOT meet requirements."
        })
    } else {
        //  console.log(req.body)
        project_model.insert(req.body)
            .then(result => {
                //console.log(result)
                // res.status(201).json(result)

                res.status(201).send({
                    name: result.name,
                    description: result.description,
                    completed: result.completed,
                })

            })
            .catch(err => {
                res.status(400).json({
                    message: "Something did not go right",
                    error: err.message,
                    //  stack: err.stack,
                })
            })
    }

})

router.put("/:id", (req, res) => {
    //Returns the updated project as the body of the response.
    //if there is no project with the given id it responds with a status code 404.
    //If the request body is missing any of the required fields it responds with a status code 400.

    //  console.log("PUT /api/projects/:id ")
    if (!req.params || !req.params.id || !req.body) {
        res.status(400).json({
            message: "Params or Body DO NOT meet requirements."
        })
    } else {
        if (req.body.name == null || req.body.name == undefined || req.body.description == null || req.body.description == undefined || req.body.completed == null || req.body.completed == undefined) {
            res.status(400).json({
                message: "Body DOES NOT meet requirements."
            })
        }
        project_model.get(req.params.id)
            .then(result => {
                //console.log(req.body, result, "<-----")
                if (result) {

                    project_model.update(req.params.id, req.body)
                        .then(result => {
                            //  console.log(result, " <-----")
                            res.send(result)
                        })
                        .catch(err => {
                            console.log(err)
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

router.delete("/:id", validateID, async (req, res, next) => {
    //Returns no response body.
    //If there is no project with the given id it responds with a status code 404.

    //  console.log("DELETE /api/projects/:id")
    try {

        await project_model.remove(req.params.id)
        res.status(410).json()
    } catch (err) {
        next(err)
    }
})

router.get("/:id/actions", (req, res) => {
    //Returns an array of actions (could be empty) belonging to a project with the given id.
    //If there is no project with the given id it responds with a status code 404.

    //console.log("GET /api/projects/:id/actions ")

    if (!req.params || !req.params.id) {
        res.status(404).json({
            message: "Params DO NOT meet requirements."
        })
    } else {

        project_model.getProjectActions(req.params.id)
            .then(result => {

                if (result) {
                    //console.log(result, " <----")
                    res.send(result)
                } else {
                    throw Error("")
                }
            })
            .catch(err => {
                res.status(404).json({
                    message: `CANNOT find project with id: ${req.params.id}`,
                    err: err.message,
                })
            })
    }

})

module.exports = router