const db = require('../db');

const ListPersonas = (req, res) => {
    const sql = "SELECT * FROM persona";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error al obtener personas:", err);
            return res.status(500).render("error", { 
                message: "Error al obtener personas",
                error: err
            });
        }
        res.render("personas", {
            title: "Lista de Personas",
            mensaje: "Gestión de Personas",
            personas: result
        });
    });
};

const CreatePersona = (req, res) => {
    const { nombre, email } = req.body;
    const sql = "INSERT INTO persona (nombre, email) VALUES (?, ?)";
    db.query(sql, [nombre, email], (err, result) => {
        if (err) {
            console.error("Error al crear persona:", err);
            return res.status(500).render("error", {
                message: "Error al crear persona",
                error: err
            });
        }
        res.redirect('/personas');
    });
};

const UpdatePersona = (req, res) => {
    const { id, nombre, email } = req.body;
    const sql = "UPDATE persona SET nombre = ?, email = ? WHERE id = ?";
    db.query(sql, [nombre, email, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar persona:", err);
            return res.status(500).render("error", {
                message: "Error al actualizar persona",
                error: err
            });
        }
        res.redirect('/personas');
    });
};

const DeletePersona = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM persona WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar persona:", err);
            return res.status(500).render("error", {
                message: "Error al eliminar persona",
                error: err
            });
        }
        res.redirect('/personas');
    });
};

module.exports = {
    ListPersonas,
    CreatePersona,
    UpdatePersona,
    DeletePersona
};