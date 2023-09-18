import '../../types'

export default class TypeAttribute implements AttributeParser {
    isAttribute(attribute: string): boolean {
        return this.attributes().includes(attribute)
    }
    stringToAttribute(attr: string): Attribute {
        return { type: attr }
    }
    attributes() {
        return [
            'checkbox',
            'checkboxes',
            'datapicker',
            'file',
            'input',
            'radio',
            'select',
            'tags',
            'textarea',
            'timepicker',
        ]
    }
}
