<?php
require_once "api.php";

function getTours()
{
    if (!isset($_GET['search'])) {
        response(400, "Empty search string");
        return;
    }
    $search = $_GET['search'];
    $date = date("Y-m-d");
    $curl = create_curl_session("tour_dossiers?name__like=$search&departures_end_date__gt=$date");
    $response = curl_exec($curl);
    curl_close($curl);

    if ($response) {
        response(200, $response);
    } else {
        response(404, "Tour not found");
    }
}

function getDepartures()
{
    if (!isset($_GET['departure_id'])) {
        response(400, "Departure ID is missing.");
        return;
    }
    $id = $_GET['departure_id'];
    $curl = create_curl_session("departures/$id");
    $response = curl_exec($curl);
    curl_close($curl);

    if ($response) {
        response(200, $response);
    } else {
        response(404, "Departure not found");
    }
}

function getResource()
{
    if (!isset($_GET['dossier_type'])) {
        response(400, "Dossier type is missing.");
        return;
    }

    if (!isset($_GET['res_id'])) {
        response(400, "Resource ID is missing.");
        return;
    }

    $id = $_GET["res_id"];
    $info["dossier"] = "";
    $info["details"] = "";

    switch ($_GET['dossier_type']) {
        case "activity":
            $info["dossier"] = "activity_dossiers";
            $info["details"] = "activities";
            break;
        case "accommodation":
            $info["dossier"] = "accommodation_dossiers";
            $info["details"] = "accommodations";
            break;
        case "transport":
            $info["dossier"] = "transport_dossiers";
            $info["details"] = "transports";
            break;
        default:
            response(404, "Requested resource does not exists.");
            break;
    }

    $dossier = create_curl_session($info["dossier"] . "/$id");
    $doss_response = curl_exec($dossier);
    curl_close($dossier);

    $details = create_curl_session($info["details"] . "/$id");
    $deta_response = curl_exec($details);
    curl_close($details);

    if ($doss_response != null && $deta_response != null) {
        $response["dossier"] = $doss_response;
        $response["details"] = $deta_response;
        response(200, $doss_response);
    } else {
        response(404, "Requested resource not found.");
    }
}

function createBooking($data)
{
    if (!isset($data->currency)) {
        response(400, "Currency type is missing.");
        return;
    }

    if (!isset($data->externalId)) {
        response(400, "Currency type is missing.");
        return;
    }

    $curl = create_curl_session("bookings");
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode(["currency" => $data->currency, "external_id" => $data->externalId]));
    $response = curl_exec($curl);
    if ($response) {
        response(200, $response);
    } else {
        response(400, "Bad Request");
    }
}

function getCustomer()
{
    if (!isset($_GET['customer_id'])) {
        response(400, "Customer ID is missing.");
        return;
    }
    $id = $_GET['customer_id'];
    $curl = create_curl_session("customers/$id");
    $response = curl_exec($curl);
    curl_close($curl);

    if ($response) {
        response(200, $response);
    } else {
        response(404, "Customer not found");
    }
}

function createCustomer($data)
{
    $curl = create_curl_session("customers");
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
    $response = curl_exec($curl);
    if ($response) {
        response(200, $response);
    } else {
        response(400, "Bad Request");
    }
}

function updateCustomerInfo($data)
{
    if (!isset($data->cust_id)) {
        response(400, "Customer ID is missing.");
        return;
    }
    $curl = create_curl_session("customers/$data->cust_id");
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PATCH');
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data->cust_data));
    $response = curl_exec($curl);
    if ($response) {
        response(200, $response);
    } else {
        response(400, "Bad Request");
    }
}

function setDepartureService($data)
{
    if (!isset($data->booking_id) || !isset($data->product_id) || !isset($data->customers)) {
        response(400, "Some of the required fields are missing.");
        return;
    }
    $obj = [
        "booking" => ["id" => $data->booking_id],
        "product" => ["id" => $data->product_id],
        "customers" => $data->customers
    ];
    $curl = create_curl_session("departure_services");
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($obj));
    $response = curl_exec($curl);
    if ($response) {
        response(200, $response);
    } else {
        response(400, "Bad Request");
    }
}

function updateDeparture($data)
{
    if (!isset($data->departure_id)) {
        response(400, "Departure ID is missing.");
        return;
    }
    $id = $data->departure_id;
    $updateData = $data->update;
    $curl = create_curl_session("departure_services/$id");
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PATCH');
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($updateData));
    $response = curl_exec($curl);
    if ($response) {
        response(200, $response);
    } else {
        response(400, "Bad Request");
    }
}

function response($statusCode, $data)
{
    http_response_code($statusCode);
    $json_data = $statusCode == 200 ? ["data" => json_decode($data)] : ["error" => $data];
    echo json_encode($json_data) . PHP_EOL;
}
