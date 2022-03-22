import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { ListId, SocketNotifier } from "../models/socketSubscription";
import {
	getAllSubscribersForList,
	onConnect,
	onDisconnect,
	onSubscribeToList,
	onUnsubscribeFromList,
} from "../services/sockets";

export const init = (server: HttpServer): { sendNotification: SocketNotifier } => {
	const io = new Server(server);

	io.on("connection", (socket) => {
		onConnect(socket);
		socket.on("disconnect", () => onDisconnect(socket));
		socket.on("subscribeToList", (listId) => onSubscribeToList(socket, listId));
		socket.on("unsubscribeFromList", (listId) => onUnsubscribeFromList(socket, listId));
	});

	const sendNotification = (listId: ListId, socketChannel: string, payload?: object) => {
		const socketIds = getAllSubscribersForList(listId);
		const sockets = socketIds.map((socketId) => io.sockets.sockets.get(socketId));
		sockets.forEach((socket) => {
			socket?.emit(socketChannel, payload);
		});
	};

	return { sendNotification };
};
