const bcrypt = require('bcrypt');

const hashedPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error; // Propagate the error upwards if needed
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error; // Propagate the error upwards if needed
    }
};

module.exports = { hashedPassword, comparePassword };
