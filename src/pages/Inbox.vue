<template>
	<MainLayout Header="Inbox">
		<template v-slot:main>
			<div class="chat-container">
				<div v-if="newMessage">
					Ada Pesan Baru<button @click="loadMessage()">more</button>
				</div>
				<div
					class="message-container"
					v-for="message in messages"
					:key="message.id"
					@click="openMessage(message.id)"
				>
					<div
						class="content-area"
						style="color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0.5);"
					>
						<span></span>
						<header>
							<span>Admin</span>
							<span class="timestamp">{{ message.created_at }}</span>
						</header>
						<div class="message-content">
							<span class="sender">{{ message.subject }}</span>
							<span class="message">{{ message.body }} </span>
						</div>
					</div>
				</div>
				<div>
					More ({{ unreadMessageCount === 5 ? "5+" : unreadMessageCount }})
					<button @click="fetchOldMessage">more</button>
				</div>
				<q-dialog v-model="open">
					<q-card style="width: 700px; max-width: 80vw;">
						<q-card-section>
							<div class="text-h6">{{openedMessage.subject}}</div>
						</q-card-section>

						<q-card-section class="q-pt-none">
							{{openedMessage.body}}
						</q-card-section>

						<q-card-actions align="right" class="bg-white text-teal">
							<q-btn flat label="OK" v-close-popup />
						</q-card-actions>
					</q-card>
				</q-dialog>
			</div>
		</template>
	</MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";
import { getBroadcastMessage } from "../libraries/inboxes";
import { cloneDeep } from "lodash";
import { apiDomain, socketIoEndpoint, getHeader } from "../config";
import io from "socket.io-client";

let socket;

export default {
	components: {
		MainLayout
	},
	data() {
		return {
			messages: [],
			unreadMessageCount: 0,
			inboxState: null,
			newMessage: false,
			//toggle
			open: false,
			openedMessage: {}
		};
	},
	async created() {
		this.loadMessage();
		this.initiateSocketIO();
	},
	async destroyed() {
		socket.disconnect();
	},
	methods: {
		initiateSocketIO() {
			socket = io(socketIoEndpoint);
			socket.on("notify", message => {
				this.newMessage = true;
			});
		},
		async setUnreadMessageCount() {
			const countResponse = await getBroadcastMessage({
				options: "countOnly"
			});
		},
		openMessage(id) {
			this.open = true;
			this.openedMessage = this.messages.find(message => message.id === id);
		},
		// async fetchMessage() {
		// 	let messages = cloneDeep(this.messages);
		// 	const mLength = messages.length;

		// 	if (mLength !== 0) {

		// 		// has message, no need to call old message, just get the old unred
		// 		const countResponse = await getBroadcastMessage({
		// 			option: "countOnly",
		// 			previousMessageId: messages[0].id
		// 		});

		// 		this.unreadMessageCount = countResponse.data;
		// 		return 0;
		// 	}

		// 	const fetchResponse = await getBroadcastMessage({
		// 		previousMessageId: 0
		// 	});
		// 	messages = [...messages, ...fetchResponse.data.messages];
		// 	this.messages = messages;
		// 	localStorage.setItem("broadcast_messages", JSON.stringify(messages));
		// 	this.unreadMessageCount = fetchResponse.data.count;
		// },
		async fetchOldMessage() {
			let messages = cloneDeep(this.messages);
			const mLength = messages.length;

			const form =
				messages.length === 0
					? { previousMessageId: 0 }
					: { previousMessageId: messages[mLength - 1].id };

			const fetchResponse = await getBroadcastMessage(form);
			messages = [...messages, ...fetchResponse.data.messages];
			this.messages = messages;
			localStorage.setItem("broadcast_messages", JSON.stringify(messages));

			this.unreadMessageCount = fetchResponse.data.count;
		},
		async loadMessage() {
			const clientMessageStorage = JSON.parse(
				localStorage.getItem("broadcast_messages")
			);

			const clientInboxState = localStorage.getItem("inboxState");
			const { data: serverInboxState } = await this.$axios.get(
				`${apiDomain}/identity/inbox/inbox-state`,
				{
					headers: getHeader()
				}
			);

			if (clientInboxState != serverInboxState || !clientMessageStorage) {
				const inboxRes = await getBroadcastMessage({
					previousMessageId: 0
				});

				this.messages = inboxRes.data.messages;
				this.unreadMessageCount = inboxRes.data.count;
				localStorage.setItem(
					"broadcast_messages",
					JSON.stringify(inboxRes.data.messages)
				);
				localStorage.setItem("inboxState", serverInboxState);
			} else {
				this.messages = clientMessageStorage;
				const countResponse = await getBroadcastMessage({
					option: "countOnly",
					previousMessageId: this.messages[this.messages.length - 1].id
				});

				this.unreadMessageCount = countResponse.data;
			}

			this.inboxState = clientInboxState ?? null;
			this.newMessage = false;
			// this.messages = clientMessageStorage ?? [];
		}
	}
};
</script>

<style scoped>
.chat-container {
	display: flex;
	flex-direction: column;
	height: 100%;
	align-items: center;
	margin: 5px;
}

.message-container {
	background: none;
	margin: 5px;
	width: 100%;
}

.content-area {
	color: rgb(255, 255, 255);
	background-color: rgba(0, 0, 0, 0.5);
	position: relative;
	overflow: hidden;
	/* height: 116px; */
	padding: 16px;
	border-radius: 16px;
}

.content-area header {
	display: flex;
	justify-content: space-between;
	padding-bottom: 8px;
	font-size: 12px;
}

.content-area .message-content {
	display: flex;
	flex-direction: column;
}

.content-area .message-content .sender {
	font-weight: bolder;
	line-height: 1.4;
}

.content-area .message-content .message {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
/*
.chat.active-chat {
	display: flex;
}

.chat {
	position: relative;
	display: none;
	overflow: hidden;
	padding: 0 35px 0px;
	justify-content: flex-end;
	flex-direction: column;
}

.conversation-start {
	position: relative;
	width: 100%;
	margin-bottom: 27px;
	text-align: center;
}
.bubble {
	font-size: 16px;
	position: relative;
	display: inline-block;
	clear: both;
	margin-bottom: 8px;
	padding: 13px 14px;
	vertical-align: top;
	border-radius: 5px;
}

.bubble::before {
	position: absolute;
	top: 19px;
	display: block;
	width: 8px;
	height: 6px;
	content: "\00a0";
	transform: rotate(29deg) skew(-35deg);
}

.bubble.you::before {
	left: -3px;
	background-color: #ffdd40;
}

.bubble.you {
	float: left;
	background-color: #ffdd40;
	align-self: flex-start;
}

.bubble.me::before {
	right: -3px;
	background-color: #eceff1;
}

.bubble.me {
	float: right;
	background-color: #eceff1;
	align-self: flex-end;
	animation-name: slideFromRight;
} */
</style>
