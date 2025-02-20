const db = require('../db');

const ListPersonas = (req, res) => {
    const sqlPersonas = "SELECT p.*, o.denominacion as oficina_nombre FROM persona p LEFT JOIN oficina o ON p.oficina_id = o.id";
    const sqlOficinas = "SELECT * FROM oficina";
    
    db.query(sqlPersonas, (err, personas) => {
        if (err) {
            console.error("Error al obtener personas:", err);
            return res.status(500).render("error", { 
                message: "Error al obtener personas",
                error: err
            });
        }
        
        db.query(sqlOficinas, (err, oficinas) => {
            if (err) {
                console.error("Error al obtener oficinas:", err);
                return res.status(500).render("error", { 
                    message: "Error al obtener oficinas",
                    error: err
                });
            }
            
            res.render("personas", {
                title: "Lista de Personas",
                mensaje: "Gestión de Personas",
                personas: personas,
                oficinas: oficinas
            });
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

const ListOficinas = (req, res) => {
    console.log("Intentando listar oficinas...");
    const sql = "SELECT * FROM oficina";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error detallado al obtener oficinas:", err);
            return res.status(500).render("error", { 
                message: "Error al obtener oficinas",
                error: err
            });
        }
        console.log("Oficinas obtenidas:", result);
        res.render("oficinas", {
            title: "Lista de Oficinas",
            mensaje: "Gestión de Oficinas",
            oficinas: result
        });
    });
};

const CreateOficina = (req, res) => {
    const { denominacion } = req.body;
    const sql = "INSERT INTO oficina (denominacion) VALUES (?)";
    db.query(sql, [denominacion], (err, result) => {
        if (err) {
            console.error("Error al crear oficina:", err);
            return res.status(500).render("error", {
                message: "Error al crear oficina",
                error: err
            });
        }
        res.redirect('/oficinas');
    });
};

const UpdateOficina = (req, res) => {
    const { id, denominacion } = req.body;
    const sql = "UPDATE oficina SET denominacion = ? WHERE id = ?";
    db.query(sql, [denominacion, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar oficina:", err);
            return res.status(500).render("error", {
                message: "Error al actualizar oficina",
                error: err
            });
        }
        res.redirect('/oficinas');
    });
};

const DeleteOficina = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM oficina WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar oficina:", err);
            return res.status(500).render("error", {
                message: "Error al eliminar oficina",
                error: err
            });
        }
        res.redirect('/oficinas');
    });
};

module.exports = {
    ListPersonas,
    CreatePersona,
    UpdatePersona,
    DeletePersona,
    ListOficinas,
    CreateOficina,
    UpdateOficina,
    DeleteOficina
};