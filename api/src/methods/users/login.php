<?php

require_once __DIR__ . '/../../db.php';
require_once __DIR__ . '/../../api.php';

$loginPattern = "/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-_]{4,15}$/i";
$passwordPattern = "/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i";

$api->addMethod("users.login", function () use ($loginPattern, $passwordPattern, $db) {
    $login = $_GET["login"];
    $password = $_GET["password"];

    if (preg_match($loginPattern, $login) === 0 || preg_match($passwordPattern, $password) === 0) {
        throw new Exception("Login or password does not meet security requirements");
    }

    $query = "SELECT passwordSalt FROM users WHERE login=?";
    $command = mysqli_prepare($db->connection, $query);
    $command->bind_param("s", $login);

    if (!$command->execute()) {
        throw new Exception("Unhandled exception, contact your system administrator");
    }

    $result = $command->get_result();

    if (mysqli_num_rows($result) === 0) {
        throw new Exception("Login or password is incorrect");
    }

    $staticSalt = $_ENV['STATIC_PASSWORD_SALT'];
    $randomSalt = $result->fetch_assoc()["passwordSalt"];
    $passwordHash = hash("sha512", "{$password}_{$staticSalt}_{$randomSalt}");

    $query = "SELECT ID, login FROM users WHERE login=? AND passwordHash=?";
    $command = mysqli_prepare($db->connection, $query);
    $command->bind_param("ss", $login, $passwordHash);

    if (!$command->execute()) {
        throw new Exception("Unhandled exception, contact your system administrator");
    }

    $result = $command->get_result();

    if (mysqli_num_rows($result) === 0) {
        throw new Exception("Login or password is incorrect");
    }

    $user = $result->fetch_assoc();

    return (object) $user;
}, ["login", "password"]);
