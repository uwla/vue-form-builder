const files = require.context('./attributes', false, /\.js$/i)
const AttributeTypes = files.keys().map(key => files(key).default)

export default AttributeTypes;
