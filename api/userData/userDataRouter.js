const router = require('express').Router();

const UserData = require('../../models/userDataModel');


router.get('/:id/values', (req, res) => {
    const { id } = req.params;
    UserData.getUserValues(id)
        .then(list => {
            const convertedList = list.map(item => {
                if (item.important === 1) {
                    return { ...item, important: true }
                } else {
                    return { ...item, important: false }
                }
            })
            res.status(201).json(convertedList);
        })
        .catch(err => {
            res.status(500).json({ error: `Error attempting to get values: ${err.message}` })
        })
})

router.post('/:id/values', (req, res) => {
    if (!req.body || !req.body.value_id) {
        res.status(400).json({ message: "Please make sure to fill out all mandatory fields." });
    } else {

        const insertValue = {
            user_id: req.params.id,
            important: req.body.important === true ? 1 : 0,
            comment: req.body.comment || null,
            value_id: req.body.value_id
        }

        UserData.addUserValue(insertValue)
            .then(value => {
                res.status(201).json({ ...insertValue, important: insertValue.important === 1 ? true : false })
            })
            .catch(err => {
                if (err.message.includes('UNIQUE constraint failed')) {
                    res.status(500).json({ error: `This user has already selected this value. Please use update instead of submit.` })
                } else {
                    res.status(500).json({ error: `Error adding adding User's values: ${err.message}` })
                }
            })
    }
})

router.put('/:id/values', (req, res) => {
    if (!req.body || !req.body.value_id) {
        res.status(400).json({ message: "Please make sure to include all mandatory fields." });
    } else {

        const insertValue = {
            user_id: req.params.id,
            important: req.body.important === true ? 1 : 0,
            comment: req.body.comment || null,
            value_id: req.body.value_id
        }

        UserData.updateUserValue(insertValue, req.params.id, req.body.value_id)
            .then(value => {
                res.status(200).json({ ...insertValue, important: insertValue.important === 1 ? true : false })
            })
            .catch(err => {
                res.status(500).json({ error: `Error adding updating User's values: ${err}` })
            })
    }
})


router.get('/:id/projects', (req, res) => {
    const { id } = req.params

    UserData.getUserProjects(id)
        .then(list => {
            const convertedList = list.map(item => {
                if (item.completed === 1) {
                    return { ...item, completed: true }
                } else {
                    return { ...item, completed: false }
                }
            })
            res.status(200).json(convertedList);
        })
        .catch(err => {
            res.status(500).json({ error: `Error attempting to get projects: ${err.message}` })
        })
})


router.post('/:id/projects', (req, res) => {
    if (!req.body || !req.body.value_id || !req.body.project) {
        res.status(400).json({ message: "Please make sure to fill out all mandatory fields." });
    } else {

        const insertProject = {
            user_id: req.params.id,
            project: req.body.project,
            notes: req.body.notes || null,
            completed: req.body.completed === true ? 1 : 0,
            value_id: req.body.value_id
        }

        UserData.addUserProject(insertProject)
            .then(project => {
                console.log(project)
                res.status(201).json({
                    user_id: project.user_id,
                    project: project.project,
                    notes: project.notes,
                    completed: project.completed === 1 ? true : false,
                    project_id: project.id,
                    value_id: project.value_id
                })
            })
            .catch(err => {
                res.status(500).json({ error: `Error adding adding User's projects: ${err.message}` })
            })
    }
})

router.put('/:id/projects/:project_id', (req, res) => {
    if (!req.body || !req.body.value_id || !req.body.project) {
        res.status(400).json({ message: "Please make sure to fill out all mandatory fields." });
    } else {

        const insertProject = {
            user_id: req.params.id,
            id: req.params.project_id,
            project: req.body.project,
            notes: req.body.notes || null,
            completed: req.body.completed === true ? 1 : 0,
            value_id: req.body.value_id
        }

        UserData.updateUserProject(insertProject, insertProject.id)
            .then(project => {
                res.status(200).json({
                    user_id: Number(insertProject.user_id),
                    project_id: Number(insertProject.id),
                    project: insertProject.project,
                    notes: insertProject.notes,
                    completed: insertProject.completed === 1 ? true : false,
                    value_id: insertProject.value_id,
                    server_response: project
                })
            })
            .catch(err => {
                res.status(500).json({ error: `Error adding updating User's projects: ${err.message}` })
            })
    }
})

router.delete('/projects/:project_id', (req, res) => {
        const {project_id} = req.params
        
        UserData.removeUserProject(project_id)
            .then(project => {
                const deleteStatus = project === 1 ? "Successfully deleted project" : "Failed to delete project"
                res.status(202).json(deleteStatus)
            })
            .catch(err => {
                res.status(500).json({ error: `Error attempting to delete User's projects: ${err.message}` })
            })
    
})

module.exports = router;