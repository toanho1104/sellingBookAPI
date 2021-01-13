const router = require('express').Router()
const knex = require('../../controllers/connect')



router.post("/dangnhap", (req, res) => {
  console.log('body', req.body);
  // const { error } = ojlogin.validate(req.body)

  // if (error) { return res.json({ message: error.details[0].message }) }
  const { tendangnhap, matkhau } = req.body

  knex.from("taiKhoan").where({ tendangnhap }).then((result) => {
    if (result.length === 0) {
      return res.send({ success: false, message: 'Sai tên hoặc mật khẩu' })
    }
    if (result[0].matkhau === matkhau) {

      return res.json({ id: result[0].id, success: true, message: 'đăng nhập thành công' })
    }
    else {
      res.json({ success: false, message: 'Sai tên hoặc mật khẩu' })
    }
  })
})

router.post("/dangky", (req, res) => {
  const { tendangnhap, matkhau, hovaten, email, sodienthoai, diachi } = req.body
  // console.log('qqqqqqqqqqqqqq', req.body)
  knex("taiKhoan").select().where({ tendangnhap: tendangnhap }).then((result) => {
    // console.log("tra ve", result[0].tendangnhap)

    const a = result
    if (a.length != 0) {
      res.json({ success: false, message: "Tên đăng nhập đã có người dùng" })
    }
    else {
      knex("taiKhoan").insert({ tendangnhap: tendangnhap, matkhau: matkhau, hovaten: hovaten, email: email, sodienthoai: sodienthoai, diachi: diachi }).then((result) => {
        res.json({ id: result[0], success: true, message: 'đăng ky thành công' })
      })
    }
  })
})
router.post('/capnhatthongtin', (req, res) => {
  const { tendangnhap, hovaten, email, sodienthoai, diachi, matkhau, } = req.body
  console.log('nhan vao', req.body)
  knex("taiKhoan").select("matkhau").where({ tendangnhap: tendangnhap }).then((result) => {
    const a = result[0].matkhau
    console.log(a)
    console.log(matkhau)
    if (a == matkhau) {


      knex("taiKhoan").update({ hovaten: hovaten, email: email, sodienthoai: sodienthoai, diachi: diachi }).where({ tendangnhap: tendangnhap }).then((reasult) => {
        res.json({ data: { success: true, message: 'Cập nhật thành công' } })
      })

    } else {

      return res.json({ success: false, message: 'Mật khẩu xác nhận không đúng' })
    }


  })

})

router.post("/thongtintaikhoan", (req, res) => {
  console.log(req.body);
  const { tendangnhap } = req.body
  knex.from("taiKhoan").select().where({ tendangnhap: tendangnhap }).then((result) => {
    console.log(result)
    res.json({ id: result[0].id, success: true, data: result })
  })
})






// router.post("/dangky", (req, res) => {

//   const { tendangnhap, matkhau, hovaten, email, sodienthoai } = req.body
//   console.log("body", req.body)
//   knex(`taiKhoan`).select().where({ tendangnhap: tendangnhap }).then((result) => {
//     console.log("tra ve", result)
//     res.json({ id: result[0].id, success: true, data: result, message: 'đăng ky thành công' })

//   })

router.post
module.exports = router