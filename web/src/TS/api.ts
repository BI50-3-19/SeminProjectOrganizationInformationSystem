import axios from "axios";

class APIError extends Error {
	public code: number;
	public method: string;
	public requestParams: API.RequestParams;

	public constructor({ message, code, method, requestParams }: { code: number; message: string; method: string; requestParams: API.RequestParams}) {
		super(message);
		this.name = this.constructor.name;
		this.code = code;
		this.method = method;
		this.requestParams = requestParams;
		Error.captureStackTrace(this, this.constructor);
	}

	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	public toJSON(): Pick<this, keyof this> {
		const json = {} as Pick<this, keyof this>;

		for (const key of Object.getOwnPropertyNames(this)) {
			json[key as keyof this] = this[key as keyof this];
		}

		return json;
	}
}

class API {
	constructor(private apiUrl = "http://176.113.82.100/index.php") {}

	public async call(method: string, params: Record<string, string> = {}) {
		const response = await axios.get(this.apiUrl, {
			params: {
				...params,
				method,
			},
		});

		if (response.data.error) {
			const error = response.data.error;
			throw new APIError({ code: error.code, message: error.message, method, requestParams: error.requestParams });
		} else {
			return response.data.response;
		}
	}
}

export default API;
