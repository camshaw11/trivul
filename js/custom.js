
var init = function () {

 		//////////// input value variables //////////////////////////////////
		var peopleAmount 		= document.getElementById('my-number');
		var daysAmount 			= document.getElementById('my-number-days');
		var subtractPeople		= document.getElementById('subtract');
		var addPeople			= document.getElementById('add');
		var addDays				= document.getElementById('add-days');
		var subtractDays		= document.getElementById('subtract-days');
		//////////////////// checkbox value variables //////////////////////////////////
		var carSelect 			= document.getElementsByClassName('checkbox');
		var carSelectMotor		= document.getElementById('motorbikeCheck');
		var carSelectSmall		= document.getElementById('smartCarCheck');
		var carSelectLarge		= document.getElementById('largeCarCheck');
		var carSelectMotorhome	= document.getElementById('motorhomeCheck');
		var noOptionsAvailable  = document.getElementById('noOptionText');
		var noOptionContainer	= document.getElementsByClassName('noOption');
		//////////////////// car button variables //////////////////////////////////
		var car1 				= document.getElementById("motorbike");
		var car2 				= document.getElementById("smartCar");
		var car3 				= document.getElementById("largeCar");
		var car4 				= document.getElementById("motorhome");
		//////////////////// cost calculating variables //////////////////////////////////
		var hireCost 			= document.getElementById('hire-cost');
		var overDistanceCost 	= document.getElementById('over-cost');
		var distanceKm			= document.getElementById('distanceKm');
		var submitArrow		 	= document.getElementById('submitArrow');
		/////////////////// input form values ////////////////////////////////////////////
		var myLocation 			= document.getElementById('input-space-from').value;
		var myDestinationIs 	= document.getElementById('input-space-to').value;
		// Get the modal
		var modal 				= document.getElementById('myModal');
		// Get the button that opens the modal
		var buttons 			= document.getElementsByClassName('car');
		var btn 				= document.getElementById("motorbike");
		var smartCarBtn 		= document.getElementById('smartCar');
		var largeCarBtn 		= document.getElementById('largeCar');
		var motorhomeBtn 		= document.getElementById('motorhome');
		/// change inner content in modal variables
		var modalImage			= document.getElementById('photoTransport');	
		var h1Elem				= document.getElementsByClassName('head-modal');
		var h2Elem				= document.getElementsByClassName('modalPrice');
		var h2Elem2				= document.getElementsByClassName('modalPrice2');
		// Get the <span> element that closes the modal
		var span 			= document.getElementsByClassName("close")[0];

	function myForm() {
		// object with data about the car options
		var pricePerDay = {

			motorbike: [109, 3.7],
			smallCar: [129, 8.5],
			largeCar: [144, 9.7],
			motorhome: [200, 17],
			directionsData: ''

		};


		////// click events /////
		addPeople.addEventListener('click', increaseValue, false);

		subtractPeople.addEventListener('click', decreaseValue, false);

		addDays.addEventListener('click', increaseValue2, false);

		subtractDays.addEventListener('click', decreaseValue2, false);

		submitArrow.addEventListener('click', function() {

     		setRouteDynamically();
     		carChooser();

		});

		///// Mapbox direction controls ////
		mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtbXkxMSIsImEiOiJjamFib2p6cGwwMjNhMnhtaGptbmF1azJrIn0.OtcZ5rIhMtthxs7yu6KqmQ';
		   	var directions = new MapboxDirections({
	      		accessToken: 'pk.eyJ1IjoidmVyYXRlY2giLCJhIjoiY2phYmZ1NXFmMHIwMDM1cGV4bHV4bHhzbSJ9.gbT5J_uXxbjRRuj00D7Xeg',
	      		unit: 'metric'
    	});
		/// Map initialiser
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/cammy11/cjalqspmrczga2smswy6q4kgx',
			center: [174.763817,-41.295241],
			zoom: 12,
			minZoom: 5,
		    pitch: 60 // pitch in degrees
    		// bearing: -60, // bearing in degrees
		});

		map.addControl(directions, 'top-left');
		// access object data and store the route in the object
	    	var directionsData = directions.on('route', function(directions){
	        	pricePerDay.directionsData = directions;
    	});  

    	// append the origin and destination methods to my custom input fields
	    function setRouteDynamically(){
							
			var myLocation 			= document.getElementById('input-space-from').value;
			var myDestinationIs 	= document.getElementById('input-space-to').value;

      		directions.setOrigin(myLocation); 
      		directions.setDestination(myDestinationIs);        
	    }	


		// tipr plugin for tooltips
		$(document).ready(function() {
	     	$('.tip').tipr({
	          	'speed': 400,
          		'mode': 'above',
          		'space': 7
	     	});
		});

		/////////// modal pop out //////////

		// on click of ANY of the cars, display the modal 
		for (var i = 0, len = buttons.length; i < len; i++) {
			buttons[i].onclick = function (){
    			modal.style.display = "block";
			};
		}

		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		    modal.style.display = "none";
		};

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		};
		// change inner contents of the modal based on which car is clicked
		smartCarBtn.addEventListener('click', function() {
			modalImage.src="img/smartcar.png";
			h1Elem["0"].textContent = "SMARTCAR";
			h2Elem["0"].textContent = "$129 PER DAY";
			h2Elem2["0"].textContent ="8.5L/100KM";
		});

		largeCarBtn.addEventListener('click', function() {
			modalImage.src="img/large-car.png";
			h1Elem["0"].textContent = "CHRYSLER 200";
			h2Elem["0"].textContent = "$144 PER DAY";
			h2Elem2["0"].textContent ="9.7L/100KM";
		});

		motorhomeBtn.addEventListener('click', function() {
			modalImage.src="img/motorhome.png";
			h1Elem["0"].textContent = "MOTORHOME";
			h2Elem["0"].textContent = "$200 PER DAY";
			h2Elem2["0"].textContent ="17L/100KM";
		});

		btn.addEventListener('click', function() {
			modalImage.src="img/motorbike.png";
			h1Elem["0"].textContent = "MOTORBIKE";
			h2Elem["0"].textContent = "$109 PER DAY";
			h2Elem2["0"].textContent ="3.7L/100KM";
		});
		
		// people and day calculater to show suitable car for the users options
		function carChooser () {

			event.preventDefault();

					// parse strings to values 
					var peopleAmountInt = parseInt(peopleAmount.value);
					var daysAmountInt 	= parseInt(daysAmount.value);

					// if people selected is =1 and the days amount selected >= 1 and <= 5 do this
					if ((peopleAmountInt === 1) && (daysAmountInt >= 1 && daysAmountInt <= 5)) {
							car1.style.display = "inline-block";
					} else {
							$(car1).hide(400);	
					}	
					if ((peopleAmountInt >= 1 && peopleAmountInt <= 2) && (daysAmountInt >= 1 && daysAmountInt <= 10)){
							car2.style.display = "inline-block";
					} else {
							$(car2).hide(400);
					}
					if ((peopleAmountInt <= 5) && (daysAmountInt >= 3 && daysAmountInt <= 10)) {
							car3.style.display = "inline-block";
					} else {
							$(car3).hide(400);
					}
					if ((peopleAmountInt >= 2 && peopleAmountInt <= 6) && (daysAmountInt >= 2 && daysAmountInt <= 15)) {
							car4.style.display = "inline-block";
					} else {
							$(car4).hide(400);
					} 
					if ((peopleAmountInt > 6 || peopleAmountInt < 1) || (daysAmountInt < 1 || daysAmountInt > 15)) {
							noOptionContainer[0].style.display = "inline-block";
							noOptionsAvailable.textContent = "No options available";
					} else {
							noOptionContainer[0].style.display = "none";
					}
					
				// remove the pulse from the submit button after it has been clicked
				$('#submitArrow').removeClass('pulse');

				// function fires as soon as a checkbox has been checked
				$(carSelect).change(function() {
					// if motorbike checkbox has been checked print costs
		    		if (carSelectMotor.checked == true) {
		    				// print hire costs
		        			hireCost.textContent = "HIRE:" + " " + "$" + daysAmountInt * pricePerDay.motorbike[0];
		        			// print fuel usage
		        			overDistanceCost.textContent = "FUEL:" + " " + ((pricePerDay.directionsData.route[0].distance / 1000) * pricePerDay.motorbike[1] / 100).toFixed(1) + "L";
		        			// print distance in km
		        			distanceKm.textContent = "DISTANCE:" + " " + (pricePerDay.directionsData.route[0].distance / 1000).toFixed(0) + "KM";
		        	// else if small car checkbox has been checked do this
		        	} else if (carSelectSmall.checked == true) {
		        			// print hire costs
		        			hireCost.textContent = "HIRE:" + " " + "$" + daysAmountInt * pricePerDay.smallCar[0];
		        			// print fuel usage
		        			overDistanceCost.textContent = "FUEL:" + " " + ((pricePerDay.directionsData.route[0].distance / 1000) * pricePerDay.smallCar[1] / 100).toFixed(1) + "L";
		        			// print distance in km
		        			distanceKm.textContent = "DISTANCE:" + " " + (pricePerDay.directionsData.route[0].distance / 1000).toFixed(0) + "KM";
		        	// else if large car checkbox has been checked do this
		        	} else if (carSelectLarge.checked == true) {
		        			// print hire costs
		        			hireCost.textContent = "HIRE:" + " " + "$" + daysAmountInt * pricePerDay.largeCar[0];
		        			// print fuel usage
		        			overDistanceCost.textContent = "FUEL:" + " " + ((pricePerDay.directionsData.route[0].distance / 1000) * pricePerDay.largeCar[1] / 100).toFixed(1) + "L";
		        			// print distance in km
		        			distanceKm.textContent = "DISTANCE:" + " " + (pricePerDay.directionsData.route[0].distance / 1000).toFixed(0) + "KM";
		        	// else if motorhome checkbox has been checked do thid
		        	} else if (carSelectMotorhome.checked == true) {
		        			// print hire costs
		        			hireCost.textContent = "HIRE:" + " " + "$" + daysAmountInt * pricePerDay.motorhome[0];
		        			// print fuel usage
		        			overDistanceCost.textContent = "FUEL:" + " " + ((pricePerDay.directionsData.route[0].distance / 1000) * pricePerDay.motorhome[1] / 100).toFixed(1) + "L";
		        			// print distance in km
		        			distanceKm.textContent = "DISTANCE:" + " " + (pricePerDay.directionsData.route[0].distance / 1000).toFixed(0) + "KM";

		        	}
		
				});
	 	}

		// allows only one checkbox to be selected at a time
		$('input[type="checkbox"]').on('change', function() {
		  		$('input[type="checkbox"]').not(this).prop('checked', false);
		});
		// add pulsing border class to the submit button after days button has been clicked
		$('#add-days').click(function(){
		    	$('#submitArrow').addClass('pulse');
		});

		////////////  button increment and decrement  //////////////

		function increaseValue() {
			  var value = parseInt(peopleAmount.value, 10);
			  value = isNaN(value) ? 0 : value;
			  value++;
			  peopleAmount.value = value;
		}

		function decreaseValue() {
			  var value = parseInt(peopleAmount.value, 10);
			  value = isNaN(value) ? 0 : value;
			  value < 1 ? value = 1 : '';
			  value--;
			  peopleAmount.value = value;
		}

		function increaseValue2() {
			  var value = parseInt(daysAmount.value, 10);
			  value = isNaN(value) ? 0 : value;
			  value++;
			  daysAmount.value = value;
		}

		function decreaseValue2() {
			  var value = parseInt(daysAmount.value, 10);
			  value = isNaN(value) ? 0 : value;
			  value < 1 ? value = 1 : '';
			  value--;
			  daysAmount.value = value;
		}

	} // myForm function ends

	myForm (); // invoke myForm

}(); // main function ends