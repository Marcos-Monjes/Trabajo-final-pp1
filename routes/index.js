var express = require('express');
var router = express.Router();
const ctl = require('../controllers/controllers');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Sistema de Gestión',
    mensaje: 'Bienvenido al Sistema'
  });
});

// Rutas de Personas
router.get('/personas', ctl.ListPersonas);
router.get('/personas/agregar', ctl.ShowAgregarPersona);
router.post('/personas/crear', ctl.CreatePersona);
router.get('/personas/editar/:id', ctl.ShowEditarPersona);
router.post('/personas/actualizar', ctl.UpdatePersona);
router.get('/personas/borrar/:id', ctl.ShowBorrarPersona);
router.get('/personas/eliminar/:id', ctl.DeletePersona);
router.get('/personas/buscar', ctl.ShowBuscarPersona);
router.get('/personas/resultados', ctl.BuscarPersonas);

// Rutas de Oficinas
router.get('/oficinas', ctl.ListOficinas);
router.get('/oficinas/agregar', ctl.ShowAgregarOficina);
router.post('/oficinas/crear', ctl.CreateOficina);
router.get('/oficinas/editar/:id', ctl.ShowEditarOficina);
router.post('/oficinas/actualizar', ctl.UpdateOficina);
router.get('/oficinas/borrar/:id', ctl.ShowBorrarOficina);
router.get('/oficinas/eliminar/:id', ctl.DeleteOficina);

module.exports = router;
