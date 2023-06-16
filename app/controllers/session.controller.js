/* eslint-disable import/no-extraneous-dependencies */
const db = require("../models");
const User = db.user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth');

exports.create = async (req, res) => {
    const { email, password } = req.body;

    // Verificar se esse email existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({ error: 'Usuario não encontrado' });
    }

    // Verificar se a senha esta correta.
    if (!bcrypt.compareSync(password, user.password_hash)) {
        return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const { id, name } = user;

    return res.status(200).json({
        id,
        name,
        email,
        token: jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        }),
    });
}