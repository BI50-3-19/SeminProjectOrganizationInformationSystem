<?php

class API
{
    private array $methods = [];

    function response(object | array $response): void
    {
        $obj = (object) array('response' => $response);
        echo json_encode($obj);
    }

    function addMethod(string $method, $handler, array $requiredParams = []): void
    {
        $newMethod = array($method, $handler, $requiredParams);
        array_push($this->methods, $newMethod);
    }

    function findMethod(string $method)
    {
        $handlerIndex = array_search($method, array_column($this->methods, 0));
        if ($handlerIndex === false) {
            throw new APIException(4, "Method {$method} not found");
        } else {
            return $this->methods[$handlerIndex];
        }
    }
}

$api = new API();
