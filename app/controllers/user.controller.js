const Yup = require('yup');
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = async (req, res) => {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Falha na validação.' });
    }

    const userExists = await User.findOne({
        where: { email: req.body.email },
    });

    if (userExists) {
        return res.status(409).json({ error: 'Usuario já existente.' });
    }
    const { id, name, email, age, telephone } = await User.create(req.body);

    return res.status(200).json({
        id,
        name,
        email,
        age,
        telephone
    });
}

// Retrieve all User from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao recuperar os usuarios."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Não foi possível encontrar o usuário com id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao recuperar usuário com id=" + id
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "O usuario foi atualizado com sucesso."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "O usuario foi excluído com sucesso!"
                });
            } else {
                res.send({
                    message: `Não é possível excluir o usuario com id=${id}. Talvez o Tutorial não tenha sido encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possível excluir o usuario com id=" + id
            });
        });
};