const getUrlExpMin = "http://localhost:9595/expense/min";
const getUrlExpMax = "http://localhost:9595/expense/max";
const getUrlExpAvg = "http://localhost:9595/expense/avg";
const getUrlExpMed = "http://localhost:9595/expense/median";
const getUrlExpAll = "http://localhost:9595/expense/all";


window.onload = function(){
	ajaxReq("GET", getUrlExpMin, printMinCard);
	ajaxReq("GET", getUrlExpMax, printMaxCard);
	ajaxReq("GET", getUrlExpAvg, printAvgCard);
	ajaxReq("GET", getUrlExpMed, printMedCard);
	ajaxReq("GET", getUrlExpAll, pieCard);
}


function ajaxReq(method, address, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, address);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===200){
            callback(this);//passes entire object
        }
//         else
//             console.log(xhr.response);
    }
    xhr.send();
}


function pieCard(xhr){
	let jsonResp = xhr.response;
	let data = JSON.parse(jsonResp);
	//console.log(data);
	let labelsArr = [];
	let costArr = [];
	for(i=0;i<data.length;i++){
		labelsArr.push(`${data[i].user.firstName} ${data[i].user.lastName} (${data[i].category})`);
		costArr.push(data[i].cost);
	}
//	console.log(labelsArr);
//	console.log(costArr);
	
	//create pie chart
	var ctx = document.getElementById('myPieChart').getContext('2d');
	var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'doughnut',

	    // The data for our dataset
	    data: {
	        labels: labelsArr,
	        datasets: [{
	            backgroundColor: [
	            	'red', 'blue', 'purple', 'green', 'orange', 'yellow', 'pink', 'purple',
	            	'brown', '#007FFF', 'maroon', 'tan', 'violet', '#E52B50', '#FFBF00', '#9966CC',
	            	'#FBCEB1', '#7FFFD4', '#89CFF0', '#DE5D83', '#CD7F32', '#800020', 
	            	'#007BA7', '#7B3F00', '#0047AB', '#6F4E37', '#B87333', '#FF7F50', '#00FF3F'
	            ],
	            data: costArr,
	        }]
	    },

	    // Configuration options go here
	    options: {
	    	cutoutPercentage: 80,
	    	maintainAspectRatio: false,
	    	legend: {
	    		display: false,
	    		labels: {
	    			boxWidth: 12
	    		}
	    	}
	    }
	});
}


function printMinCard(xhr){
	let jsonResp = xhr.response;
	let data = JSON.parse(jsonResp);
	//console.log(data);
	
	//populate minCard with appropriate data
	let card = document.getElementById("minCard");
	card.innerHTML = data.toFixed(2);
}


function printMaxCard(xhr){
	let jsonResp = xhr.response;
	let data = JSON.parse(jsonResp);
	//console.log(data);
	
	//populate maxCard with appropriate data
	let card = document.getElementById("maxCard");
	card.innerHTML = data.toFixed(2);
}


function printAvgCard(xhr){
	let jsonResp = xhr.response;
	let data = JSON.parse(jsonResp);
	//console.log(data);
	
	//populate avgCard with appropriate data
	let card = document.getElementById("avgCard");
	card.innerHTML = data.toFixed(2);
}


function printMedCard(xhr){
	let jsonResp = xhr.response;
	let data = JSON.parse(jsonResp);
	//console.log(data);
	
	//populate medCard with appropriate data
	let card = document.getElementById("medCard");
	card.innerHTML = data.toFixed(2);
}