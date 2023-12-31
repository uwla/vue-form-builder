const aliases : FieldAliases = {
    name: 'name:name|text',
    fname: 'name:fname|text|label:First name',
    lname: 'name:lname|text|label:Last name',
    username: 'name:username|text',
    email: 'name:email|email',
    email_confirmation: 'name:email_confirmation|email',
    password: 'name:password|password',
    password_confirmation: 'name:password_confirmation|password',
    age: 'name:age|number',
    birthday: 'name:birthday|date',
    photo: 'name:photo|file|accept=image/*',
    picture: 'name:picture|file|accept=image/*',
    profile_picture: 'name:profile_picture|file|accept=image/*'
}

function addAlias(key: string, alias: FieldAlias): void {
    if (aliases[key] === undefined)
        aliases[key] = alias
}

function addAliases(newAliases: FieldAliases): void {
    for (let key of Object.keys(newAliases))
        addAlias(key, newAliases[key])
}

function setAlias(key: string, alias: FieldAlias): void {
    if (aliases[key] !== undefined)
        aliases[key] = alias
}

function setAliases(newAliases: FieldAliases): void {
    for (let key of Object.keys(newAliases))
        setAlias(key, newAliases[key])
}

function delAllAliases(): void {
    for (let key of Object.keys(aliases))
        delete aliases[key]
}

function delAlias(key: string): void {
    delete aliases[key]
}

function delAliases(keys: string[]): void {
    keys.forEach(delAlias)
}

function isAlias(key: string): boolean {
    return Object(aliases).hasOwnProperty(key)
}

function getAlias(key: string): FieldAlias {
    return aliases[key]
}

function getAliases(keys: string[]): FieldAlias[] {
    return keys.filter(isAlias).map(getAlias)
}

function getAllAliases(): FieldAliases {
    return {... aliases}
}

const fieldAliases = {
    addAlias,
    addAliases,
    delAlias,
    delAliases,
    delAllAliases,
    getAlias,
    getAliases,
    getAllAliases,
    isAlias,
    setAlias,
    setAliases,
}

export default fieldAliases