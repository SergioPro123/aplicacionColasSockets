//Comando para establecer la conexion Sockets

var socket = io();

let label = $('#lblNuevoTicket');
socket.on('connect', function() {
    console.log('Conectado al Servido por SOCKETS.');
});

socket.on('disconnect', function() {
    console.log('Conexión perdida por SOCKETS.');
});

socket.on('estadoActual', function(msj) {
    label.text(msj.actual);
});

$(document).ready(function() {

    $('#bt-new-ticket').on('click', function() {
        socket.emit('siguienteTicket', null, function(siguienteTicket) {
            label.text(siguienteTicket);
        });
    });
});