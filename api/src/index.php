<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';
require_once "APIException.php";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

try {
    require_once 'db.php';
    require_once 'api.php';

    require_once __DIR__ . '/methods/status.php';
    require_once __DIR__ . '/methods/errors.php';

    require_once __DIR__ . '/methods/users/get.php';
    require_once __DIR__ . '/methods/users/registration.php';

    require_once __DIR__ . '/methods/sessions/create.php';
    require_once __DIR__ . '/methods/sessions/reset.php';
    require_once __DIR__ . '/methods/sessions/info.php';

    if (!array_key_exists("method", $_GET)) {
        throw new APIException(2);
    }

    $method = $api->findMethod($_GET["method"]);

    $handler = $method[1];
    $requiredParams = $method[2];

    for ($i = 0; $i < count($requiredParams); ++$i) {
        if (!array_key_exists($requiredParams[$i], $_GET)) {
            throw new APIException(3);
        }
    }

    return $api->response($handler());
} catch (APIException $error) {
    $response = (object) array(
        'message' => $error->getMessage(),
        'code' => $error->apiErrorCode,
        'request_params' => array_map(function ($param) {
            return (object) array('key' => $param, 'value' => $_GET[$param]);
        }, array_keys($_GET))
    );
    echo json_encode((object) array('error' => $response));
} catch (Exception $err) {
    $error = new APIException(0, $err->getMessage());
    $response = (object) array(
        'message' => $error->getError(),
        'code' => $error->apiErrorCode,
        'request_params' => array_map(function ($param) {
            return (object) array('key' => $param, 'value' => $_GET[$param]);
        }, array_keys($_GET))
    );
    echo json_encode((object) array('error' => $response));
}
