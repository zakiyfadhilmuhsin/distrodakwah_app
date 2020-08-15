import axios from 'axios';
import { apiDomain, getHeader } from '../config';

const getVoucherByCode = async (form) => {
	return new Promise(async (resolve, reject) => {
		let voucherRes;
		try {
			voucherRes = await axios({
				method: 'get',
				url: `${apiDomain}/voucher/vouchers/user-get-voucher-by-code`,
				params: form,
				headers: getHeader()
			})
		} catch (error) {
			console.log("error fetching voucher");
			reject(error)
		}
		resolve(voucherRes);
	})
}

export {
	getVoucherByCode
}
