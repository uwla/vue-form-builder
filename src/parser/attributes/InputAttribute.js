export default class InputAttribute {
    static isAttribute(attribute) {
        return this.attributes().includes(attribute)
    }
    static stringAttributeToObject(attribute) {
        return { type: attribute }
    }
    static attributes() {
        return [
            'color',
            'date',
            'datetime',
            'datetime-local',
            'email',
            'month',
            'number',
            'password',
            'range',
            'tel',
            'text',
            'time',
            'url',
            'week',
        ]
    }
}
