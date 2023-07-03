import { Server } from "http";
import configKeys from "../../config";

const serverConfig = (server:Server) => {
    const startServer = () => { 
        server.listen(4000, () => {
            console.log(`Server listening on Port ${configKeys.PORT}`);
        })
    }
    return {
        startServer
    }
}

export default serverConfig