const saltRounds = 10;

// This method will simulate a text encrypt for now
const hashSync = text => text.repeat(saltRounds);

const encrypt = text => hashSync(text, saltRounds);

module.exports = { encrypt };
