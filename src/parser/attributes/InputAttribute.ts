import '../../types'

export default class InputAttribute implements AttributeParser {
    isAttribute(attr: string): boolean {
        return this.attributes().includes(attr)
    }

    stringToAttribute(attr: string): Attribute {
        return { type: 'input', props: { type: attr} }
    }

    attributes() {
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
