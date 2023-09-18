import '../../types'
import { castValue } from "../../helpers"

export default class HtmlAttribute implements AttributeParser {
    isAttribute(attribute: string): boolean {
        return attribute.includes('=')
    }

    stringToAttribute(attr: string): Attribute {
        let key: string = attr.split('=')[0]
        let value: any = attr.split('=')[1]

        // cast value if needed
        value = castValue(value)

        return {
            props: {
                [key]: value
            }
        }
    }
}
