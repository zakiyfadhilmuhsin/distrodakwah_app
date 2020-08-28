<template>
	<q-btn flat dense round to="/inbox">
		<q-icon
			name="notification_important"
			color="red"
			class="bubble"
			v-if="newMessage"
		/>
		<q-icon name="notifications" v-else />

		<!-- <span v-if="newMessage" class="bubble">*</span> -->
	</q-btn>
</template>

<script>
import { apiDomain, getHeader,socketIoEndpoint } from "../../config";
import io from "socket.io-client";
let socket;

export default {
	data() {
		return {
			newMessage: false
		};
	},

	async created() {
		this.checkInboxState();
		this.initiateSocketIO();
	},
	destroyed() {
		socket.disconnect();
	},
	methods: {
		async checkInboxState() {
			const clientInboxState = localStorage.getItem("inboxState");
			const { data: serverInboxState } = await this.$axios.get(
				`${apiDomain}/identity/inbox/inbox-state`,
				{
					headers: getHeader()
				}
			);
			if (clientInboxState != serverInboxState) this.newMessage = true;
		},
		initiateSocketIO() {
			socket = io(socketIoEndpoint);
			socket.on("notify", message => {
				this.newMessage = true;
			});
		}
	}
};
</script>

<style scoped>
.bubble {
	border-radius: 100%;
	/* width: 0; */
	/* font-size: 20px; */
	/* text-align: center; */
	/* line-height: 100px; */
	/* font-family: sans-serif; */
	/* text-transform: uppercase; */
	animation: animate-pulse 3s linear infinite;
	cursor: pointer;
}

@keyframes animate-pulse {
	0% {
		box-shadow: 0 0 0 0 rgba(255, 109, 74, 0.7), 0 0 0 0 rgba(255, 109, 74, 0.7);
	}
	40% {
		box-shadow: 0 0 0 50px rgba(255, 109, 74, 0),
			0 0 0 0 rgba(255, 109, 74, 0.7);
	}
	80% {
		box-shadow: 0 0 0 50px rgba(255, 109, 74, 0),
			0 0 0 30px rgba(255, 109, 74, 0);
	}
	100% {
		box-shadow: 0 0 0 0 rgba(255, 109, 74, 0), 0 0 0 30px rgba(255, 109, 74, 0);
	}
}
</style>
