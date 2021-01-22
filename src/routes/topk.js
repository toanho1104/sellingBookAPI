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
router.post("/sanphamtopk", (req, res) => {
  console.log(req.body);
  const { id } = req.body
  knex.from("chiTietTopk").distinct('idsanpham', 'giaban', 'tensanpham', 'mota', 'image', 'sanPham.id').innerJoin("sanPham", 'sanPham.id', 'chiTietTopk.idsanpham').then((result) => {
    console.log(result)
    res.json({ success: true, data: result })
  })
})


// router.post("/topkkhuyendung", (req, res) => {
//   const { id } = req.body
//   console.log(id)
//   knex.from("chiTietTopk").select().where({ idsanpham: id }).then((result) => {
//     const max = 0
//     const id = result[0].idtopk
//     console.log(id)
//     const a = result.length
//     for (const i = 0; i < a; i++) {
//       const b = result[i].idtopk
//       console.log('aaaaaaa', b)
//       knex("chiTietTopk").select().where({ idtopk: b }).then((resulttop) => {
//         const c = resulttop.length
//         console.log(c)
//         if (c >>> max) {

//           console.log('aaa', resulttop.length)
//           let max1 = c
//           console.log('max', max1)
//           let id1 = b
//           console.log(id1)
//           return id1
//         }
//       })
//       knex.from("chiTietTopK").select().innerJoin("sanPham", 'sanPham.id', 'chiTietTopk.idsanpham').where({ idtopk: id1 }).then((resulttopk) => {
//         res.json({ success: true, data: resulttopk })
//       })
//     }

//   })
// })




module.exports = router