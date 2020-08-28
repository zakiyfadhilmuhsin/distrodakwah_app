import axios from 'axios';
import { apiDomain, getHeader } from '../config';

const getBroadcastMessage = async (form) => {
	return new Promise(async (resolve, reject) => {
		let response;
		try {
			response = await axios({
				method: 'get',
				url: `${apiDomain}/identity/inbox/get-older-broadcast-message`,
				params: form,
				headers: getHeader()
			})
		} catch (error) {
			console.log("error fetching message");
			reject(error)
		}
		resolve(response);
	})
}

const inboxStateCheck = async () => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${apiDomain}/identity/inbox/inbox-state`,
				{
					headers: getHeader()
				})
			.then((response) => {
				resolve(response)
			}
			).catch();
	})
}

export {
	inboxStateCheck,
	getBroadcastMessage
}
