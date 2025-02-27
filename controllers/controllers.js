const db = require('../db');

const ListPersonas = (req, res) => {
    const sql = "SELECT p.*, o.denominacion as oficina_nombre FROM persona p LEFT JOIN oficina o ON p.oficina_id = o.id";
    db.query(sql, (err, result) => {
        if(err) {
            console.error("Error detallado al obtener personas:", err);
            return res.status(500).json({ error: err.message });
        }
        res.render('personas', { 
            title: 'Personas',
            personas: result
        });
    });
};

const ShowAgregarPersona = (req, res) => {
    const sql = "SELECT * FROM oficina";
    db.query(sql, (err, oficinas) => {
        if(err) {
            console.log("Error al obtener oficinas:", err);
            return res.status(500).send(err);
        }
        res.render('agregar', {
            title: 'Agregar Persona',
            tipo: 'persona',
            oficinas: oficinas
        });
    });
};

const CreatePersona = (req, res) => {
    const { nombre, email, oficina_id } = req.body;
    const sql = "INSERT INTO persona (nombre, email, oficina_id) VALUES (?, ?, ?)";
    db.query(sql, [nombre, email, oficina_id || null], (err, result) => {
        if(err) {
            console.log("Error al crear persona:", err);
            return res.status(500).send(err);
        }
        res.redirect('/personas');
    });
};

const ShowEditarPersona = (req, res) => {
    const id = req.params.id;
    const sqlPersona = "SELECT * FROM persona WHERE id = ?";
    const sqlOficinas = "SELECT * FROM oficina";
    
    db.query(sqlPersona, [id], (err, persona) => {
        if(err) {
            console.log("Error al obtener persona:", err);
            return res.status(500).send(err);
        }
        db.query(sqlOficinas, (err, oficinas) => {
            if(err) {
                console.log("Error al obtener oficinas:", err);
                return res.status(500).send(err);
            }
            res.render('editar', {
                title: 'Editar Persona',
                tipo: 'persona',
                persona: persona[0],
                oficinas: oficinas
            });
        });
    });
};

const UpdatePersona = (req, res) => {
    const { id, nombre, email, oficina_id } = req.body;
    const sql = "UPDATE persona SET nombre = ?, email = ?, oficina_id = ? WHERE id = ?";
    db.query(sql, [nombre, email, oficina_id || null, id], (err, result) => {
        if(err) {
            console.log("Error al actualizar persona:", err);
            return res.status(500).send(err);
        }
        res.redirect('/personas');
    });
};

const ShowBorrarPersona = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM persona WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if(err) {
            console.log("Error al obtener persona:", err);
            return res.status(500).send(err);
        }
        res.render('borrar', {
            title: 'Borrar Persona',
            tipo: 'persona',
            persona: result[0]
        });
    });
};

const DeletePersona = (req, res) => {
    const id = req.params.id;
    if(!req.query.confirmar) {
        return res.redirect(`/personas/borrar/${id}`);
    }
    const sql = "DELETE FROM persona WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if(err) {
            console.log("Error al eliminar persona:", err);
            return res.status(500).send(err);
        }
        res.redirect('/personas');
    });
};

const ShowBuscarPersona = (req, res) => {
    const sql = "SELECT * FROM oficina";
    db.query(sql, (err, oficinas) => {
        if(err) {
            console.log("Error al obtener oficinas:", err);
            return res.status(500).send(err);
        }
        res.render('busqueda', {
            title: 'Buscar Persona',
            oficinas: oficinas
        });
    });
};

const BuscarPersonas = (req, res) => {
    const { termino, oficina_id } = req.query;
    let sql = `
        SELECT p.*, o.denominacion as oficina_nombre 
        FROM persona p 
        LEFT JOIN oficina o ON p.oficina_id = o.id 
        WHERE (p.nombre LIKE ? OR p.email LIKE ?)
    `;
    let params = [`%${termino}%`, `%${termino}%`];

    if(oficina_id) {
        sql += " AND p.oficina_id = ?";
        params.push(oficina_id);
    }

    db.query(sql, params, (err, result) => {
        if(err) {
            console.log("Error al buscar personas:", err);
            return res.status(500).send(err);
        }
        res.render('resultados', {
            title: 'Resultados de Búsqueda',
            resultados: result
        });
    });
};

