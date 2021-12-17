<?php

require_once __DIR__ . '/../api.php';

$api->addMethod("errors.get", function () {
    return array_map(function ($elem, $key) {
        return (object) array('code' => $key, 'message' => $elem);
    }, APIException::ERRORS, array_keys(APIException::ERRORS));
});
