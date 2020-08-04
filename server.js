const express = require("express")

const app = express()

app.use(express.static(path.resolve(__dirname)))

let page = `
`

app.disable('x-powered-by')

app.listen(process.env.PORT || 3000)

app.get("/", (req, res) => {
    const response = page
    res.setHeader('Cache-Control', 'assets, max-age=600000')
    res.send(response)
})


