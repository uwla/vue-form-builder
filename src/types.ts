// TYPE DEFINITIONS

type vueComponent = string
type FieldValue = any
type FieldType = string
type FieldName = string
type FieldProps = { [key: string]: any }

type Field = {
    componentFeedback: vueComponent,
    component: vueComponent,
    componentWrapper: vueComponent,
    model?: boolean,
    name?: FieldName,
    props: FieldProps,
    type: FieldType,
    value?: FieldValue,
    values?: boolean,
}

type FieldDescription = Field|string
type FieldAlias = FieldDescription
type FieldAliases = { [key: string]: FieldAlias }
type Data = { [key: FieldName]: FieldValue }
type Model = { [key: FieldName]: FieldValue }