import type { ComponentProvider, ProviderName, Providers } from "../types"
import {
    VfbProvider,
    BootstrapVueProvider,
    VuetifyProvider,
    PrimevueProvider,
} from "./providers"

const providers: Providers = {
    "vfb": VfbProvider,
    "vuetify": VuetifyProvider,
    "primevue": PrimevueProvider,
    "bootstrap-vue": BootstrapVueProvider,
}

function addProvider(name: ProviderName, provider: ComponentProvider) {
    if (!Object.prototype.hasOwnProperty.call(providers, name))
        providers[name] = provider
}

function delProvider(name: ProviderName) {
    delete providers[name]
}

function getProvider(name: ProviderName) {
    return providers[name]
}

function hasProvider(name: ProviderName) {
    return Object.prototype.hasOwnProperty.call(providers, name)
}

function setProvider(name: ProviderName, provider: ComponentProvider) {
    providers[name] = provider
}

export const ProviderService = {
    addProvider,
    delProvider,
    getProvider,
    hasProvider,
    setProvider,
}
