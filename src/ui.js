const express = require('express')

module.exports = class UI {
  constructor ({ plugin, port }) {
    this._plugin = plugin
    this._port = port  
    this._app = express()
  }

  _getHomepage () {
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
    <h1>Settlement Page</h1>
    <hr />
    <br />
    <p>Hello World!</p>
  </div>
</body>
</html>
`
  }

  connect () {
    this._app.get('/', (req, res) => {
      res.send(this._getHomepage())
    })

    return new Promise((resolve) => {
      this._app.listen(this._port, () => {
        console.log('Example app listening on port ' + this._port)
        resolve()
      })
    })
  }
}
