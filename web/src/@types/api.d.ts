declare namespace API {
    type RequestParams = Array<{ key: string; value: string; }>;

    type SuccessResponse = { success: 1 };

    namespace Users {
        interface RegistrationParams {
            login: string;
            password: string;
        }
    }

    namespace Sessions {
        interface CreateParams {
            login: string;
            password: string;
        }

        interface CreateResponse {
            login: string;
            token: string;
            created: Date;
        }

        interface InfoParams {
            token?: string;
        }

        interface InfoResponse {
            id: number;
            login: string;
            created: Date;
            ip: string;
        }

        interface ResetParams {
            token?: string;
        }
    }
}
