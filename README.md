# ILP-Plugin-Human

> Manual settlement for Interledger

## Usage

`ilp-plugin-human` doesn't keep track of a balance or store transfers.
It has a `send` method, which will emit an `outgoing_transfer` event,
and it has a `receiveAmount` method which emits `incoming_transfer`.

If `ilp-plugin-human` is set as the optimistic plugin for `ilp-plugin-virtual`,
then the `send` and `receiveAmount` methods can be used to manually adjust the
trustline's balance.

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
