'use strict'
const validator = require('./src/validator')
new validator(12).is_boolean().or().is_object()
.on(false, () => {
    console.log('yess')
})

module.exports = validator