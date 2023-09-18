import { castValue } from "../../helpers"

export default class PropsAttribute implements AttributeParser {
    isAttribute(attr: string): boolean {
        return attr.includes(':')
    }

    stringToAttribute(attr: string): Attribute {
        let key : string = attr.split(':')[0]
        let value : any = attr.split(':')[1]

        // The options attribute has the format 'options:list', where list is a
        // comma-separated values list. So, we remove the  substring  'options:'
        // and convert the string to an array of objects.
        if (key == 'options')
        {
            const options = value.split(',').map((v: string) => ({value: v, text: v}))
            return { props: { options } }
        }

        // cast value if needed
        value = castValue(value)

        return { [key]: value }
    }
}
