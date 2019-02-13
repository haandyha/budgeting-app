const getUrlExpAll = "http://localhost:9595/expense/all";
const getUrlUserAll = "http://localhost:9595/user/all";
const postUrlExp = "http://localhost:9595/expense";
let expenseId;
let userField = document.getElementById("userOp");

window.onload = function() {
	ajaxReq("GET", getUrlExpAll, printTable);
	ajaxReq("GET", getUrlUserAll, userSelect)
	let postBtn = document.getElementById("postSubmitBtn");
	postBtn.addEventListener("click", postReq);
	let putBtn = document.getElementById("putSubmitBtn");
	putBtn.addEventListener("click", putReq);
}

function ajaxReq(method, address, callback) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, address);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			callback(this);// passes entire object
		}
		// else
		// console.log(xhr.response);
	}
	xhr.send();
}

function ajaxPost(method, address, payload, callback) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, address);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			callback(this);// passes entire object
		}
		// else
		// console.log(this.response);
	}
	xhr.setRequestHeader("content-type", "application/json");
	let jsonNewExp = JSON.stringify(payload);
	xhr.send(jsonNewExp);
	window.location.reload();
}

function postReq() {
	// console.log("POST request submit button pressed.");
	let categoryInput = document.getElementById("postCategory").value;
	// console.log(categoryInput);
	let merchantInput = document.getElementById("postMerchant").value;
	// console.log(merchantInput);
	let costInput = parseFloat(document.getElementById("postCost").value);
	// console.log(costInput);
	// console.log(++expenseId);//increment expenseId with prescript
	// console.log(`User id: ${userField.value}`);

	if (!categoryInput || !merchantInput || !costInput) {
		alert("All fields must be filled.")
	} else {
		let newExpense = {
			category : categoryInput,
			cost : costInput,
			id : ++expenseId,
			merchant : merchantInput,
			user : {
				firstName : "",
				id : userField.value,
				lastName : ""
			}
		}
		console.log(newExpense);
		ajaxPost("POST", postUrlExp, newExpense, printResp);
	}
}

function putReq() {
	// console.log("PUT request submit button pressed.");
	let categoryInput = document.getElementById("putCategory").value;
	let merchantInput = document.getElementById("putMerchant").value;
	let costInput = parseFloat(document.getElementById("putCost").value);
	let expIdInput = parseInt(document.getElementById("expId").value);
	if (!categoryInput || !merchantInput || !costInput || !expIdInput) {
		alert("All fields must be filled.");
	} else {
		let expInfo = {
			category : categoryInput,
			cost : costInput,
			id : expIdInput,
			merchant : merchantInput,
			user : {
				firstName : "",
				id : userField.value,
				lastName : ""
			}
		}
		// console.log(expInfo);
		ajaxPost("PUT", postUrlExp, expInfo, printResp);
	}
}

function deleteReq(expId) {
	// console.log(`${id}'s delete button pressed.`);
	// let delExpIdInput = parseInt(document.getElementById("delExpId").value);
	let expInfo = {
		category : "a",
		cost : 0,
		id : expId,
		merchant : "b",
		user : {
			firstName : "",
			id : userField.value,
			lastName : ""
		}
	}
	// console.log(expInfo);
	ajaxPost("DELETE", postUrlExp, expInfo, printResp);
}

function printResp(xhrObj) {
	console.log(xhrObj.response);
}

function userSelect(xhr) {
	let jsonResp = xhr.response;
	let users = JSON.parse(jsonResp);
	// console.log(`${users[0].firstName} ${users[0].lastName} ${users[0].id}`);
	// let userField = document.getElementById("userOp");
	for (let i = 0; i < users.length; i++) {
		let userOption = document.createElement("option");
		userOption.setAttribute("value", `${users[i].id}`);
		userOption.innerHTML = users[i].firstName + " " + users[i].lastName;
		userField.appendChild(userOption);
	}
}

function printTable(xhr) {
	let jsonResp = xhr.response;
	let data = JSON.parse(jsonResp);
	// console.log(data);

	// let btn = document.createElement("button");

	// populate table with expense data
	let table = document.getElementById("tBody");// finds the body section of
	// table
	for (i = 0; i < data.length; i++) {
		let newRow = table.insertRow();// inserts new row to the end of the
		// table
		// btn.value = data[i].id;
		let cell1 = newRow.insertCell(0);// inserts new cell to the row
		let cell2 = newRow.insertCell(1);
		let cell3 = newRow.insertCell(2);
		let cell4 = newRow.insertCell(3);
		let cell5 = newRow.insertCell(4);
		let cell6 = newRow.insertCell(5);
		cell1.innerHTML = data[i].id;
		cell2.innerHTML = data[i].user.firstName + " " + data[i].user.lastName;// fills
		// cell
		// with
		// json
		// data
		cell3.innerHTML = data[i].category;
		cell4.innerHTML = data[i].merchant;
		cell5.innerHTML = data[i].cost;
		cell6.innerHTML = `<button onclick="deleteReq(${data[i].id}, window.location.reload())"><i class="far fa-window-close"></i></button>`;
		expenseId = data[i].id;// record last created expense id so new
		// expenses will always have a unique id
	}
}