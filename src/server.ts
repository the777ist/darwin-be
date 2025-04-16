import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import { handleWebSocketConnection } from './lib/websocket';
import experimentRoutes from './modules/experiments/routes';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

wss.on('connection', handleWebSocketConnection);

app.use('/api/experiments', experimentRoutes);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});