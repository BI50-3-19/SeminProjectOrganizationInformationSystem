<?php

require_once __DIR__ . '/../../db.php';
require_once __DIR__ . '/../../api.php';

$api->addMethod("sessions.info", function () use ($db) {
    $token = $_GET["token"];

    $query = "SELECT * FROM `sessions` WHERE `token`=?";
    $command = mysqli_prepare($db->connection, $query);
    $command->bind_param("s", $token);

    if (!$command->execute()) {
        throw new APIException(1);
    }

    $result = $command->get_result();

    if (mysqli_num_rows($result) === 0) {
        throw new APIException(8);
    }

    $tokenInfo = $result->fetch_assoc();

    $userId = $tokenInfo["userId"];

    $query = "SELECT `login`, `regDate` FROM `users` WHERE `ID`=?";
    $command = mysqli_prepare($db->connection, $query);
    $command->bind_param("i", $userId);

    if (!$command->execute()) {
        throw new APIException(1);
    }

    $result = $command->get_result();
    $userInfo = $result->fetch_assoc();

    return (object) array(
        'id' => $userId,
        'login' => $userInfo['login'],
        'created' => $tokenInfo['created'],
        'ip' => $tokenInfo["ip"]
    );
}, ["token"]);
