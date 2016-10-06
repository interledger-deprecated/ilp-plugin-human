# ILP-Plugin-Human

> Manual settlement for Interledger

## Usage

`ilp-plugin-human` doesn't keep track of a balance or store transfers.
It has a `send` method, which will emit an `outgoing_transfer` event,
and it has a `receiveAmount` method which emits `incoming_transfer`.

If `ilp-plugin-human` is set as the optimistic plugin for `ilp-plugin-virtual`,
then the `send` and `receiveAmount` methods can be used to manually adjust the
trustline's balance.

For example, if someone is the 'nerd' on a trustline, and the 'noob' wishes to
raise their balance using cash, then they can use `ilp-plugin-human` to
manually adjust the balance.  The noob gives the nerd some cash, and the nerd
uses some UI wrapped around `ilp-plugin-human` to emit `incoming_transfer` for
the amount of cash received. This will then update the trustline balance.

To instantiate an instance of `ilp-plugin-human`:

```js
PluginHuman = require('ilp-plugin-human')

const plugin = new PluginHuman({
  account: 'test',
  prefix: 'human.',
  info: {
    currencyCode: 'USD',
    currencySymbol: '$',
    precision: '15',
    scale: '2',
    connectors: []
  }
})
```
