import axios from "axios";

class API {
	constructor(private apiUrl = "http://176.113.82.100/index.php") {}

	public async call(method: string, params: Record<string, string> = {}) {
		const response = await axios.get(this.apiUrl, {
			params: {
				...params,
				method,
			},
		});

		return response.data.response;
	}
}

export default API;
