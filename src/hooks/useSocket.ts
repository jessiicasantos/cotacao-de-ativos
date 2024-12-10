import useWebSocket from "react-use-websocket";

export default function useSocket (onMessageCallback: any = null) {
    const socketUrl = "ws://35.222.114.197:8765";
  
    const { sendMessage } = useWebSocket(socketUrl, {
        share: true,
        shouldReconnect: () => true,
        onOpen: () => console.log('WebSocket connection opened!'),
        onClose: () => console.log('WebSocket connection closed!'),
        onError: () => console.log('WebSocket error!'),
        onMessage: onMessageCallback ?? null,
    });
  
    return { sendMessage }
}