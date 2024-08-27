<?php
require_once "config.php";

function create_curl_session($resource)
{
    $curl_session = curl_init(URL . $resource);
    // Set the CURLOPT_RETURNTRANSFER option to true
    curl_setopt($curl_session, CURLOPT_RETURNTRANSFER, true);
    // Set custom headers for GAdventures Auth and Content-Type header
    curl_setopt($curl_session, CURLOPT_HTTPHEADER, [
        'X-Application-Key: ' . SANDBOX_SECRET,
        'Content-Type: application/json',
        'Accept: application/json',
        'Accept-Encoding: gzip, deflate',
        'Connection: keep-alive'
    ]);

    return $curl_session;
}