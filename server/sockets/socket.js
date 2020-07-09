const { io } = require('../server');
const { TicketControl } = require('../class/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {


    client.on('siguienteTicket', (msj, callback) => {
        let siguiente = ticketControl.siguienteTicket();
        callback(`Siguiente ${siguiente}`);
    });


    client.emit('estadoActual', {
        actual: ticketControl.getUltimo(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return {
                err: true,
                mensaje: 'El escritorio es Obligatorio.'
            };
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit('ultimos4', { ultimos4: ticketControl.getUltimos4() });
    });

});