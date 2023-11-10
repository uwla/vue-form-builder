import { VfbProvider, BootstrapVueProvider } from "./providers"

var providers : Providers = {
    'vfb': VfbProvider,
    'bootstrap-vue': BootstrapVueProvider,
}

function addProvider(name: ProviderName, provider: ComponentProvider) {
    if (! Object(providers).hasOwnProperty(name))
        providers[name] = provider
}

function delProvider(name: ProviderName) {
    delete providers[name]
}

function getProvider(name: ProviderName) {
    return providers[name]
}

function hasProvider(name: ProviderName) {
    return Object(providers).hasOwnProperty(name)
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
