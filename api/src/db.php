<?php

class DB
{
    private mysqli $connect;

    function __construct(string $host, string $login, string $password, int $port)
    {
        $this->connect = mysqli_connect($host, $login, $password, null, $port);
    }

    function exec(string $query): mysqli_result
    {
        $result = mysqli_query($this->connect, $query);
        if ($result === false) {
            throw new Exception("SQL query failed");
        } else {
            return $result;
        }
    }
}

$db = new DB($_ENV['DB_HOST'], $_ENV['DB_LOGIN'], $_ENV['DB_PASSWORD'], $_ENV['DB_PORT']);
