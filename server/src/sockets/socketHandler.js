const setupSockets = (io) => {
  io.on('connection', (socket) => {
    console.log(`Operator client connected: ${socket.id}`);

    socket.on('client:join-dashboard', () => {
      socket.join('dashboard-room');
    });

    socket.on('disconnect', () => {
      console.log(`Operator client disconnected: ${socket.id}`);
    });
  });
};

module.exports = setupSockets;