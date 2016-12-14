# ILP-Plugin-Human

> Manual settlement for Interledger

## Usage

`ilp-plugin-human` doesn't keep track of a balance or store transfers.
It has a `send` method, which will emit an `outgoing_transfer` event,
and it has a `receiveAmount` method which emits `incoming_transfer`.

The plugin can be used in this way to test out any component which listens on
incoming transfers, and can be used as a settlement mechanism in cases where an
API doesn't exist. For example, you could manually use an instance of plugin human to emit
`incoming_transfer` whenever someone gives you cash. To make this easier, plugin human
provides a web interface for creating incoming transfers. The UI is enabled if
the `port` variable is set in the config.

To instantiate an instance of `ilp-plugin-human`:

```js
PluginHuman = require('ilp-plugin-human')

const plugin = new PluginHuman({
  account: 'test',
  prefix: 'human.',
  port: '3005', // optional, starts web interface if provided
  info: {
    currencyCode: 'USD',
    currencySymbol: '$',
    precision: '15',
    scale: '2',
    connectors: []
  }
})
```
