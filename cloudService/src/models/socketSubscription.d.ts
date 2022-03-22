export type SocketId = string;
export type ListId = string;
export type SubscriptionRegistry = { [key: SocketId]: Set<ListId> };

export type SocketNotifier = (listId: ListId, socketChannel: string, payload?: object) => void;
