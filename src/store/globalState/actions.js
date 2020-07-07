import axios from 'axios';
import { apiDomain, getHeader } from '../../config'

export async function getUserProfile({commit}){
	try{
		const response = await axios.get(`${apiDomain}/auth/user`, {
			headers: getHeader()
		});
		const userProfile = response.data;
		commit('SET_USER_PROFILE', userProfile);
	} catch(error) {
		console.log('error while fetching user profile');
		console.log(error.message);
	}
}
