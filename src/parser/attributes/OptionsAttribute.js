export default class PropsAttribute {
    static isAttribute(attribute) {
        return attribute.includes(':')
    }
    static stringAttributeToObject(attribute) {
        let key = attribute.split(':')[0]
        let value = attribute.split(':')[1]

        // The options attribute has the format 'options:list', where list is a
        // comma-separated values list. So, we remove the  substring  'options:'
        // and convert the string to an array of objects.
        if (key == 'options')
        {
            value = value.split(',').map(val => ({ value: val, text: val }))
            return { props: { options: value } }
        }

        return { [key]: value }
    }
}
