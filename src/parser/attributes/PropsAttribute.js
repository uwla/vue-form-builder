import { isNumeric } from "../../helpers"

export default class HtmlAttribute {
    static isAttribute(attribute) {
        return attribute.includes('=')
    }

    static stringAttributeToObject(attribute) {
        let key = attribute.split('=')[0]
        let value = attribute.split('=')[1]

        // cast values
        if (value === 'true') value = true
        if (value === 'false') value = false
        if (isNumeric(value)) value = Number(value)

        return {
            props: {
                [key]: value
            }
        }
    }
}
