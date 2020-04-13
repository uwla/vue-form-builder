export default {
    name: "FormButtons",
    props: {
        submitButtonText: {
            type: String,
            default: "SAVE"
        },

        submitButtonAttr: {
            type: Object,
            default: () => ({
                class: "btn btn-success",
                type: "submit",
            })
        },

        cancelButtonText: {
            type: String,
            default: "CANCEL"
        },

        cancelButtonAttr: {
            type: Object,
            default: () => ({
                class: "btn btn-danger",
                type: "reset",
            })
        },

        wrapperAttr: {
            type: Object,
            default: () => ({
                class: "form-group form-button-container"
            })
        }
    }
};
