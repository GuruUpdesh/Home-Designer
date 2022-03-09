import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";

const Addresses = () => {
	const title = "Addresses";
	const entity = "address";
	const template = {
		attributes: [
			"id",
			"address",
			"client",
			"status",
			"date started",
			"date complete",
			"projects",
		],
		dataKeys: [
			"addressID",
			"address",
			"cID",
			"status",
			"dateStarted",
			"dateComplete",
			"projects",
		],
		dataTypes: ["id", "text", "select", "status", "date", "date", "list"],
		create: ["none", "text", "select", "none", "none", "none", "none"],
	};

	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		getAddressRows();
	}, []);

	useEffect(() => {
		console.log(tableData);
	}, [tableData]);

	const getAddressRows = async () => {
		await fetch(`${process.env.REACT_APP_API_URL}/addresses`, {
			method: "GET",
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setTableData(data);
				});
			}
		});
	};

	const addAddress = async (values) => {
		console.log(values);
		await fetch(`${process.env.REACT_APP_API_URL}/addresses`, {
			method: "PUT",
			body: JSON.stringify({
				address: values.address,
				dateStarted: values.dateStarted,
				dateComplete: values.dateComplete,
				cID: values.client,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setTableData(data);
				});
			}
		});
	};

	const editAddressRow = async (index, values) => {
		console.log(values);
	};

	const deleteAddressRow = async (index, id) => {
		await fetch(`${process.env.REACT_APP_API_URL}/addresses`, {
			method: "DELETE",
			body: JSON.stringify({ id: id }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				getAddressRows();
			}
		});
	};
	return (
		<div className='clients'>
			<Table
				title={title}
				entity={entity}
				template={template}
				tableData={tableData}
				addRow={addAddress}
				editRow={editAddressRow}
				deleteRow={deleteAddressRow}
			/>
		</div>
	);
};

export default Addresses;

// const addressesContent = {
// 	title: "Addresses",
// 	entity: "address",
// 	template: {
// 		attributes: ["address", "client", "complete", "date started", "date complete", "projects"],
// 		dataKeys: ["address", "client", "complete", "dateStarted", "dateComplete", "projects"],
// 		dataTypes: ["text", "text", "checkBox", "text", "text", "list"],
// 	},
// 	tableData: [
// 		{
// 			address: "4 B Blue Ridge Blvd, Brighton, MI",
// 			client: "Josephine Darakjy",
// 			complete: "checkbox",
// 			dateStarted: "2/16/2022",
// 			dateComplete: "incomplete",
// 			projects: ["kitchen", "living room"]
// 		},
// 		{
// 			address: "8 W Cerritos Ave #54, Bridgeport, NJ",
// 			client: "Art Venere",
// 			complete: "checkbox",
// 			dateStarted: "1/16/2020",
// 			dateComplete: "incomplete",
// 			projects: ["bedroom", "bathroom"]
// 		},
// 		{
// 			address: "7 W Jackson Blvd, San Jose, CA",
// 			client: "Leota Dilliard",
// 			complete: "checkbox",
// 			dateStarted: "5/24/2021",
// 			dateComplete: "incomplete",
// 			projects: ["guest bedroom"]
// 		},
// 		{
// 			address: "3 Mcauley Dr, Ashland, OH",
// 			client: "Mitsue Tollner",
// 			complete: "checkbox",
// 			dateStarted: "8/11/2021",
// 			dateComplete: "incomplete",
// 			projects: ["entrance"]
// 		},
// 		{
// 			address: "228 Runamuck Pl #2808, Baltimore, MD",
// 			client: "Kris Marrier",
// 			complete: "checkbox",
// 			dateStarted: "2/17/2022",
// 			dateComplete: "incomplete",
// 			projects: []
// 		},
// 		{
// 			address: "2371 Jerrold Ave, Kulpsville, PA",
// 			client: "Minna Amigon",
// 			complete: "checkbox",
// 			dateStarted: "9/15/2019",
// 			dateComplete: "incomplete",
// 			projects: []
// 		},
// 		{
// 			address: "37275 St  Rt 17m M, Middle Island, NY",
// 			client: "Abel Maclead",
// 			complete: "checkbox",
// 			dateStarted: "1/2/2021",
// 			dateComplete: "incomplete",
// 			projects: []
// 		},
// 	],
// };
