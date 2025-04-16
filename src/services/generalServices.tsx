import { isAxiosError } from 'axios';
import { axios } from '../utils';

export const pageAccumulator = async (page: string) => {
	try {
		await axios.post(`/admin/statistic`, { pageKey: page });
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};
