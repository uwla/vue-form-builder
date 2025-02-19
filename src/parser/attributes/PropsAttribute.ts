import { castValue } from "../../helpers"
import type { Attribute, AttributeParser } from "../../types"

export default class HtmlAttribute implements AttributeParser {
    isAttribute(attribute: string): boolean {
        return attribute.includes("=")
    }

    stringToAttribute(attr: string): Attribute {
        const key: string = attr.split("=")[0]
        let value: any = attr.split("=")[1]

        // cast value if needed
        value = castValue(value)

        return { props: { [key]: value } }
    }
}
