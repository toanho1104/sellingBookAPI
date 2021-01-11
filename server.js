const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/", (req, res) => { res.json({ id: "1" }) })
const routesTaiKhoan = require('./src/routes/taikhoan')
const routesSanPham = require('./src/routes/sanpham')

app.use("/taikhoan", routesTaiKhoan)
app.use("/sanpham", routesSanPham)



app.listen(port, () => { console.log('RESTful API server started on: ' + port) })