const ListOficinas = (req, res) => {
    const sql = `
        SELECT o.*, COUNT(p.id) as cantidad_personas 
        FROM oficina o 
        LEFT JOIN persona p ON o.id = p.oficina_id 
        GROUP BY o.id
    `;
    db.query(sql, (err, result) => {
        if(err) {
            console.log("Error al obtener oficinas:", err);
            return res.status(500).send(err);
        }
        res.render('oficinas', { 
            title: 'Oficinas',
            oficinas: result
        });
    });
};

const ShowAgregarOficina = (req, res) => {
    res.render('agregar', {
        title: 'Agregar Oficina',
        tipo: 'oficina'
    });
};

const CreateOficina = (req, res) => {
    const { denominacion } = req.body;
    const sql = "INSERT INTO oficina (denominacion) VALUES (?)";
    db.query(sql, [denominacion], (err, result) => {
        if(err) {
            console.log("Error al crear oficina:", err);
            return res.status(500).send(err);
        }
        res.redirect('/oficinas');
    });
};

const ShowEditarOficina = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM oficina WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if(err) {
            console.log("Error al obtener oficina:", err);
            return res.status(500).send(err);
        }
        res.render('editar', {
            title: 'Editar Oficina',
            tipo: 'oficina',
            oficina: result[0]
        });
    });
};

const UpdateOficina = (req, res) => {
    const { id, denominacion } = req.body;
    const sql = "UPDATE oficina SET denominacion = ? WHERE id = ?";
    db.query(sql, [denominacion, id], (err, result) => {
        if(err) {
            console.log("Error al actualizar oficina:", err);
            return res.status(500).send(err);
        }
        res.redirect('/oficinas');
    });
};

const ShowBorrarOficina = (req, res) => {
    const id = req.params.id;
    const sqlOficina = "SELECT * FROM oficina WHERE id = ?";
    const sqlPersonas = "SELECT COUNT(*) as count FROM persona WHERE oficina_id = ?";
    
    db.query(sqlOficina, [id], (err, oficina) => {
        if(err) {
            console.log("Error al obtener oficina:", err);
            return res.status(500).send(err);
        }
        db.query(sqlPersonas, [id], (err, result) => {
            if(err) {
                console.log("Error al verificar personas:", err);
                return res.status(500).send(err);
            }
            res.render('borrar', {
                title: 'Borrar Oficina',
                tipo: 'oficina',
                oficina: oficina[0],
                tienePersonas: result[0].count > 0
            });
        });
    });
};

const DeleteOficina = (req, res) => {
    const id = req.params.id;
    if(!req.query.confirmar) {
        return res.redirect(`/oficinas/borrar/${id}`);
    }
    
    //actualiza las personas para quitar la referencia
    const sqlUpdatePersonas = "UPDATE persona SET oficina_id = NULL WHERE oficina_id = ?";
    db.query(sqlUpdatePersonas, [id], (err) => {
        if(err) {
            console.log("Error al actualizar personas:", err);
            return res.status(500).send(err);
        }
        
        // dps elimina la oficina
        const sqlDeleteOficina = "DELETE FROM oficina WHERE id = ?";
        db.query(sqlDeleteOficina, [id], (err, result) => {
            if(err) {
                console.log("Error al eliminar oficina:", err);
                return res.status(500).send(err);
            }
            res.redirect('/oficinas');
        });
    });
};

module.exports = {
    ListPersonas,
    ShowAgregarPersona,
    CreatePersona,
    ShowEditarPersona,
    UpdatePersona,
    ShowBorrarPersona,
    DeletePersona,
    ShowBuscarPersona,
    BuscarPersonas,
    ListOficinas,
    ShowAgregarOficina,
    CreateOficina,
    ShowEditarOficina,
    UpdateOficina,
    ShowBorrarOficina,
    DeleteOficina
};