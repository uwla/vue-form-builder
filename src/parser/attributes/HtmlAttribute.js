export default class HtmlAttribute {
    static isAttribute(attribute) {
        return attribute.includes('=')
    }

    static stringAttributeToObject(attribute) {
        const key = attribute.split('=')[0]
        const value = attribute.split('=')[1]

        // cast string values to boolean
        if (value === 'true') value = true
        if (value === 'false') value = false

        return { htmlAttributes: { [key]: value } }
    }
}
