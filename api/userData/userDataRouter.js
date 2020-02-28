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
    if (!req.body || !req.body.important || !req.body.id) {
        res.status(400).json({ message: "Please make sure to fill out all mandatory fields." });
    } else {

    const insertValue = {
        user_id: req.params.id,
        important: req.body.important === true ? 1 : 0,
        comment: req.body.comment || null,
        value_id: req.body.id
    }

    UserData.addUserValues(insertValue)
        .then(value => {
            res.status(201).json({...insertValue})
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


router.get('/:id/projects', (req, res) => {
    const { id } = req.params;
    UserData.getUserProjects(id)
        .then(list => {
            const convertedList = list.map(item => {
                if (item.completed === 1) {
                    return { ...item, completed: true }
                } else {
                    return { ...item, completed: false }
                }
            })
            res.status(201).json(convertedList);
        })
        .catch(err => {
            res.status(500).json({ error: `Error attempting to get projects: ${err.message}` })
        })
})

module.exports = router;