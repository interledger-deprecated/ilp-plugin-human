'use strict'
const assert = require('chai').assert
const PluginHuman = require('..')

describe('PluginHuman', function () {
  beforeEach(function () {
    this.plugin = new PluginHuman({
      info: { test: 'test' },
      account: 'test',
      prefix: 'test.'
    })
  })

  it('should be a class', function () {
    assert.isFunction(PluginHuman)
  })

  it('should instantiate a plugin', function () {
    assert.isObject(this.plugin)
  })

  it('should connect', function () {
    return this.plugin.connect()
  })

  it('should be connected', function () {
    return this.plugin.connect()
      .then(() => {
        assert.isTrue(this.plugin.isConnected())
      })
  })

  it('should disconnect', function () {
    return this.plugin.disconnect()
      .then(() => {
        assert.isFalse(this.plugin.isConnected())
      })
  })

  it('should getInfo', function () {
    return this.plugin.getInfo()
      .then((info) => {
        assert.deepEqual(info, { test: 'test' })
      })
  })

  it('should getPrefix', function () {
    return this.plugin.getPrefix()
      .then((prefix) => {
        assert.equal(prefix, 'test.')
      })
  })

  it('should getAccount', function () {
    return this.plugin.getAccount()
      .then((account) => {
        assert.equal(account, 'test.test')
      })
  })

  it('should getBalance', function () {
    return this.plugin.getBalance()
      .then((balance) => {
        assert.equal(balance, '0')
      })
  })

  it('should "send" a transfer', function (done) {
    const transfer = {
      account: 'x',
      amount: '10',
      id: 'abc'
    }

    this.plugin.on('outgoing_transfer', (t) => {
      assert.deepEqual(t, transfer)
      done()
    })

    this.plugin.send(transfer)
  })

  it('shouldn\'t send a transfer without amount', function () {
    return this.plugin.send({
      account: 'x',
      id: 'abc'
    })
      .then(() => {
        assert(false)
      })
      .catch((e) => {
        assert.equal(e.name, 'InvalidFieldsError')
      })
  })

  it('shouldn\'t send a transfer with invalid amount', function () {
    return this.plugin.send({
      amount: 'aiaomwdaoida',
      account: 'x',
      id: 'abc'
    })
      .then(() => {
        assert(false)
      })
      .catch((e) => {
        assert.equal(e.name, 'InvalidFieldsError')
      })
  })

  it('shouldn\'t send a transfer without account', function () {
    return this.plugin.send({
      amount: '10',
      id: 'abc'
    })
      .then(() => {
        assert(false)
      })
      .catch((e) => {
        assert.equal(e.name, 'InvalidFieldsError')
      })
  })

  it('shouldn\'t send a transfer without id', function () {
    return this.plugin.send({
      amount: '10',
      account: 'x'
    })
      .then(() => {
        assert(false)
      })
      .catch((e) => {
        assert.equal(e.name, 'InvalidFieldsError')
      })
  })

  it('shouldn\'t send a transfer with execution or expiry', function () {
    return this.plugin.send({
      amount: '10',
      account: 'x',
      id: 'abc',
      executionCondition: 'garbage',
      expiresAt: 'something'
    })
      .then(() => {
        assert(false)
      })
      .catch((e) => {
        assert.equal(e.name, 'InvalidFieldsError')
      })
  })

  it('should "receive" a transfer', function (done) {
    this.plugin.on('incoming_transfer', (t) => {
      assert.equal(t.amount, '10')
      assert.equal(t.account, 'test.test')
      done()
    })

    this.plugin.receiveAmount('10')
  })

  it('shouldn\'t receive an invalid amount', function () {
    return this.plugin.receiveAmount('adawdaw')
      .then(() => {
        assert(false)
      })
      .catch((e) => {
        assert.equal(e.name, 'InvalidFieldsError')
      })
  })

  it('shouldn\'t receive a non-positive amount', function () {
    return this.plugin.receiveAmount('-10')
      .then(() => {
        assert(false)
      })
      .catch((e) => {
        assert.equal(e.name, 'InvalidFieldsError')
      })
  })
})
