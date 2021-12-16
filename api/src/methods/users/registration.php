<?php

require_once __DIR__ . '/../../db.php';
require_once __DIR__ . '/../../api.php';

$loginPattern = "/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-_]{4,15}$/i";
$passwordPattern = "/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i";

function generateSalt()
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < 16; ++$i) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

$api->addMethod("users.registration", function () use ($loginPattern, $passwordPattern, $db) {
    $login = $_GET["login"];
    $password = $_GET["password"];

    if (preg_match($loginPattern, $login) === 0 || preg_match($passwordPattern, $password) === 0) {
        throw new APIException(5);
    }

    $randomSalt = generateSalt();
    $staticSalt = $_ENV['STATIC_PASSWORD_SALT'];
    $passwordHash = hash("sha512", "{$password}_{$staticSalt}_{$randomSalt}");

    $query = "INSERT INTO users (login, passwordHash, passwordSalt) VALUES (?, ?, ?)";
    $command = mysqli_prepare($db->connection, $query);
    $command->bind_param("sss", $login, $passwordHash, $randomSalt);

    if (!$command->execute()) {
        $error = $command->error;
        if (str_contains($error, "Duplicate entry")) {
            throw new APIException(6);
        } else {
            throw new APIException(1);
        }
    }

    return (object) array("success" => 1);
}, ["login", "password"]);
