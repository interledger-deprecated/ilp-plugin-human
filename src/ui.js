const express = require('express')
const bodyParser = require('body-parser')

module.exports = class UI {
  constructor ({ plugin, port }) {
    this._plugin = plugin
    this._port = port  

    this._app = express()
    this._app.use(bodyParser.urlencoded({ extended: true }))
  }

  _getHomepage (content) {
    return `
<html>
<head>
  <meta charset="utf-8" />
  <title>Settlement</title>
  <style>
#content {
  width: 33em;
  margin: auto;
}
  </style>
</head>
<body>
  <div id="content">
    <h1><a style="color:black;" href="/">Settlement Page</a></h1>
    <hr />
    <br />
    <form action="/" method="post">
      <label>Amount <input type="number" name="amount" /></label><br>
      <label>Memo <input type="text" name="memo" /></label><br>
      <input type="submit" />
    </form>
    <br />
    ${content || ''}
  </div>
</body>
</html>
`
  }

  connect () {
    this._app.get('/', (req, res) => {
      console.log('user requested "/"')
      res.send(this._getHomepage())
    })

    this._app.post('/', (req, res) => {
      const amount = +req.body.amount
      const memo = req.body.memo.replace(/[^A-Za-z0-9 ]/g, '')

      if (isNaN(amount) || amount <= 0) {
        console.log('received invalid value ' + amount)
        res.status(422).send('Invalid "amount": ' + amount)
        return
      }

      console.log('got settlement for ' + amount + ' (with memo "' + memo + '")')
      this._plugin.receiveAmount(amount, memo || '')
      res.send(this._getHomepage('<p style="color:green;">Sent settlement of ' + amount
        + ' (with memo "' + memo + '")</p>'))
    })

    return new Promise((resolve) => {
      this._app.listen(this._port, () => {
        console.log('Example app listening on port ' + this._port)
        resolve()
      })
    })
  }
}
