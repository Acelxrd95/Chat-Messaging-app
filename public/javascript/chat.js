/** @format */

var socket = io();

const chatlist = {
	data() {
		return {
			recents: [
				{
					name: "Ace",
					pfp: "http://placekitten.com/32/32",
					altpfp: "Ace Profile Picture",
				},
				{
					name: "Mohamed",
					pfp: "http://placekitten.com/32/32",
					altpfp: "Mohamed Profile Picture",
				},
				{
					name: "Ali",
					pfp: "http://placekitten.com/32/32",
					altpfp: "Ali Profile Picture",
				},
				{
					name: "Saeed",
					pfp: "http://placekitten.com/32/32",
					altpfp: "Saeed Profile Picture",
				},
			],
		};
	},
};
Vue.createApp(chatlist).mount("#recentchats");
const chats = {
	data() {
		return {
			chat: [],
			msginpt: "",
		};
	},
	methods: {
		checktrail() {
			for (let i = 0; i < this.chat.length; i++) {
				const element = this.chat[i];
				if (this.chat[i - 1]) {
					const prevelem = this.chat[i - 1];
					if (prevelem.name == element.name) {
						this.chat[i].trailingmsg = true;
					} else {
						this.chat[i].trailingmsg = false;
					}
				}
			}
		},
		addmsg: function (msgrec) {},
		sendmsg() {
			var msgcontent = {
				name: "Ace",
				pfp: "http://placekitten.com/32/32",
				altpfp: "Ace Profile Picture",
				msg: this.msginpt,
				attachment: null,
				trailingmsg: false,
			};
			// this.chat.push(msg);

			// fetch("./chat/api/sendmsg", {
			// 	method: "POST",
			// 	headers: { "Content-type": "application/json" },
			// 	body: JSON.stringify(msgcontent),
			// }).then((this.msginpt = null));
			socket.emit("message", msgcontent);
		},
	},
	created() {
		fetch("./chat/api/getmsgs", {
			method: "POST",
			headers: { "Content-type": "application/json" },
		})
			.then((response) => response.json())
			.then((data) => {
				this.chat = data;
			});
	},
	mounted() {
		var vm = this;
		socket.on("message", (message) => {
			vm.chat.push(message);
		});
	},
};
Vue.createApp(chats).mount("#mainchat");
const usersettings = {
	data() {
		return {
			user: {
				name: "Ace",
				pfp: "http://placekitten.com/32/32",
				altpfp: "Ace Profile Picture",
			},
			settings: {},
		};
	},
};
Vue.createApp(usersettings).mount("#usersettings");
