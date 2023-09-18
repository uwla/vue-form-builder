import BooleanAttribute from "./attributes/BooleanAttribute"
import InputAttribute from "./attributes/InputAttribute"
import OptionsAttribute from "./attributes/OptionsAttribute"
import PropsAttribute from "./attributes/PropsAttribute"
import TypeAttribute from "./attributes/TypeAttribute"

const attributeParsers : AttributeParser[] = [
    new BooleanAttribute(),    
    new InputAttribute(),
    new OptionsAttribute(),
    new PropsAttribute(),
    new TypeAttribute(),
]

export default attributeParsers