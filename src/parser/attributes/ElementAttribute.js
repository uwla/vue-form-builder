export default class TypeAttribute {
    static isAttribute(attribute) {
        return this.attributes().includes(attribute)
    }
    static stringAttributeToObject(attribute) {
        return { element: attribute }
    }
    static attributes() {
        return [
            'checkbox',
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
