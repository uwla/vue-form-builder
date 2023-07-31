export default class TypeAttribute {
    static isAttribute(attribute) {
        return this.attributes().includes(attribute)
    }
    static stringAttributeToObject(attribute) {
        return { type: attribute }
    }
    static attributes() {
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
