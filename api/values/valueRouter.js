const router = require('express').Router();

const Value = require('../../models/valueModel');


router.get('/', (req, res) => {
    Value.getValues()
        .then(list => {
            res.status(201).json(list);
        })
        .catch(err => {
            res.status(500).json({ error: `Error attempting to get values: ${err.message}` })
        })
})

module.exports = router;