<?php

require_once __DIR__ . '/../../db.php';
require_once __DIR__ . '/../../api.php';

$loginPattern = "/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-_]{4,15}$/i";
$passwordPattern = "/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i";

function  generateToken(): string
{
    global $db;

    $characters = 'defbca1234567890';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < 85; ++$i) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }

    $query = "SELECT * FROM `sessions` WHERE `token` = ?";
    $command = mysqli_prepare($db->connection, $query);
    $command->bind_param("s", $randomString);

    $command->execute();

    $result = $command->get_result();

    if (mysqli_num_rows($result) === 0) {
        return $randomString;
    } else {
        return generateToken();
    }
}

$api->addMethod("sessions.create", function () use ($loginPattern, $passwordPattern, $db) {
    $login = $_GET["login"];
    $password = $_GET["password"];

    if (preg_match($loginPattern, $login) === 0 || preg_match($passwordPattern, $password) === 0) {
        throw new APIException(5);
    }

    $query = "SELECT `passwordSalt` FROM `users` WHERE `login`=?";
    $command = mysqli_prepare($db->connection, $query);
    $command->bind_param("s", $login);

    if (!$command->execute()) {
        throw new APIException(1);
    }

    $result = $command->get_result();

    if (mysqli_num_rows($result) === 0) {
        throw new APIException(7);
    }

    $staticSalt = $_ENV['STATIC_PASSWORD_SALT'];
    $randomSalt = $result->fetch_assoc()["passwordSalt"];
    $passwordHash = hash("sha512", "{$password}_{$staticSalt}_{$randomSalt}");

    $query = "SELECT `ID`, `login` FROM `users` WHERE `login`=? AND `passwordHash`=?";
    $command = mysqli_prepare($db->connection, $query);
    $command->bind_param("ss", $login, $passwordHash);

    if (!$command->execute()) {
        throw new APIException(1);
    }

    $result = $command->get_result();

    if (mysqli_num_rows($result) === 0) {
        throw new APIException(7);
    }

    $user = $result->fetch_assoc();

    $ip = null;
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }

    $sessionToken = generateToken();
    $created = date('Y-m-d H:i:s');
    $query = "INSERT INTO `sessions` (`token`, `userId`, `created`, `ip`) VALUES (?, ?, ?, ?)";
    $command = mysqli_prepare($db->connection, $query);
    $command->bind_param("siss", $sessionToken, $user["ID"], $created, $ip);

    $command->execute();

    return (object) array('login' => $user["login"], 'ID' => $user["ID"], 'token' => $sessionToken, 'created' => $created);
}, ["login", "password"]);
