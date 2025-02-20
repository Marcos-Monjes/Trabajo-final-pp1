var express = require('express');
var router = express.Router();
const ctl = require('../controllers/controllers');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

router.get('/personas', ctl.ListPersonas);
router.post('/personas/crear', ctl.CreatePersona);
router.post('/personas/actualizar', ctl.UpdatePersona);
router.get('/personas/eliminar/:id', ctl.DeletePersona);

router.get('/oficinas', ctl.ListOficinas);
router.post('/oficinas/crear', ctl.CreateOficina);
router.post('/oficinas/actualizar', ctl.UpdateOficina);
router.get('/oficinas/eliminar/:id', ctl.DeleteOficina);

module.exports = router;
