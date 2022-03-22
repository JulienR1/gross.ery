import { Socket } from "socket.io";

import { ListId, SocketId, SubscriptionRegistry } from "../../models/socketSubscription";

const subscriptions: SubscriptionRegistry = {};

export const onConnect = (socket: Socket) => {
	subscriptions[socket.id] = new Set();
};

export const onDisconnect = (socket: Socket) => {
	if (subscriptions[socket.id]) {
		delete subscriptions[socket.id];
	}
};

export const onSubscribeToList = (socket: Socket, listId: ListId) => {
	subscriptions[socket.id].add(listId);
};

export const onUnsubscribeFromList = (socket: Socket, listId: ListId) => {
	subscriptions[socket.id].delete(listId);
};

export const getAllSubscribersForList = (listId: ListId): SocketId[] => {
	const socketIds = Object.keys(subscriptions);
	const subscribers = socketIds.filter((socketId) => subscriptions[socketId].has(listId));
	return subscribers;
};
