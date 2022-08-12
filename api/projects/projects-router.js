// Write your "projects" router here!
const express = require("express");
const project_model = require("./projects-model")
const project_middleWare = require("./projects-middleware")

const router = express.Router()

router.get("/", (req, res) => {
    //console.log("GET /api/projects")

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


router.get("/:id", (req, res) => {
    //Returns a project with the given id as the body of the response.
    //If there is no project with the given id it responds with a status code 404.

    //   console.log("GET api/projects/:id")
    //console.log(req.params.id, " <----")

    project_model.get(req.params.id)
        .then(result => {
            if (result) {
                // console.log(result, " <------")
                res.status(200).json(result)
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
})

router.post("/", (req, res) => {
    //  console.log("POST /api/projects ")
    // console.log(req.body, " <----")

    if (!req.body || !req.body.name || !req.body.description) {
        res.status(400).json({
            message: "Body DOES NOT meet requirements."
        })
    } else {
        //  console.log(req.body)
        const bod = {
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed == "true" ? true : false
        }

        project_model.insert(bod)
            .then(result => {
                // console.log(result)
                res.status(201).json(result)

                /* res.status(201).send({
                     name: result.name,
                     description: result.description,
                     completed: result.completed,
                 }) */
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
    //  console.log("PUT /api/projects/:id ")


})

router.delete("/:id", (req, res) => {
    //Returns no response body.
    //If there is no project with the given id it responds with a status code 404.

    //  console.log("DELETE /api/projects/:id")

    if (!req.params || !req.params.id) {
        res.status(404).json({
            message: "Params DO NOT meet requirements."
        })
    } else {

        project_model.getProjectActions(req.params.id)
            .then(result => {
                console.log(result, " <-----")
            })
            .catch(err => {
                res.status(404).json({
                    message: `CANNOT find project with id: ${req.params.id}`,
                    error: err.message,
                    //  stack: err.stack,
                })
            })

        /*
        
                project_model.remove(req.params.id)
                    .then(result => {
                        console.log(result, " <-----")
                    })
                    .catch(err => {
                        res.status(404).json({
                            message: `CANNOT find project with id: ${req.params.id}`,
                            error: err.message,
                            //  stack: err.stack,
                        })
                    })
        */
    }
})

router.get("/:id/actions", (req, res) => {
    console.log("GET /api/projects/:id/actions works")
})

module.exports = router