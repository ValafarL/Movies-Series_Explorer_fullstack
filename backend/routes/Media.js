const express = require ('express')
const router = express.Router()
const { 
    getAllMedia,
    addMedia,
    removeMedia,
    updateMedia,
    getOne
} = require('../controllers/Media')

router.route('/').get(getAllMedia).post(addMedia)
router.route('/:id').delete(removeMedia).patch(updateMedia).get(getOne)

module.exports = router