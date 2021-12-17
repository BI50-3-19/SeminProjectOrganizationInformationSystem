<?php

class APIException extends Exception
{
    private const ERRORS = array(
        0 => "Unprocessed error, contact your system administrator",
        1 => "Unhandled exception, contact your system administrator",
        2 => "Method not specified",
        3 => "One of the required parameters is not transmitted",
        4 => "Method not found",
        5 => "Login or password does not meet security requirements",
        6 => "A user with this login already exists",
        7 => "Login or password is incorrect"
    );

    public int $apiErrorCode;

    public function __construct($errorCode = 1, $message = null)
    {
        if (array_key_exists($errorCode, SELF::ERRORS)) {
            $this->apiErrorCode = $errorCode;
        } else {
            $this->apiErrorCode = 1;
        }

        if ($message !== null) {
            parent::__construct($message);
        } else {
            parent::__construct($this->getError());
        }
    }

    public function getError()
    {
        return self::ERRORS[$this->apiErrorCode];
    }

    public function getErrorCode()
    {
        return $this->apiErrorCode;
    }

    public function getErrorsList()
    {
        return self::ERRORS;
    }
}
