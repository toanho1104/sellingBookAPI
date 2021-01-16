const router = require('express').Router()
const knex = require('../../controllers/connect')





router.post("/danhsach", (req, res) => {
  console.log(req.body);
  const { id } = req.body
  knex.from("topk").select().then((result) => {
    console.log(result)
    res.json({ success: true, data: result })
  })
})

router.post("/chitiet", (req, res) => {
  console.log(req.body);
  const { id } = req.body
  knex.from("chiTietTopk").select().innerJoin("sanPham", 'sanPham.id', 'chiTietTopk.idsanpham').then((result) => {
    console.log(result)
    res.json({ success: true, data: result })
  })
})

module.exports = router