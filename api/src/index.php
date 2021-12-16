<?php
declare(strict_types = 1);

require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

try {
    require_once 'db.php';
    require_once 'api.php';

    if (!array_key_exists("method", $_GET)) {
        throw new Exception("Method not specified");
    }

    $method = $api->findMethod($_GET["method"]);

    $obj = (object) Array('response' => $method());

    echo $api->response($obj);
} catch (Exception $e) {
    $response = (object) Array('error' => $e->getMessage(), 'request_params' => array_map(function ($param) {
        return (object) Array('key' => $param, 'value' => $_GET[$param]);
    }, array_keys($_GET)));
    echo json_encode($response);
}