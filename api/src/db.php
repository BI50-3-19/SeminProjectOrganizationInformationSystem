<?php

class DB
{
    public mysqli $connection;

    function __construct(string $host, string $login, string $password, string $database, int $port)
    {
        $this->connection = mysqli_connect($host, $login, $password, $database, $port);
    }
}

$db = new DB($_ENV['DB_HOST'], $_ENV['DB_LOGIN'], $_ENV['DB_PASSWORD'], $_ENV['DB_DATABASE'],  $_ENV['DB_PORT']);
