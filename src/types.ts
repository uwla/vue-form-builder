// TYPE DEFINITIONS

type VueComponent = string
type VueComponentProps = { [key: string]: any }

type FieldValue = any
type FieldType = string
type FieldName = string
type Field = {
    [index: string]: any,
    component: VueComponent,
    componentFeedback: VueComponent,
    componentWrapper: VueComponent,
    label?: string,
    model?: boolean,
    name?: FieldName,
    props: VueComponentProps,
    propsWrapper: VueComponentProps,
    type: FieldType,
    value?: FieldValue,
    values?: boolean,
    wrapper?: VueComponent
}

type FieldDescription = Field|string|any
type FieldAlias = FieldDescription
type FieldAliases = { [key: string]: FieldAlias }

type Attribute = { [key: string]: any }
interface AttributeParser {
    isAttribute(str: string): boolean
    stringToAttribute(str: string): Attribute
}

type Data = { [key: FieldName]: FieldValue }
type Model = { [key: FieldName]: FieldValue }

type ComponentProvider = { [key: FieldType]: VueComponent }
type ProviderName = string
type Providers = { [key: ProviderName] : ComponentProvider }

type ParserOptions = {
    attachRandomId?: Boolean,
    provider: ProviderName,
    wrapper?: VueComponent,
}
