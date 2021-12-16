<?php

require_once __DIR__ . '/../api.php';

$api->addMethod("status", function () {
    return (object) array(
        'date' => date("Y-m-d H:i:s"),
        'uptime' => floatval(@file_get_contents('/proc/uptime'))
    );
});
