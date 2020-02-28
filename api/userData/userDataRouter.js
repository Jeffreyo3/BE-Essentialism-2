const router = require('express').Router();

const UserData = require('../../models/userDataModel');


router.get('/:id/values', (req, res) => {
    const { id } = req.params;
    UserData.getUserValues(id)
        .then(list => {
            res.status(201).json(list);
        })
        .catch(err => {
            res.status(500).json({ error: `Error attempting to get values: ${err.message}` })
        })
})

router.get('/:id/projects', (req, res) => {
    const { id } = req.params;
    UserData.getUserProjects(id)
        .then(list => {
            res.status(201).json(list);
        })
        .catch(err => {
            res.status(500).json({ error: `Error attempting to get projects: ${err.message}` })
        })
})

module.exports = router;