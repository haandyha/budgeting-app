const getUrlExpAll = "http://localhost:9595/expense/all";


window.onload = function(){
	ajaxReq("GET", getUrlExpAll, barCard);
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


function barCard(xhr){
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
	
	//create bar chart
	var ctx = document.getElementById('myBarChart').getContext('2d');
	var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'bar',

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
	    	maintainAspectRatio: false,
	    	barPercentage: 1,
	    	categoryPercentage: 0.5,
	    	legend: {
	    		display: false
	    	}
	    }
	});
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