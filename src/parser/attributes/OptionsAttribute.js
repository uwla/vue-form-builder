export default class OptionsAttribute {
    static isAttribute(attribute) {
        return attribute.startsWith('options:')
    }
    static stringAttributeToObject(attribute) {
        // The options attribute has the format 'options:list', where list is a
        // comma-separated values list. So, we remove the  substring  'options:'
        // and convert the string to an array of objects.
        const list = attribute.slice(8).split(',')
        const options = list.map(value => ({ value: value, text: value }))
        return { options }
    }
}
