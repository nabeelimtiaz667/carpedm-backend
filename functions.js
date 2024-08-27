const TEST_CLIENT_KEY = "test_9322bfe87cc9b983e235635cc15d40e2a4db0148";
const PROD_CLIENT_KEY = "live_6e34a234be449f608524d6ddeb1c0d1486f22825";

const RESOURCES = {
    fees: "fees",
    tours: "tours",
    images: "images",
    places: "places",
    states: "states",
    videos: "videos",
    airports: "airports",
    features: "features",
    countries: "countries",
    languages: "languages",
    timezones: "timezones",
    activities: "activities",
    continents: "continents",
    departures: "departures",
    promotions: "promotions",
    transports: "transports",
    itineraries: "itineraries",
    image_bundles: "image_bundles",
    nationalities: "nationalities",
    packing_items: "packing_items",
    packing_lists: "packing_lists",
    rooming_lists: "rooming_lists",
    tour_dossiers: "tour_dossiers",
    accommodations: "accommodations",
    place_dossiers: "place_dossiers",
    service_levels: "service_levels",
    itinerary_media: "itinerary_media",
    tour_categories: "tour_categories",
    country_dossiers: "country_dossiers",
    dossier_features: "dossier_features",
    dossier_segments: "dossier_segments",
    override_reasons: "override_reasons",
    rooming_requests: "rooming_requests",
    activity_dossiers: "activity_dossiers",
    feature_categories: "feature_categories",
    single_supplements: "single_supplements",
    transport_dossiers: "transport_dossiers",
    itinerary_highlights: "itinerary_highlights",
    accommodation_dossiers: "accommodation_dossiers",
    "password_resets/profiles": "password_resets/profiles",
}

const getResources = async (resource = "", id = "") => {
    const response = await fetch(`https://rest.gadventures.com/${resource}/${id}`, {
        headers: {
            "X-Application-Key": TEST_CLIENT_KEY,
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate",
            "Connection": "keep-alive"
        }
    });

    return await response.json();
}

const fetchTours = async (value) => {
    try {
        const response = await fetch(`http://localhost/carpedm/index.php?req_res=get_tours&search=${value}`);
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

const fetchDepartures = async (value) => {
    try {
        if (typeof (value) == "string") {
            try {
                value = parseInt(value);
            } catch (err) {
                throw Error(err);
            }
        }

        const response = await fetch(`http://localhost/carpedm/index.php?req_res=get_departures&departure_id=${value}`);
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

// const fetchResource = async (value = { id: "", resource: "" }) => {
//     const { id, resource } = value
//     try {
//         const response = await fetch(`http://localhost/carpedm/index.php?req_res=get_resource&res_id=${id}&dossier_type=${resource}`);
//         return await response.json();
//     } catch (err) { console.error(err); }
// }

const createBooking = async (data = { currency: "", externalId: "" }) => {
    try {
        const response = await fetch(`http://localhost/carpedm/index.php?req_res=create_booking`, {
            headers: {
                'Content-Type': "application/json"
            },
            method: "POST",
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (err) { console.error(err); }
}

const getCustomer = async (id) => {
    try {
        const response = await fetch(`http://localhost/carpedm/index.php?req_res=get_customer&customer_id=${id}`);
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

const createCustomer = async (data = {
    "name": {
        "legal_first_name": null,
        "legal_last_name": null,
        "legal_middle_name": null,
        "common_name": null,
        "title": null
    },
    "date_of_birth": null,
    "place_of_birth": null,
    "nationality": {
        "id": null,
    },
    "passport": {
        "number": null,
        "issue_date": null,
        "expiry_date": null,
        "place_of_issue": null
    },
    "meal_preference": null,
    "meal_notes": null,
    "account_email": null,
    "phone_numbers": null,
    "emergency_contacts": {
        "first_name": null,
        "last_name": null,
        "phone_numbers": null
    },
    "address": {
        "street": null,
        "city": null,
        "state": null,
        "country": null,
        "postal_zip": null,
        "latitude": null,
        "longitude": null
    },
}) => {
    try {
        const response = await fetch(`http://localhost/carpedm/index.php?req_res=create_customer`, {
            headers: {
                'Content-Type': "application/json"
            },
            method: "POST",
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (err) { console.error(err); }
}

const updateCustomer = async (data = { cust_id: "", cust_data: {} }) => {
    try {
        const response = await fetch(`http://localhost/carpedm/index.php?req_res=update_customer`, {
            headers: {
                'Content-Type': "application/json"
            },
            method: "PATCH",
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (err) { console.error(err); }
}

const bookDeparture = async (data = {
    booking_id: "",
    product_id: "",
    customers: [{ id: "" }]
}) => {
    try {
        const response = await fetch(`http://localhost/carpedm/index.php?req_res=book_departure`, {
            headers: {
                'Content-Type': "application/json"
            },
            method: "POST",
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (err) { console.error(err); }
}

const updateDeparture = async (data = { departure_id: "", update: {} }) => {
    try {
        const response = await fetch(`http://localhost/carpedm/index.php?req_res=update_departure`, {
            headers: {
                'Content-Type': "application/json"
            },
            method: "PATCH",
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (err) { console.error(err); }
}

// This is search page api user will search something and its data will be passed to this api
// The result of this api will be displayed in form of tiles on results page
fetchTours("kenya").then((res) => console.log(res.data.results));

// This api is for display tour details on next page. You can get id of a tour in the results json object -
// - from previous page.
// This function getResources() is also used to fetch other resources like countries, activities, etc.
// Refer to RESOURCES variable above.
getResources(RESOURCES.tour_dossiers, "25242").then((res) => console.log(res));

// Once user is ready to book tour, they will be displayed all the available departures on this page.
// User will select one of the departures for the booking and you will save the id for that departure
fetchDepartures("1274257").then((res) => console.log(res));

// Once a user selects a departure, their booking will be created. Data in this function will not change.
// This booking will return a booking_id. 
createBooking({ currency: "USD", externalId: "CARPADEM" }).then((res) => console.log(res));

// Once customer selects no of travellers and input their details, you will send their data in this function.
// For multiple traveller under one tour, this function will be called every single time for each customer -
// - travelling. This will return customer_id for each and every customer.
createCustomer({
    "name": {
        "legal_first_name": "G",
        "legal_last_name": "Corp",
        "title": "Mr"
    },
    "date_of_birth": "1980-10-05",
    "account_email": "g.corp@gadventures.com",
    "nationality": {
        "id": "40",
    },
}).then((res) => console.log(res));

// Finally, you will enter the booking_id, departure_id, and all the customer_id here. You can see customer -
// - data is taken in array format, even if only one customer is present.
bookDeparture({ booking_id: "2212902", product_id: "1274257", customers: [{ id: "5449000" }] }).then((res) => console.log(res));

// Once a departure is booked, and once user has payed the fee, the admin will confirm the booking with -
// - function
updateDeparture({ departure_id: "1274257", update: { status: "Confirmed" } }).then((res) => console.log(res));

// If a particular departure requires any more user information, you will get the object of remaining info -
// - from bookDeparture() method, and you can fulfill those information by updating exisiting customer info -
// - from this method, just input the customer_id
updateCustomer({ cust_id: "5388151", cust_data: { name: { legal_middle_name: "Doe" } } }).then((res) => console.log(res));

// If you want to see complete info for a particular customer you can see by giving customer id here
getCustomer("5388132").then((res) => console.log(res));