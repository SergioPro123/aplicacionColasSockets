var socket = io();

let escritorioUrl = getParameterByName('escritorio');
let label = $('small');
//Si no exite el palametro 'Escritorio' retorna FALSE.
if (!escritorioUrl) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

$(document).ready(function() {
    $('#numEscritorio').text('Escritorio ' + escritorioUrl);



    $('#bt-sig-ticket').on('click', function() {
        socket.emit('atenderTicket', { escritorio: escritorioUrl }, function(data) {

            if (!data.numero) {
                console.log(data);
            } else {
                label.text('Ticket #' + data.numero);
            }


        });
    });

});








function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? false : decodeURIComponent(results[1].replace(/\+/g, " "));
}