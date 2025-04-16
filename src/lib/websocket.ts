import { WebSocket } from 'ws';
import { generateExperimentData } from '../utils/dataGenerator';

export const handleWebSocketConnection = (ws: WebSocket) => {
    console.log('Client connected');

    const sendData = () => {
        const data = generateExperimentData();
        ws.send(JSON.stringify(data));
    };

    sendData();

    const interval = setInterval(sendData, 5000);

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
};