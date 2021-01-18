const aliases = {
	name: "name:name|text",
	fname: "name:fname|text",
	lname: "name:lname|text",
	username: "name:username|text",
	email: "name:email|email",
	email_confirmation: "name:email_confirmation|email",
	password: "name:password|password",
	password_confirmation: "name:password_confirmation|password",
	age: "name:age|number",
	birthday: "name:birthday|date",
	photo: "name:photo|file|accept:image/*",
	picture: "name:picture|file|accept:image/*",
	profile_picture: "name:profile_picture|file|accept:image/*"
};
function setAlias(key, alias) {
	aliases[key] = alias;
}
function setAliases(aliases) {
	for (let key of Object.keys(newAliases)) {
		aliases[key] = newAliases[key];
	}
}
function resetAliases() {
	for (let key of Object.keys(aliases)) {
		delete aliases[key];
	}
}
function removeAlias(key) {
	delete aliases[key];
}
function getAlias(key) {
	return aliases[key];
}
function getAliases() {
	return aliases;
}
function isAlias(key) {
	return Object(aliases).hasOwnProperty(key);
}
const fieldAliases = {
	setAliases,
	setAlias,
	resetAliases,
	getAliases,
	getAlias,
	removeAlias,
	isAlias
};
export default fieldAliases;
