const cds = require("@sap/cds")

// install OData v2 adapter
const proxy = require('@sap/cds-odata-v2-adapter-proxy')
const proxyOpts = global.it ? { target:'auto' } : {} // for tests, set 'auto' to detect port dynamically
cds.on('bootstrap', app => app.use(proxy(proxyOpts)))

// activate launchpad plugin
if (process.env.NODE_ENV !== 'production') {
    const {cds_launchpad_plugin} = require('cds-launchpad-plugin');

    // Enable launchpad plugin
    cds.once('bootstrap',(app)=>{
        const handler = new cds_launchpad_plugin();
        app.use(handler.setup({theme:'sap_horizon', version: '1.105.1'}));
    });
}

module.exports = require('@capire/bookstore/server.js')