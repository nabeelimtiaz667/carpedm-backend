// const displayTours = (resultArr, div) => {
//     if (!Array.isArray(resultArr))
//         return;
//     if (resultArr.length > 0) {
//         const tour = resultArr.pop();
//         div.innerHTML += `
//             <div class="item-details">
//                 <h3>Tour Name: <span>${tour.name}</span></h3>
//                 <h5>Departures Starting from: <span>${tour.departures_start_date}</span></h5>
//                 <h5>Departures Ending On: <span>${tour.departures_end_date}</span></h5>
//             </div>
//         `
//         div = displayTours(resultArr, div);
//     }
//     return div;
// }

// const fetchTours = (e) => {
//     const value = document.getElementById('tour').value;
//     if (value.length < 1) {
//         alert("Please type something before searching.");
//         return;
//     }
//     e.target.classList.add("disable")
//     e.target.disabled = true;
//     let container = document.querySelector('.app');
//     container.textContent = "Loading...";
//     fetch(`http://localhost/carpedm/index.php?req_res=get_tours&search=${value}`)
//         .then((res) => res.json())
//         .then((result) => JSON.parse(result.data))
//         .then((data) => {
//             container.textContent = "";
//             container = displayTours(data.results, container);
//         })
//         .catch((err) => console.error(err))
//         .finally(() => {
//             e.target.classList.remove("disable")
//             e.target.disabled = false;
//         });
// }

// getResources(RESOURCES.tour_dossiers, "24552").then((res) => console.log(res));
fetchTours("kenya").then((res) => console.log(res));
// fetchDepartures("25458").then((res) => console.log(res));
// fetchResource({ id: "51", resource: "transport" }).then((res) => console.log(res));
// createBooking({ currency: "USD", externalId: "CARPADEM" }).then((res) => console.log(res));
// createCustomer({
//     "name": {
//         "legal_first_name": "G",
//         "legal_last_name": "Corp",
//         "title": "Mr"
//     },
//     "date_of_birth": "1980-10-05",
//     "account_email": "g.corp@gadventures.com",
//     "nationality": {
//         "id": "40",
//     },
// }).then((res) => console.log(res));
// bookDeparture({ booking_id: "2198492", product_id: "1274253", customers: [{ id: "5388102" }] }).then((res) => console.log(res));
// updateDeparture({ departure_id: "6190629", update: { status: "Confirmed" } }).then((res) => console.log(res));
// updateCustomer({ cust_id: "5388102", cust_data: { name: { legal_first_name: "John", legal_middle_name: "Doe" } } }).then((res) => console.log(res));