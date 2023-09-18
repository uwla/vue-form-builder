import '../../types'

export default class BooleanAttribute implements AttributeParser {
    isAttribute(attr: string): boolean {
        return this.attributes().includes(attr)
    }

    stringToAttribute(attr: string): Attribute {
        return { props: { [attr]: true } }
    }

    attributes() {
        return [
            'autofocus',
            'multiple',
            'disabled',
            'hidden',
            'required',
            'readonly',
            'stacked',
            'switches',
        ]
    }
}