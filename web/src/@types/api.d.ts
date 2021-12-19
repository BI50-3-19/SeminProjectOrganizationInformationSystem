declare namespace API {
    type RequestParams = Array<{ key: string; value: string; }>;
    type RequiredToken = { token?: string };
    type SuccessResponse = { success: 1 };

    namespace Users {
        interface RegistrationParams {
            login: string;
            password: string;
        }

        interface GetResponse {
            id: number;
            login: string;
            regDate: Date;
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
        
        interface InfoResponse {
            id: number;
            login: string;
            created: Date;
            ip: string;
        }
    }
}
