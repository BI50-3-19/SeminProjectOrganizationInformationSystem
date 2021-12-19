import axios from "axios";
import moment from "moment";

class APIError extends Error {
  public code: number;
  public method: string;
  public requestParams: API.RequestParams;

  public constructor({
    message,
    code,
    method,
    requestParams,
  }: {
    code: number;
    message: string;
    method: string;
    requestParams: API.RequestParams;
  }) {
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

class UsersAPI {
  constructor(private api: API) {}

  public async registration({
    login,
    password,
  }: API.Users.RegistrationParams): Promise<API.SuccessResponse> {
    return this.api.call("users.get", { login, password });
  }
}

class SessionsAPI {
  constructor(private api: API) {}

  public async create({
    login,
    password,
  }: API.Sessions.CreateParams): Promise<API.Sessions.CreateResponse> {
    const response = await this.api.call("sessions.create", {
      login,
      password,
    });

    return {
      ...response,
      created: moment(response.created, "YYYY-MM-DD HH:mm:ss").toDate(),
    };
  }

  public async info({
    token,
  }: API.Sessions.InfoParams): Promise<API.Sessions.InfoResponse> {
    const response = await this.api.call("sessions.info", {
      token: token || this.api.token || "",
    });

    return {
      ...response,
      id: Number(response.id),
      created: moment(response.created, "YYYY-MM-DD HH:mm:ss").toDate(),
    };
  }

  public async reset({
    token,
  }: API.Sessions.ResetParams): Promise<API.SuccessResponse> {
    return this.api.call("sessions.info", {
      token: token || this.api.token || "",
    });
  }
}

class API {
  constructor(
    private apiUrl = "http://176.113.82.100/index.php",
    public token?: string
  ) {}

  public users = new UsersAPI(this);
  public sessions = new SessionsAPI(this);

  public async call(method: string, params: Record<string, string> = {}) {
    const response = await axios.get(this.apiUrl, {
      params: {
        ...params,
        method,
      },
    });

    if (response.data.error) {
      const error = response.data.error;
      throw new APIError({
        code: error.code,
        message: error.message,
        method,
        requestParams: error.requestParams,
      });
    } else {
      return response.data.response;
    }
  }
}

export default API;
