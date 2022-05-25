"use strict";

var PracticaCtrl = {};

var Practica = require('../models/PracticasModels');

var cloudinary = require("../utils/cloudinary");

PracticaCtrl.crear = function _callee(req, res) {
  var result, practica;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(req.file.path));

        case 3:
          result = _context.sent;
          // Create new user
          practica = new Practica({
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            curso: req.body.autorcurso,
            estadoVacuna: req.body.estadoVacuna,
            dosisAplicadas: req.body.dosisAplicadas,
            ciudadNombre: req.body.ciudadNombre,
            name: req.body.name,
            avatar: result.secure_url,
            cloudinary_id: result.public_id
          }); // Save user

          _context.next = 7;
          return regeneratorRuntime.awrap(practica.save());

        case 7:
          res.json(practica);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

PracticaCtrl.listar = function _callee2(req, res) {
  var respuesta;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Practica.find());

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

PracticaCtrl.listarId = function _callee3(req, res) {
  var id, respuesta;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Practica.findById({
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

PracticaCtrl.practicaDeunCurso = function _callee4(req, res) {
  var id, respuesta;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Practica.find({
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

PracticaCtrl.eliminar = function _callee5(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Practica.findByIdAndRemove({
            _id: id
          }));

        case 3:
          res.json({
            mensaje: 'Practica eliminada'
          });

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

PracticaCtrl.actualizar = function _callee6(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Practica.findByIdAndUpdate({
            _id: id
          }, req.body));

        case 3:
          res.json({
            mensaje: 'Practica actualizada'
          });

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
};

module.exports = PracticaCtrl;