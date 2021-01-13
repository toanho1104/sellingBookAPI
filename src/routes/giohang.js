const router = require('express').Router()
const knex = require('../../controllers/connect')


router.post("/", (req, res) => {
  console.log(req.body);
  const { id } = req.body
  knex.from("gioHang").select().then((result) => {
    console.log(result)
    res.json({ success: true, data: result })
  })
})


router.post("/them", (req, res) => {
  console.log(req.body);
  const { id, tensanpham, giaban, imageurl, soluong } = req.body
  knex.from("gioHang").select().where({ idsanpham: id }).then((result) => {

    const a = result
    if (a.length === 0) {
      knex("gioHang").insert({ idsanpham: id, tensanpham: tensanpham, giaban: giaban, imageurl: imageurl, soluong: soluong, }).then((result) => {
        res.json({ id: result[0], success: true, message: 'thêm thành công' })
      })

    }
    else {

      knex("gioHang").update({ soluong: soluong, }).where({ idsanpham: id }).then((reasult) => {
        res.json({ success: true, message: 'Cập nhật thành công' })
      })
    }

  })
})


router.post("/xoa", (req, res) => {
  console.log(req.body);
  const { id } = req.body
  knex.from("gioHang").where({ id: id }).del().then((result) => {
    res.json({ success: true, message: 'xoa thanh cong' })
  })
})

router.post("/thanhtoan", (req, res) => {
  console.log(req.body);
  const { id } = req.body
  knex.from("gioHang").del().then((result) => {
    console.log(result)
    res.json({ success: true, message: 'thanh toan thanh cong' })
  })
})


module.exports = router
