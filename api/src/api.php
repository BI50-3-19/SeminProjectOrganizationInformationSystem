<?php

class API {
    private array $methods = Array();

    function response(object $param): void {
        echo json_encode($param);
    }

    function addMethod(string $method, $handler): void {
        $newMethod = array($method, $handler);
        array_push($this->methods, $newMethod);
    }

    function findMethod(string $method) {
        $handlerIndex = array_search($method, array_column($this->methods, 0));
        if ($handlerIndex === false) {
            throw new Exception("Method {$method} not found");
        } else {
            return $this->methods[$handlerIndex][1];
        }
    }
}

$api = new API();