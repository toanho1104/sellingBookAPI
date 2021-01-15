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
  const { id, tensanpham, giaban, imageurl, soluong, thanhtien } = req.body
  knex.from("gioHang").select().where({ idsanpham: id }).then((result) => {
    const b = 1
    const c = 1
    const a = result
    if (a.length === 0) {
      knex("chiTietHoaDon").insert({ idsanpham: id, soluong: 1, idhoadon: 1, thanhtien: giaban }).then((result) => { console.log('aaaaaaa') })
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



// router.post("/them", (req, res) => {
//   console.log(req.body);
//   const { id, tensanpham, giaban, imageurl, soluong } = req.body
//   knex.from("gioHang").select().where({ idsanpham: id }).then((result) => {

//     const a = result
//     if (a.length === 0) {
//       knex("gioHang").insert({ idsanpham: id, tensanpham: tensanpham, giaban: giaban, imageurl: imageurl, soluong: soluong, }).then((result) => {
//         res.json({ id: result[0], success: true, message: 'thêm thành công' })
//       })


//     }
//     else {

//       knex("gioHang").update({ soluong: soluong, }).where({ idsanpham: id }).then((reasult) => {
//         res.json({ success: true, message: 'Cập nhật thành công' })
//       })
//     }

//   })
// })











router.post("/xoa", (req, res) => {
  console.log(req.body);
  const { id } = req.body
  knex.from('gioHang').where({ idsanpham: id }).del().then((result) => {
    res.json({ success: true, message: 'xoa thanh cong' })
  })
  knex.from("chiTietHoaDon").where({ idsanpham: id, idhoadon: '1' }).del().then((result) => { })
})



// router.post("/xoa", (req, res) => {
//   console.log(req.body);
//   const { id } = req.body
//   knex.from("gioHang").where({ id: id }).del().then((result) => {
//     res.json({ success: true, message: 'xoa thanh cong' })
//   })
// })










router.post("/thanhtoan", (req, res) => {
  console.log(req.body);
  const { id, diachi, tongtien } = req.body //id tai khoan
  knex.from("hoaDon").insert({ diachi: diachi, idtaikhoan: id, tongtien: tongtien }).then((result) => { })
  knex.from('hoaDon').orderBy('id', 'desc').select().then((result) => {
    console.log('sap xeppppppppp', result[0].id)
    a = result[0].id
    knex.from("chiTietHoaDon").update({ idhoadon: a }).where({ idhoadon: 1 }).then((result) => { })
  })
  knex.from("gioHang").del().then((result) => {
    console.log(result)
    res.json({ success: true, message: 'thanh toan thanh cong' })
  })
})




// router.post("/thanhtoan", (req, res) => {
//   console.log(req.body);
//   const { id } = req.body
//   knex.from("gioHang").del().then((result) => {
//     console.log(result)
//     res.json({ success: true, message: 'thanh toan thanh cong' })
//   })
// })


module.exports = router
