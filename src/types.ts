// TYPE DEFINITIONS

export type VueComponent = string
export type VueComponentProps = { [key: string]: any }

export type FieldValue = any
export type FieldType = string
export type FieldName = string
export type Field = {
    [index: string]: any
    component: VueComponent
    componentFeedback: VueComponent
    componentWrapper: VueComponent
    label?: string
    model?: boolean
    name?: FieldName
    props: VueComponentProps
    propsWrapper: VueComponentProps
    type: FieldType
    value?: FieldValue
    values?: boolean
    wrapper?: VueComponent
}

export type FieldDescription = Field | string | any
export type FieldAlias = FieldDescription
export type FieldAliases = { [key: string]: FieldAlias }

export type Attribute = { [key: string]: any }
export interface AttributeParser {
    isAttribute(str: string): boolean
    stringToAttribute(str: string): Attribute
}

export type Data = { [key: FieldName]: FieldValue }
export type Model = { [key: FieldName]: FieldValue }

export type ComponentProvider = { [key: FieldType]: VueComponent }
export type ProviderName = string
export type Providers = { [key: ProviderName]: ComponentProvider }

export type ParserOptions = {
    attachRandomId?: boolean
    provider: ProviderName
    wrapper?: VueComponent
}
