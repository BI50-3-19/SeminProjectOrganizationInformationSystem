<?php

require_once __DIR__ . '/../api.php';

$api->addMethod("status", function () {
    $ip = null;
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }

    return (object) array(
        'date' => date("Y-m-d H:i:s"),
        'uptime' => floatval(@file_get_contents('/proc/uptime')),
        'ip' => $ip
    );
});
