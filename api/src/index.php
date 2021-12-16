<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

try {
    require_once 'db.php';
    require_once 'api.php';

    require_once __DIR__ . '/methods/status.php';
    require_once __DIR__ . '/methods/users/registration.php';

    if (!array_key_exists("method", $_GET)) {
        throw new Exception("Method not specified");
    }

    $method = $api->findMethod($_GET["method"]);

    $handler = $method[1];
    $requiredParams = $method[2];

    for ($i = 0; $i < count($requiredParams); ++$i) {
        if (!array_key_exists($requiredParams[$i], $_GET)) {
            throw new Exception("One of the required parameters is not transmitted");
        }
    }

    return $api->response($handler());
} catch (Exception $e) {
    $response = (object) array('error' => $e->getMessage(), 'request_params' => array_map(function ($param) {
        return (object) array('key' => $param, 'value' => $_GET[$param]);
    }, array_keys($_GET)));
    return $api->response($response);
}
