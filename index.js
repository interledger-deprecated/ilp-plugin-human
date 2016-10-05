'use strict'
const EventEmitter = require('events')

class PluginHuman extends EventEmitter {
  constructor (opts) {
    super()

    this._connected = false

    // TODO: does the plugin need to keep a balance?
    // this._store = opts._store

    this._account = opts.account
    this._prefix = opts.prefix
    this._info = opts.info
  }

  connect () {
    this._connected = true
    return Promise.resolve(null)
    // TODO: does the plugin need to keep a balance?
    /*
    return this._store.get('balance')
      .then((balance) => {
        if (!balance) return this._store.put('balance', '0')
        return Promise.resolve(null)
      })
      .then(() => {
        this._connected = true
      })
    */
  }

  disconnect () {
    this._connected = false
    return Promise.resolve(null)
  }

  isConnected () {
    return this._connected
  }

  getInfo () {
    return Promise.resolve(this._info)    
  }

  getPrefix () {
    return Promise.resolve(this._prefix)
  }

  getAccount () {
    return Promise.resolve(this._prefix + this._account)
  }

  getBalance () {
    return Promise.resolve('0')
    // TODO: does the plugin need to keep a balance?
    /*if (!this._connected) return Promise.reject(Error('plugin not connected'))
    return this._store.get('balance')*/
  }

  send (transfer) {
    this.emit('outgoing_transfer', transfer)
    return Promise.resolve(null)
    // TODO: does the plugin need to keep a balance?
    /*
    if (!transfer.amount) {
      return Promise.reject('transfer missing amount')
    } else if (typeof (+transfer.amount) !== 'number' || +transfer.amount <= 0) {
      return Promise.reject('invalid transfer amount')
    }

    return this.getBalance()
      .then((balance) => {
        return this._store.put('balance', (+balance + transfer.amount) + '')
      })
      .then(() => {
        this.emit('outgoing_transfer', transfer)
      })
    */
  }

  // special method to simulate incoming funds
  receive (transfer) {
    this.emit('incoming_transfer', transfer)
    return Promise.resolve(null)
  }
}

module.exports = PluginHuman
