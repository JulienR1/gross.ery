import { Server as HttpServer } from "http";
import { Server } from "socket.io";

type SocketId = string;
type ListId = string;

export const init = (server: HttpServer) => {
	const io = new Server(server);

	const subscriptions: { [key: SocketId]: Set<ListId> } = {};

	io.on("connection", (socket) => {
		subscriptions[socket.id] = new Set();

		socket.on("disconnect", () => {
			if (subscriptions[socket.id]) {
				delete subscriptions[socket.id];
			}
		});

		socket.on("subscribeToList", (listId) => {
			subscriptions[socket.id].add(listId);
		});

		socket.on("unsubscribeFromList", (listId) => {
			subscriptions[socket.id].delete(listId);
		});
	});
};
