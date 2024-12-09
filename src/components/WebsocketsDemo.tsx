import useWebSocket from "react-use-websocket";

const WebsocketsDemo = () => {
    const socketUrl = "ws://35.222.114.197:8765";
    const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
        share: true,
        onOpen: () => console.log('WebSocket connection opened!'),
        onClose: () => console.log('WebSocket connection closed!'),
        onError: (event) => console.log('WebSocket error!', event),
        onMessage: (event) => {console.log('message from the server: ', event.data); return event.data},
    });
    
    const handleClick = () => {
        sendMessage("sqt PRIO3");
        sendMessage("sqt HYPE3");
        console.log(sendMessage);
    }

    return (
        <div>
            <button onClick={handleClick}>Send Message</button>
            <p>Last Message: {lastMessage ? lastMessage.data : 'None'}</p>
        </div>
    );
};

export default WebsocketsDemo;