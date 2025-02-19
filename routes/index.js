var express = require('express');
var router = express.Router();
const ctl = require('../controllers/controllers')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/personas', ctl.ListPersonas);
router.post('/personas/crear', ctl.CreatePersona);
router.post('/personas/actualizar', ctl.UpdatePersona);
router.get('/personas/eliminar/:id', ctl.DeletePersona);

module.exports = router;
