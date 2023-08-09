import { Server } from "http";
import configKeys from "../../config";
import { Server as SocketServer } from "socket.io";

const serverConfig = (server: Server) => {
    const io = new SocketServer(server, {
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:5173",
        // credentials: true,
      },
    });

    const startServer = () => { 
        server.listen(configKeys.PORT, () => {
            console.log(`Server listening on Port ${configKeys.PORT}`);
        })
    }
    return {
        io,
        startServer
    }
}

export default serverConfig