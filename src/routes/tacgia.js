const router = require('express').Router()
const knex = require('../../controllers/connect')



router.post("/", (req, res) => {
  console.log(req.body);
  const { id } = req.body
  knex.from("tacGia").select().then((result) => {
    console.log(result)
    res.json({ success: true, data: result })
  })
})

module.exports = router