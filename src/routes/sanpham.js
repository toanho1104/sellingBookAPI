const router = require('express').Router()
const knex = require('../../controllers/connect')





router.post("/", (req, res) => {
  console.log(req.body);
  const { id } = req.body
  knex.from("tacGia").select().innerJoin("sanPham", 'sanPham.idtacgia', 'tacGia.id').then((result) => {
    console.log(result)
    res.json({ success: true, data: result })
  })
})
// router.post("/", (req, res) => { //them tai khoan
//   const { tenDangNhap, matKhau } = req.body
//   console.log(req.body)
//   knex("sanPham").insert({ tendangnhap, matkhau }).then((result) => {
//     console.log(result)
//     res.json({ result })
//   })
// })
router.post('/chitietsanpham', (req, res) => {
  const { id } = req.body
  knex.from("sanPham").select().where({ id: id }).then((result) => {
    res.json({ success: true, data: result })
  })
})
router.post('/themsanpham', (req, res) => {
  const { tensanpham, giaban, idtacgia, idtheloai, mota, image } = req.body
  knex.from("sanPham").insert({ tensanpham: tensanpham, giaban: giaban, idtacgia: idtacgia, idtheloai: idtheloai, mota: mota, image: image }).then((result) => {
    res.json({ success: true, message: 'Thêm thành công' })
  })
})
router.post('/capnhatsanpham', (req, res) => {
  const { id, tensanpham, giaban, idtacgia, idtheloai, mota, image } = req.body
  knex.from("sanPham").update({ tensanpham: tensanpham, giaban: giaban, idtacgia: idtacgia, idtheloai: idtheloai, mota: mota, image: image }).where({ id: id }).then((result) => {
    res.json({ success: true, message: 'Cập nhật thành công' })
  })
})
router.post('/xoasanpham', (req, res) => {
  const { id } = req.body
  knex.from("sanPham").delete().where({ id: id }).then((result) => {
    res.json({ success: true, message: 'Xóa thành công' })
  })
})





router.post('/ketban', (req, res) => {
  const { id } = req.body
  knex.from("sanPham").select().innerJoin("theLoai", 'sanPham.idtheloai', 'theLoai.id').where('sanPham.id', id).then((result) => {
    res.json({ success: true, data: result })
  })
})
module.exports = router