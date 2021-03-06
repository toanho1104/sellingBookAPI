const router = require('express').Router()
const { when } = require('joi');
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
    const a = result
    if (a.length === 0) {
      knex("hoaDon").insert({ id: 1, diachi: '203/18/23 Truong Chinh', idtaikhoan: '1', tongtien: '250000' }).then((result) => { })
      knex("chiTietHoaDon").insert({ idsanpham: id, soluong: '1', idhoadon: '1', dongia: giaban, thanhtien: giaban }).then((result) => { })
      knex("gioHang").insert({ idsanpham: id, tensanpham: tensanpham, giaban: giaban, imageurl: imageurl, soluong: soluong, thanhtien: giaban }).then((result) => {
        res.json({ id: result[0], success: true, message: 'thêm thành công' })
      })
    }
    else {
      knex("gioHang").select({ soluong }).where({ idsanpham: id }).then((result) => { })
      const so = result[0].soluong + 1
      knex("gioHang").update({ soluong: so, }).where({ idsanpham: id }).then((reasult) => {
        res.json({ success: true, message: 'Cập nhật thành công' })
        knex("gioHang").select().where({ idsanpham: id }).then((result) => {
          const a = result[0].giaban
          const b = result[0].soluong
          const c = a * b
          knex("gioHang").update({ thanhtien: c }).then((reasult) => { })
        })
      })
      knex("chiTietHoaDon").update({ soluong: so, }).where({ idsanpham: id, idhoadon: '1' }).then((reasult) => {
        knex("chiTietHoaDon").select().where({ idsanpham: id, idhoadon: '1' }).then((resultc) => {
          const dongiac = resultc[0].dongia
          const soluongc = resultc[0].soluong
          const tien = dongiac * soluongc
          knex("chiTietHoaDon").update({ thanhtien: tien }).then((result) => { })
        })
      })
    }
  })
})




router.post("/tangsoluong", (req, res) => {
  console.log(req.body);
  const { id } = req.body
  knex.from("gioHang").select().where({ idsanpham: id }).then((result) => {
    const a = result[0].soluong
    const b = a + 1
    knex.from("gioHang").update({ soluong: b }).where({ idsanpham: id }).then((result) => {
      knex("gioHang").select().where({ idsanpham: id }).then((result) => {
        const a = result[0].giaban
        const b = result[0].soluong
        const c = a * b
        knex("gioHang").update({ thanhtien: c }).then((reasult) => { })
      })
    })
    knex("chiTietHoaDon").update({ soluong: b, }).where({ idsanpham: id, idhoadon: '1' }).then((reasult) => {
      knex("chiTietHoaDon").select().where({ idsanpham: id, idhoadon: '1' }).then((resultc) => {
        const dongiac = resultc[0].dongia
        const soluongc = resultc[0].soluong
        const tien = dongiac * soluongc
        knex("chiTietHoaDon").update({ thanhtien: tien }).then((result) => {
          res.json({ success: true, message: 'Cập nhật thành công' })
        })
      })
    })

  })
})
router.post("/giamsoluong", (req, res) => {
  console.log(req.body);
  const { id } = req.body
  knex.from("gioHang").select().where({ idsanpham: id }).then((result) => {
    if (result[0].soluong === 1) {
      res.json({ success: true, message: 'Cập nhật thành công' })
    }
    else {

      const a = result[0].soluong
      const b = a - 1
      knex.from("gioHang").update({ soluong: b }).where({ idsanpham: id }).then((result) => {
        knex("gioHang").select().where({ idsanpham: id }).then((result) => {
          const a = result[0].giaban
          const b = result[0].soluong
          const c = a * b
          knex("gioHang").update({ thanhtien: c }).then((reasult) => { })
        })
      })

      knex("chiTietHoaDon").update({ soluong: b, }).where({ idsanpham: id, idhoadon: '1' }).then((reasult) => {
        knex("chiTietHoaDon").select().where({ idsanpham: id, idhoadon: '1' }).then((resultc) => {
          const dongiac = resultc[0].dongia
          const soluongc = resultc[0].soluong
          const tien = dongiac * soluongc
          knex("chiTietHoaDon").update({ thanhtien: tien }).then((result) => {
            res.json({ success: true, message: 'Cập nhật thành công' })
          })
        })
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
    knex.from("hoaDon").del().where({ id: 1 }).then((result) => { })
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
