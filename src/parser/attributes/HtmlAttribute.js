export default class HtmlAttribute {
    static isAttribute(attribute) {
        return attribute.includes('=')
    }

    static stringAttributeToObject(attribute) {
        const key = attribute.split('=')[0]
        const value = attribute.split('=')[1]
        return { htmlAttributes: { [key]: value } }
    }
}
