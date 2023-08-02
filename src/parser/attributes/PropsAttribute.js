export default class HtmlAttribute {
    static isAttribute(attribute) {
        return attribute.includes('=')
    }

    static stringAttributeToObject(attribute) {
        let key = attribute.split('=')[0]
        let value = attribute.split('=')[1]

        // cast string values to boolean
        if (value === 'true') value = true
        if (value === 'false') value = false

        return {
            props: {
                [key]: value
            }
        }
    }
}
