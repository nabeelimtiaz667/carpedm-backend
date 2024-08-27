<?php
require "functions.php";

$requestMethod = $_SERVER['REQUEST_METHOD'];
$inputData = json_decode(file_get_contents("php://input"));

if (!isset($_GET['req_res'])) {
    response(400, "Requested resource missing.");
    return;
}

switch ($requestMethod) {
    case 'GET':
        switch ($_GET['req_res']) {
            case 'get_tours':
                getTours();
                break;
            case 'get_departures':
                getDepartures();
                break;
            case 'get_resource':
                getResource();
                break;
            case 'get_customer':
                getCustomer();
                break;
            default:
                response(405, "Method not Allowed.");
                break;
        }
        break;
    case "POST":
        switch ($_GET['req_res']) {
            case 'create_booking':
                createBooking($inputData);
                break;
            case 'create_customer':
                createCustomer($inputData);
                break;
            case 'book_departure':
                setDepartureService($inputData);
                break;
            default:
                response(405, "Method Not Allowed.");
                break;
        }
        break;
    case "PATCH":
        switch ($_GET['req_res']) {
            case 'update_departure':
                updateDeparture($inputData);
                break;
            case 'update_customer':
                updateCustomerInfo($inputData);
                break;
            default:
                response(405, "Method Not Allowed.");
                break;
        }
        break;
}
