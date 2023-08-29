import { castValue } from "../../helpers"

export default class HtmlAttribute {
    static isAttribute(attribute) {
        return attribute.includes('=')
    }

    static stringAttributeToObject(attribute) {
        let key = attribute.split('=')[0]
        let value = attribute.split('=')[1]

        // cast value if needed
        value = castValue(value)

        return {
            props: {
                [key]: value
            }
        }
    }
}
