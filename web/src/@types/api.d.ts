declare namespace API {
    type RequestParams = Array<{ key: string; value: string; }>;

    type SuccessResponse = { success: 1 };

    namespace Users {
        interface RegistrationParams {
            login: string;
            password: string;
        }
    }
}
