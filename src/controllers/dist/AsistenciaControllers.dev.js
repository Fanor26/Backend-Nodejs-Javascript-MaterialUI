"use strict";

var AsistenciaCtrl = {};

var Asistencia = require('../models/Asistenciamodels');

var cloudinary = require("../utils/cloudinary");

AsistenciaCtrl.crear = function _callee(req, res) {
  var _req$body, nombres, apellidos, curso, estadoVacuna, dosisAplicadas, ciudadNombre, asistencia;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          /* try {
               // Upload image to cloudinary
               const result = await cloudinary.uploader.upload(req.file.path);*/
          // Create new user
          _req$body = req.body, nombres = _req$body.nombres, apellidos = _req$body.apellidos, curso = _req$body.curso, estadoVacuna = _req$body.estadoVacuna, dosisAplicadas = _req$body.dosisAplicadas, ciudadNombre = _req$body.ciudadNombre;
          asistencia = new Asistencia({
            nombres: nombres,
            apellidos: apellidos,
            curso: curso,
            estadoVacuna: estadoVacuna,
            dosisAplicadas: dosisAplicadas,
            ciudadNombre: ciudadNombre
            /*name,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,*/

          }); // Save user

          _context.next = 4;
          return regeneratorRuntime.awrap(asistencia.save());

        case 4:
          res.json({
            mensaje: 'Asistencia Creada Correctamente'
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};
/*} catch (err) {
    console.log(err);
  }
};
*/


AsistenciaCtrl.listar = function _callee2(req, res) {
  var respuesta;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Asistencia.find());

        case 2:
          respuesta = _context2.sent;
          res.json(respuesta);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

AsistenciaCtrl.listarId = function _callee3(req, res) {
  var id, respuesta;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Asistencia.findById({
            _id: id
          }));

        case 3:
          respuesta = _context3.sent;
          res.json(respuesta);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

AsistenciaCtrl.asistenciaDeunCurso = function _callee4(req, res) {
  var id, respuesta;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Asistencia.find({
            curso: id
          }));

        case 3:
          respuesta = _context4.sent;
          res.json(respuesta);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

AsistenciaCtrl.eliminar = function _callee5(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Asistencia.findByIdAndRemove({
            _id: id
          }));

        case 3:
          res.json({
            mensaje: 'Asistencia eliminada'
          });

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

AsistenciaCtrl.actualizar = function _callee6(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Asistencia.findByIdAndUpdate({
            _id: id
          }, req.body));

        case 3:
          res.json({
            mensaje: 'Asistencia actualizada'
          });

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
};

AsistenciaCtrl.buscarAsistenciaCriterio = function _callee7(req, res) {
  var estadoVacuna, respuesta;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          estadoVacuna = req.params.criterio;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Asistencia.find({
            estadoVacuna: estadoVacuna
          }));

        case 4:
          respuesta = _context7.sent;
          res.json(respuesta);
          _context7.next = 11;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          return _context7.abrupt("return", res.status(400).json({
            mensaje: "ocurrio un error",
            error: _context7.t0
          }));

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

module.exports = AsistenciaCtrl;