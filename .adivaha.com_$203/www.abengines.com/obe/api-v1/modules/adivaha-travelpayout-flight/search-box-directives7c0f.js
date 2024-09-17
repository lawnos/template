angular.module("AdivahaTravelpayoutFlightSearchbox", ['elif', 'ngSanitize', 'AdivahaTravelpayoutFlightSearchbox.directives']);
angular.element(document).ready(function () {
	var element = angular.element(document.querySelector('#adivaha_travelpayout_flight_box'));
	var isInitialized = element.injector();
	if (!isInitialized) {
		angular.bootstrap(element, ['AdivahaTravelpayoutFlightSearchbox']);
	}
});
'use strict';
angular.module('AdivahaTravelpayoutFlightSearchbox.directives', []).directive('adivahaTravelpayoutFlightSearchbox', function () {
	return {
		controller: function ($scope, $http) {
			var prefix = jQuery('#prefix_adivaha_travelpayout_flight').val();
			$scope.prefix = prefix;
			$scope.islandingpage = jQuery('#islandingpage').val();

			$scope.pid = jQuery('#pid').val();

			// edited by chirag garg
			$scope.allow_meta_search_results = jQuery('#allow_meta_search_results').val();
			// edited by chirag garg


			var forResize = document.getElementById('travelpayout_flightforResize').value;
			if (forResize == 'Yes') {
				setInterval(function () {
					iframesizeincreasers1 = 0;
					//alert(angular.element(".autocomplete_flysmart1")[0].offsetHeight);
					iframesizeincreasers1 = parseInt(angular.element(".autocomplete_atf1")[0].offsetHeight);
					if (iframesizeincreasers1 > 0) {
						document.getElementById("iframesize_manager_adivaha_atf").style.height = (iframesizeincreasers1 + 200) + "px";
					}

					iframesizeincreasers2 = 0;
					iframesizeincreasers2 = parseInt(angular.element(".autocomplete_atf2")[0].offsetHeight);
					if (iframesizeincreasers2 > 0) {
						document.getElementById("iframesize_manager_adivaha_atf").style.height = (iframesizeincreasers2 + 200) + "px";
					}


					iframesizeincreasers3 = 0;
					iframesizeincreasers3 = parseInt(angular.element(".adivaha_atf_flights_adults")[0].offsetHeight);
					if (iframesizeincreasers3 > 0) {
						document.getElementById("adivaha_atf_adults").style.height = (iframesizeincreasers3 + 300) + "px";
					} else {

						document.getElementById("adivaha_atf_adults").style.height = (iframesizeincreasers3 + 0) + "px";
					}


					if (jQuery(window).width() < 1024) {



						iframesizeincreasers3 = 0;
						//iframesizeincreasers3 = parseInt(jQuery(".adivaha_flystart_flights_adults").css("height"));
						iframesizeincreasers3 = parseInt(angular.element(".adivaha_flystart_flights_adults")[0].offsetHeight);
						if (iframesizeincreasers3 > 0) {
							document.getElementById("travelpayout_flightadults").style.height = (iframesizeincreasers3 + 600) + "px";
						} else {

							document.getElementById("travelpayout_flightadults").style.height = (iframesizeincreasers3 + 0) + "px";
						}

					}






				}, 10);

			}












			var xhr = null;
			$scope.getFlight_Hint = function (val, whichs) {
				var locale = document.getElementById("adh_language").value;
				if (whichs == 1) {
					var term = this.adi_from_name;
				} else {
					var term = this.adi_to_name;
				}
				return xhr = $http.get(jQuery('#adivaha_plugin_url').val() + '/apps/modules/adivaha-fly-smart/apiflight_update_rates.php', {
					params: {
						action: 'getLocations',
						locale: "en",
						limit: "5",
						pid: pid,
						term: term
					}
				}).then(function (response) {
					//if (JSON.stringify(response.data.city_name) != "[]" && JSON.stringify(response.data.city_name) != "[]") {
					if (JSON.stringify(response.data.airports.CityName) != "[]" && JSON.stringify(response.data.airports.CityName) != "[]") {


						if (whichs == 1) {
							$scope.showpopup1 = true;
							$scope.showpopup2 = false;
							$scope.flights_destinations = response.data.airports;
						} else {
							$scope.showpopup2 = true;
							$scope.showpopup1 = false;
							$scope.return_flights_destinations = response.data.airports;
						}
					} else {
						$scope.showpopup1 = false;
						$scope.showpopup2 = false;
					}
				});
			};

			$scope.Search_Flights = function () {
				var isoneway = document.getElementById(prefix + "isoneway").value;
				var resultsPage = document.getElementById(prefix + "result_page").value;

				var from_iata_name = document.getElementById(prefix + "from_iata_name").value;
				var fromArr = from_iata_name.split(",");
				var from_country = fromArr[fromArr.length - 1].trim();

				var to_iata_name = document.getElementById(prefix + "return_iata_name").value;
				var toArr = to_iata_name.split(",");
				var to_country = toArr[toArr.length - 1].trim();

				if ((from_country == 'India') && (to_country == 'India')) {
					var isDomestic = 'Yes';
				}
				else {
					var isDomestic = 'No';
				}


				var from_iata_name = document.getElementById(prefix + "from_iata_name").value;//city full_name
				var from_iata = document.getElementById(prefix + "from_iata").value;  //iata code 
				var origin_name = $scope.flight_origin_name; //airport name

				if (origin_name != '' && origin_name != 'undefined' && origin_name != null) {


					localStorage_Save({ "code": from_iata, "city_fullname": from_iata_name, "name": origin_name, "search_type": "1" });

				}



				var return_iata_name = document.getElementById(prefix + "return_iata_name").value;//city full_name
				var return_iata = document.getElementById(prefix + "return_iata").value;  //iata code 
				var destination_name = $scope.flight_destination_name; //airport name
				if (destination_name != '' && destination_name != 'undefined' && destination_name != null) {
					localStorage_Save({ "code": return_iata, "city_fullname": return_iata_name, "name": destination_name, "search_type": "2" });

				}


				var ClassTrip = jQuery('input[name="flight_cabin"]:checked').val();
				var url = resultsPage + "?origin_name=" + document.getElementById(prefix + "from_iata_name").value + "&pid=" + jQuery('#pid').val() + "&mid=" + document.getElementById(prefix + "mid").value + "&mt=result" + "&origin_iata=" + document.getElementById(prefix + "from_iata").value + "&destination_name=" + document.getElementById(prefix + "return_iata_name").value + "&destination_iata=" + document.getElementById(prefix + "return_iata").value + "&depart_date=" + document.getElementById(prefix + "departure_date").value + "&return_date=" + document.getElementById(prefix + "return_date").value + "&one_way=" + isoneway + "&adults=" + document.getElementById(prefix + "adults").value + "&children=" + document.getElementById(prefix + "children").value + "&infants=" + document.getElementById(prefix + "infants").value + "&currency=" + document.getElementById("adh_currency").value + "&language=" + document.getElementById("adh_language").value + "&isDomestic=" + isDomestic + "&cabin=" + ClassTrip + "&marker=" + document.getElementById("marker").value + "&tokenId=" + document.getElementById("tokenId").value;

				// Edited By Chirag and Prashant
				if ($scope.allow_meta_search_results == "Yes") {
					localStorage.setItem("inquiryData", url+"&serviceType=flight");
					var massagedata = { "nextpage": "https://www.abengines.com/wp-content/plugins/meta-inquiry/", "p": 'FREEPLUGIN365' };
					window.parentIFrame.sendMessage(massagedata);
					return false;
				}
				// Edited By Chirag and Prashant 

				top.location.href = url;
				jQuery(".inputadiPColor").addClass("clicked_btnloader");
			};
			function localStorage_Save(data) {

				isIncognito(function (itIs) {
					if (itIs) {
						console.log("You are in incognito mode");
					}
					else {

						var new_data = data;
						var data_type = "";

						if (new_data.search_type == '1') {
							var data_type = "localdata_departure";

						}
						else if (new_data.search_type == '2') {
							var data_type = "localdata_return";

						}
						if (localStorage.getItem(data_type + "_" + $scope.mid) == null) {
							localStorage.setItem(data_type + "_" + $scope.mid, '[]');
						}
						var old_data = JSON.parse(localStorage.getItem(data_type + "_" + $scope.mid));

						for (var i = 0; i < old_data.length; i++) {

							if (old_data[i].code == new_data.code) {

								old_data.splice(i, 1);
							}



						}
						if (old_data.length > 8) {
							old_data.shift(); //#remove first data
							old_data.push(new_data);
						}
						else {
							old_data.push(new_data);
						}
						localStorage.setItem(data_type + "_" + $scope.mid, JSON.stringify(old_data));
					}
				});
			}


			function isIncognito(callback) {
				var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
				if (!fs) {
					callback(false);
				} else {
					fs(window.TEMPORARY,
						100,
						callback.bind(undefined, false),
						callback.bind(undefined, true)
					);
				}
			}


			//#==== localstorage data for auto
			setTimeout(function () {
				jQuery('.' + $scope.prefix + 'openautobox').click();
				$scope.showpopup1 = false;
				$scope.showpopup2 = false;
			}, 100);

			$scope.localStorage_Views = function (search_type) {
				$scope.showpopup = true;
				if (search_type == '1') {
					$scope.showpopup1 = true;
					$scope.showpopup2 = false;
				}
				else if (search_type == '2') {
					$scope.showpopup1 = false;
					$scope.showpopup2 = true;

				}

				isIncognito(function (itIs) {
					if (itIs) {
						console.log("You are in incognito mode");
					}
					else {
						if (search_type == 1) {
							var data_type = "localdata_departure";
							if (localStorage.getItem(data_type + "_" + $scope.mid) != null) {
								$scope.flights_destinations = JSON.parse(localStorage.getItem(data_type + "_" + $scope.mid));
								$scope.flights_destinations.reverse(); //Show order by last search


							}

						}
						else {
							var data_type = "localdata_return";
							if (localStorage.getItem(data_type + "_" + $scope.mid) != null) {
								$scope.return_flights_destinations = JSON.parse(localStorage.getItem(data_type + "_" + $scope.mid));
								$scope.return_flights_destinations.reverse(); //Show order by last search


							}

						}



					}
				})
			}
			jQuery('.cabinType').click(function () {
				var v = jQuery(this).val();
				jQuery('#travelpayout_flight_cabin').val(v);
			})
			/*== Onload Cabon ==*/
			$scope.cabin = jQuery('#travelpayout_flight_cabin').val();
			if ($scope.cabin == 'Business') {
				jQuery('#cabinbus').prop('checked', true);
			}
			else {
				jQuery('#cabinecom').prop('checked', true);
			}




			$scope.showpopupfilters = false;
			$scope.filtersonoff = function (val) {
				$scope.showpopupfilters = true;
			};
			$scope.hideRoomGroup = function (val) {
				$scope.showpopupfilters = false;
				$scope.filterswitcher = (parseInt($scope.noofadults) + parseInt($scope.noofchildren) + parseInt($scope.infants)) + " " + document.getElementById('txt_passengers').value;
			};
			$scope.Update_Search_Flights_Param = function (flight_destinations_id, flight_latinFullName, flight_des_name, whichs) {
				if (whichs == 1) {
					$scope.from_iata = flight_destinations_id;
					$scope.adi_from_name = flight_latinFullName;
					$scope.adi_from_IATA = flight_destinations_id;
					document.getElementById(prefix + "from_iata").value = flight_destinations_id;
					document.getElementById(prefix + "from_iata_name").value = flight_latinFullName;
					$scope.flight_origin_name = flight_des_name;


				} else {
					$scope.return_iata = flight_destinations_id;
					$scope.adi_to_name = flight_latinFullName;
					$scope.adi_to_IATA = flight_destinations_id;
					document.getElementById(prefix + "return_iata").value = flight_destinations_id;
					document.getElementById(prefix + "return_iata_name").value = flight_latinFullName;
					$scope.flight_destination_name = flight_des_name;

					jQuery('#' + prefix + 'depature_dateRange').click();

				}
				$scope.showpopup1 = false;
				$scope.showpopup2 = false;
			};
			$scope.selectTripType = function (val) {
				if (val == 'oneway') {
					jQuery("#" + prefix + "isoneway").val('Yes');
					jQuery("#" + prefix + "round").removeClass('onewayu_selected');
					jQuery("#" + prefix + "oneway").addClass('onewayu_selected');
					jQuery("#" + prefix + "return_dateRange").attr('disabled', 'disabled');
				} else {
					jQuery("#" + prefix + "isoneway").val('No');
					jQuery("#" + prefix + "oneway").removeClass('onewayu_selected');
					jQuery("#" + prefix + "round").addClass('onewayu_selected');
					jQuery("#" + prefix + "return_dateRange").removeAttr('disabled');
				}
			};
			var tripType = jQuery("#" + prefix + "isoneway").val();
			if (tripType == 'Yes') {
				var tripTypeS = 'oneway';
			} else {
				var tripTypeS = 'round';
				$scope.selectTripType('round');
			}
			setTimeout(function () {
				$scope.selectTripType(tripTypeS);
			}, 100);

			$scope.svgset = function () {
				var adi_from_name = $scope.adi_from_name;
				var adi_to_name = $scope.adi_to_name;
				var adi_from_IATA = $scope.adi_from_IATA;
				var adi_to_IATA = $scope.adi_to_IATA;

				var flight_desti_placeholder = $scope.flight_desti_placeholder;
				var flight_to_desti_placeholder = $scope.flight_to_desti_placeholder;

				$scope.adi_from_name = adi_to_name;
				$scope.adi_to_name = adi_from_name;
				$scope.adi_from_IATA = adi_to_IATA;
				$scope.adi_to_IATA = adi_from_IATA;

				$scope.flight_desti_placeholder = flight_to_desti_placeholder;
				$scope.flight_to_desti_placeholder = flight_desti_placeholder;

				document.getElementById(prefix + "from_iata").value = $scope.adi_from_IATA;
				document.getElementById(prefix + "from_iata_name").value = $scope.adi_from_name;
				document.getElementById(prefix + "return_iata").value = $scope.adi_to_IATA;
				document.getElementById(prefix + "return_iata_name").value = $scope.adi_to_name;

				document.getElementById(prefix + "from_iata").value = $scope.flight_desti_placeholder;
				document.getElementById(prefix + "return_iata").value = $scope.flight_to_desti_placeholder;


				jQuery({ rotation: 0 }).animate({ rotation: 180 }, {
					duration: 300,
					easing: 'linear',
					step: function () {
						jQuery("#roteded").css({ transform: 'rotate(' + this.rotation + 'deg)' });
						console.log(this.rotation);
					}
				});
			};
			$scope.increasenoofadults = function () {
				if ($scope.noofadults < 7) {
					$scope.noofadults++;
					document.getElementById(prefix + "adults").value = $scope.noofadults;
				}
			};
			$scope.decreasenoofadults = function () {
				if ($scope.noofadults > 1) {
					$scope.noofadults--;
					document.getElementById(prefix + "adults").value = $scope.noofadults;
				}
			};
			$scope.increasenoochilds = function () {
				if ($scope.noofchildren < 7) {
					$scope.noofchildren++;
					document.getElementById(prefix + "children").value = $scope.noofchildren;
				}
			};
			$scope.decreasenoochilds = function () {
				if ($scope.noofchildren > 0) {
					$scope.noofchildren--;
					document.getElementById(prefix + "children").value = $scope.noofchildren;
				}
			};
			$scope.increasenooinfants = function () {
				if ($scope.infants < 7) {
					$scope.infants++;
					document.getElementById(prefix + "infants").value = $scope.infants;
				}
			};
			$scope.decreasenooinfants = function () {
				if ($scope.infants > 0) {
					$scope.infants--;
					document.getElementById(prefix + "infants").value = $scope.infants;
				}
			};
			$scope.adi_from_name = document.getElementById(prefix + "from_iata_name").value;
			$scope.adi_from_IATA = document.getElementById(prefix + "from_iata").value;
			$scope.adi_to_name = document.getElementById(prefix + "return_iata_name").value;
			$scope.adi_to_IATA = document.getElementById(prefix + "return_iata").value;
			$scope.noofadults = document.getElementById(prefix + "adults").value;
			$scope.noofchildren = document.getElementById(prefix + "children").value;
			$scope.infants = document.getElementById(prefix + "infants").value;
			$scope.filterswitcher = (parseInt(document.getElementById(prefix + "adults").value) + parseInt(document.getElementById(prefix + "children").value) + parseInt(document.getElementById(prefix + "infants").value)) + " " + document.getElementById('txt_passengers').value;
		},
		template: '<div class="adiFullp tabpaneback searchBoxMobile flightserchboxv4css" style=""><div class="' + document.getElementById('adimaxwidth').value + '"><ul class="sigleroutebox adiFullp width' + document.getElementById('responsive_width').value + ' labelno' + document.getElementById('label_yes_and_no').value + ' siteL' + document.getElementById('adh_language').value + '"><div class="tripbutton" style="">' +

			'<div id="{{prefix}}oneway" class="onewayu" ng-click="selectTripType(\'oneway\')"><span class="tabsCircle appendRight5"></span>' + document.getElementById('txt_one_way').value + '</div>' +

			'<div class="round_tripu" id="{{prefix}}round" ng-click="selectTripType(\'round\')"><span class="tabsCircle appendRight5"></span>' + document.getElementById('txt_round_trip').value + '</div>' +

			'<div class="round_tripu multicityRouteText " style="display:none;"><span class="tabsCircle appendRight5"></span>Multi city route</div>' +


			'</div><li class="adiFullWp-25 position-relative tooltip_box_us_po adiFullWp-100 adiFullWpp-50 travellocationcls"> <label class="label-onP nolabel labelColor">' + document.getElementById('txt_flying_from').value + '</label><div class="jsx-3254483914 icon_aero_up"><svg aria-hidden="true" class="svg-inline--fa fa-plane-departure fa-w-20 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M624 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM80.55 341.27c6.28 6.84 15.1 10.72 24.33 10.71l130.54-.18a65.62 65.62 0 0 0 29.64-7.12l290.96-147.65c26.74-13.57 50.71-32.94 67.02-58.31 18.31-28.48 20.3-49.09 13.07-63.65-7.21-14.57-24.74-25.27-58.25-27.45-29.85-1.94-59.54 5.92-86.28 19.48l-98.51 49.99-218.7-82.06a17.799 17.799 0 0 0-18-1.11L90.62 67.29c-10.67 5.41-13.25 19.65-5.17 28.53l156.22 98.1-103.21 52.38-72.35-36.47a17.804 17.804 0 0 0-16.07.02L9.91 230.22c-10.44 5.3-13.19 19.12-5.57 28.08l76.21 82.97z"></path></svg></div><input type="text" class="inputadiP inputadiP_click_fun {{prefix}}openautobox" ng-model="adi_from_name" ng-change="getFlight_Hint(this, 1)" ng-click="localStorage_Views(1)"  onfocus="this.select()"><p ng-bind-html="adi_from_IATA" class="flight_desti_placeholder14">{{adi_from_IATA}}</p><div class="autocomplete_atf1 show-autocomplete-popup showhidepopup1{{showpopup1}}">' +

			'<a class="" ng-cloak ng-repeat="flights_destinations in flights_destinations track by $index" ng-click="Update_Search_Flights_Param(flights_destinations.code, flights_destinations.city_fullname,flights_destinations.name, 1)" ng-if="pid!=\'77A90465\' && flights_destinations.name">' + '<div class="city_fullname_left">' + '<span class="leftspancss">{{flights_destinations.city_fullname}}</span>' + '<span class="leftspancss1">{{flights_destinations.name}}</span>' + '</div>' + '<div class="city_fullname_right">' + '<span class="rightspancss">{{flights_destinations.code}}</span></div></a>' +

			'<a class="" ng-cloak ng-repeat="flights_destinations in flights_destinations track by $index" ng-click="Update_Search_Flights_Param(flights_destinations.code, flights_destinations.city_fullname,flights_destinations.name, 1)" ng-if="pid==\'77A90465\' && flights_destinations.country_code==\'US\' && flights_destinations.name">' + '<div class="city_fullname_left">' + '<span class="leftspancss">{{flights_destinations.city_fullname}}</span>' + '<span class="leftspancss1">{{flights_destinations.name}}</span>' + '</div>' + '<div class="city_fullname_right">' + '<span class="rightspancss">{{flights_destinations.code}}</span></div></a>' +


			'</div><a href="javascript:void(0)" ng-click="svgset()" class="jsx-1557352292 swap_btn swap_anti_clockwise" style=""><svg id="roteded" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exchange-alt" class="svg-inline--fa fa-exchange-alt fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"></path></svg></a></li><span class="flight-swipe-icon"></span><li class="adiFullWp-25 position-relative tooltip_box_us_po1 adiFullWp-100 adiFullWpp-50 travellocationcls"> <label class="label-onP nolabel labelColor">' + document.getElementById('txt_flying_to').value + '</label><div class="jsx-3254483914 icon_aero_down ioncs_zzz_index1"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plane-arrival" class="svg-inline--fa fa-plane-arrival fa-w-20 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M624 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM44.81 205.66l88.74 80a62.607 62.607 0 0 0 25.47 13.93l287.6 78.35c26.48 7.21 54.56 8.72 81 1.36 29.67-8.27 43.44-21.21 47.25-35.71 3.83-14.5-1.73-32.71-23.37-54.96-19.28-19.82-44.35-32.79-70.83-40l-97.51-26.56L282.8 30.22c-1.51-5.81-5.95-10.35-11.66-11.91L206.05.58c-10.56-2.88-20.9 5.32-20.71 16.44l47.92 164.21-102.2-27.84-27.59-67.88c-1.93-4.89-6.01-8.57-11.02-9.93L52.72 64.75c-10.34-2.82-20.53 5-20.72 15.88l.23 101.78c.19 8.91 6.03 17.34 12.58 23.25z"></path></svg></div><input type="text" class="inputadiP adip-border {{prefix}}openautobox" ng-model="adi_to_name" ng-change="getFlight_Hint(this, 2)" ng-click="localStorage_Views(2)" onfocus="this.select()"><p ng-bind-html="adi_to_IATA" class="flight_desti_placeholder14">{{adi_to_IATA}}</p><div class="autocomplete_atf2 show-autocomplete-popup showhidepopup2{{showpopup2}}">' +



			'<a class="" ng-cloak ng-repeat="flights_destinations in return_flights_destinations track by $index" ng-click="Update_Search_Flights_Param(flights_destinations.code, flights_destinations.city_fullname,flights_destinations.name, 2)" ng-if="pid!=\'77A90465\' && flights_destinations.name">' + '<div class="city_fullname_left">' + '<span class="leftspancss">{{flights_destinations.city_fullname}}</span>' + '<span class="leftspancss1">{{flights_destinations.name}}</span>' + '</div>' + '<div class="city_fullname_right">' + '<span class="rightspancss">{{flights_destinations.code}}</span></div></a>' +

			'<a class="" ng-cloak ng-repeat="flights_destinations in flights_destinations track by $index" ng-click="Update_Search_Flights_Param(flights_destinations.code, flights_destinations.city_fullname,flights_destinations.name, 2)" ng-if="pid==\'77A90465\' && flights_destinations.country_code==\'US\' && flights_destinations.name">' + '<div class="city_fullname_left">' + '<span class="leftspancss">{{flights_destinations.city_fullname}}</span>' + '<span class="leftspancss1">{{flights_destinations.name}}</span>' + '</div>' + '<div class="city_fullname_right">' + '<span class="rightspancss">{{flights_destinations.code}}</span></div></a>' +

			'</div></li><li class="adiFullWp-12  position-relative chcek-inv6 adiFullWp-50 adiFullWpp-33"> <label class="label-onP nolabel labelColor">' + document.getElementById('txt_Check_in').value + '</label><div class="jsx-4217354310 icon_calendeer"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-alt" class="svg-inline--fa fa-calendar-alt fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path></svg></div><input type="text" class="inputadiP adip-border daterange" name="daterange1" id="{{prefix}}depature_dateRange" value=""></li><li class="adiFullWp-12  position-relative chcek-outv6 adiFullWp-50 adiFullWpp-33"> <label class="label-onP nolabel labelColor">' + document.getElementById('txt_Check_out').value + '</label><div class="jsx-4217354310 icon_calendeer"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-alt" class="svg-inline--fa fa-calendar-alt fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path></svg></div><input type="text" class="inputadiP daterange adip-border" name="daterange2" id="{{prefix}}return_dateRange"></li><li class="travellerDiv adiFullWp-15 position-relative travellerv6 adiFullWp-100 adiFullWpp-33"> <label class="label-onP nolabel labelColor">' + document.getElementById('txt_travelers').value + '</label><div class="jsx-2465708302 icon_passenger"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" class="svg-inline--fa fa-users fa-w-20 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg></div><input type="text" ng-model="filterswitcher" class="inputadiP adip-border" ng-click="filtersonoff()" readonly="readonly" id="dropboxadi"><div id="drope_box" class="background-color-white adi-box-shadow adiFullp  position-absolute drope_box-css showhidefilters{{showpopupfilters}} adivaha_atf_flights_adults"><div class="full_box_div_new_style">' + '<div class="full_box_div_new_style_one">' + '<label class="label-onP">' + document.getElementById('txt_adults').value + '</label>' + '<a href="" class="border-one-1" ng-click="decreasenoofadults()"><i class="fa fa-minus" aria-hidden="true"></i></a> <a href="" class="border-two-2">{{noofadults}}</a> <a href="" class="border-three-3" ng-click="increasenoofadults()"><i class="fa fa-plus" aria-hidden="true"></i></a>' + '</div>' + '<div class="full_box_div_new_style_one full_box_div_new_style_onenth">' + '<label class="label-onP">' + document.getElementById('txt_children').value + '</label>' + '<a href="" class="border-one-1" ng-click="decreasenoochilds()"><i class="fa fa-minus" aria-hidden="true"></i></a> <a href="" class="border-two-2">{{noofchildren}}</a> <a href="" class="border-three-3" ng-click="increasenoochilds()"><i class="fa fa-plus" aria-hidden="true"></i></a>' + '</div>' + '<div class="full_box_div_new_style_one">' + '<label class="label-onP">' + document.getElementById('txt_infants').value + '</label>' + '<a href="" class="border-one-1" ng-click="decreasenooinfants()"><i class="fa fa-minus" aria-hidden="true"></i></a> <a href="" class="border-two-2">{{infants}}</a> <a href="" class="border-three-3" ng-click="increasenooinfants()"><i class="fa fa-plus" aria-hidden="true"></i></a>' + '</div>' + '</div><div class="adiFullp maincabinclscss ">' +

			'<label class="label-onP">Travel Class</label><ul>' +


			'<li class="adiFullp margin-top-10 cabin_Economy" ><input type="radio" name="flight_cabin" value="Economy" checked="checked" aria-invalid="false" id="cabinecom" class="cabinType"><label class="radio_lable"> ' + document.getElementById('txt_economy').value + '</label></li><li class="adiFullp margin-top-10 margin-bottom-10 cabin_Business"> <input type="radio" name="flight_cabin" value="Business" aria-invalid="false" id="cabinbus" class="cabinType"><label class="radio_lable">' + document.getElementById('txt_business').value + '</label></li></ul></div><div class="adiFullp "><div class="be-ddn-footer adiFullp" > <a href="javascript:void(0)" style="background-color:' + document.getElementById('color_filterbutton').value + ';" class="done adi-btn text-color-white adiFullp" ng-click="hideRoomGroup();">' + document.getElementById('txt_done').value + '</a></div></div></div></li><li class="adiFullWp-11 searchv6 adiFullWp-100 adiFullWpp-100"> <label class="label-onP nolabel labelColor">&nbsp;</label> <input class="inputadiP inputadiPColor" style="" type="button" value="' + document.getElementById('txt_search').value + '" ng-click="Search_Flights()"></li></ul>' +



			'<div class="multicityRoute" style="display: none;">' +

			'<ul class="Mult_cityCONT multicityRoute_cont ng-scope" ng-repeat="CONT in CONT">' +
			'<li class="adiFullWp-34 position-relative map_ioncs_mul">' +
			'<label class="label-onP nolabel labelColor">Flying from</label>' +
			'<div class="jsx-3254483914 icon_aero_up">' +
			'<svg aria-hidden="true" class="svg-inline--fa fa-plane-departure fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M624 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM80.55 341.27c6.28 6.84 15.1 10.72 24.33 10.71l130.54-.18a65.62 65.62 0 0 0 29.64-7.12l290.96-147.65c26.74-13.57 50.71-32.94 67.02-58.31 18.31-28.48 20.3-49.09 13.07-63.65-7.21-14.57-24.74-25.27-58.25-27.45-29.85-1.94-59.54 5.92-86.28 19.48l-98.51 49.99-218.7-82.06a17.799 17.799 0 0 0-18-1.11L90.62 67.29c-10.67 5.41-13.25 19.65-5.17 28.53l156.22 98.1-103.21 52.38-72.35-36.47a17.804 17.804 0 0 0-16.07.02L9.91 230.22c-10.44 5.3-13.19 19.12-5.57 28.08l76.21 82.97z" ></path></svg>' +
			'</div>' +
			'<input name="fromFlight[]" type="text"class="inputadiP inputadiP_click_fun ng-pristine ng-valid ng-empty ng-touched" placeholder="Origin" ng-model="adi_from_name3[CONT]" id="adi_from_name_0" ng-change="getFlight_Hint(this, CONT, from)"/>' +
			'<input type="hidden" id="adi_from_id_0" value="" name="fromLocationId[]" />' +
			' <div class="show-autocomplete-popup show-autocomplete-popup-flight" id="showhidepopup_0"></div>' +
			'</li>' +
			'<li class="adiFullWp-34 position-relative map_ioncs_mul">' +
			'<label class="label-onP nolabel labelColor">Flying to</label>' +
			' <div class="jsx-3254483914 icon_aero_down">' +
			'<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plane-arrival" class="svg-inline--fa fa-plane-arrival fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M624 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM44.81 205.66l88.74 80a62.607 62.607 0 0 0 25.47 13.93l287.6 78.35c26.48 7.21 54.56 8.72 81 1.36 29.67-8.27 43.44-21.21 47.25-35.71 3.83-14.5-1.73-32.71-23.37-54.96-19.28-19.82-44.35-32.79-70.83-40l-97.51-26.56L282.8 30.22c-1.51-5.81-5.95-10.35-11.66-11.91L206.05.58c-10.56-2.88-20.9 5.32-20.71 16.44l47.92 164.21-102.2-27.84-27.59-67.88c-1.93-4.89-6.01-8.57-11.02-9.93L52.72 64.75c-10.34-2.82-20.53 5-20.72 15.88l.23 101.78c.19 8.91 6.03 17.34 12.58 23.25z"></path></svg>' +
			'</div>' +
			'<input name="toFlight[]" type="text" class="inputadiP adip-border inputadiP_click_fun1 ng-pristine ng-untouched ng-valid ng-empty" placeholder="Destination" ng-model="adi_to_names3[CONT]" id="adi_to_name_0" ng-change="getFlight_Hint(this,CONT,to)"/>' +
			'<input type="hidden" id="adi_to_id_0" name="toLocationId[]" value="" />' +
			'<div class="show-autocomplete-popup" id="showhidepopup2_0"></div>' +
			'</li>' +
			'<li class="adiFullWp-26 calendar_ioncs position-relative">' +
			'<label class="label-onP nolabel labelColor">Return</label>' +
			'<input type="text" class="multicitydate inputadiP daterange adip-border ng-pristine" name="flight_to_start[]" id="return_dateRange_val_0" ng-model="mulcitydates[CONT]" autocomplete="off" ng-click="daterangfuns(CONT)"rel="0" />' +
			'</li>' +
			'<li class="adiFullWp-6"><label class="label-onP nolabel labelColor">&nbsp;</label><button ng-click="closefightcount(CONT)" class="fa fa-times crossbutton"></button></li>' +
			'</ul>' +

			'<div class="addmoreflight_tow">' +
			'<ul class="crossbutton_box_type adi-full">' +
			'<li class="addmoreflightbtn_li"><button ng-click="addmoreflight(1)" class="addmoreflightbtn mkk">Add Another Destination</button></li>' +
			'<li class="adiFullWp-32 position-relative man_image_ioncs man_image_ioncs_mult" style="">' +
			'<input type="text" ng-model="filterswitcher" class="inputadiP adip-border ng-pristine ng-untouched ng-valid ng-not-empty" ng-click="filtersonoff()" readonly="readonly" id="dropboxadi" />' +
			'<div id="drope_box" class="background-color-white adi-box-shadow adiFullp padding-20 position-absolute drope_box-css showhidefiltersfalse">' +
			'<div class="full_box_div_new_style">' +
			'<div class="full_box_div_new_style_one">' +
			'<label class="label-onP">Adults</label> <a href="" class="border-one-1" ng-click="decreasenoofadults()"><i class="fa fa-minus" aria-hidden="true"></i></a> <a href="" class="border-two-2 ng-binding">1</a>' +
			'<a href="" class="border-three-3" ng-click="increasenoofadults()"><i class="fa fa-plus" aria-hidden="true"></i></a>' +
			'</div>' +
			'<div class="full_box_div_new_style_one full_box_div_new_style_onenth">' +
			'<label class="label-onP">Children</label><a href="" class="border-one-1" ng-click="decreasenoochilds()"><i class="fa fa-minus" aria-hidden="true"></i></a> <a href="" class="border-two-2 ng-binding">0</a>' +
			'<a href="" class="border-three-3" ng-click="increasenoochilds()"><i class="fa fa-plus" aria-hidden="true"></i></a>' +
			'</div>' +
			'<div class="full_box_div_new_style_one">' +
			'<label class="label-onP">Infants</label> <a href="" class="border-one-1" ng-click="decreasenooinfants()"><i class="fa fa-minus" aria-hidden="true"></i></a> <a href="" class="border-two-2 ng-binding">0</a>' +
			'<a href="" class="border-three-3" ng-click="increasenooinfants()"><i class="fa fa-plus" aria-hidden="true"></i></a>' +
			'</div>' +
			'</div>' +
			'<div class="adiFullp maincabinclscss">' +
			'<label class="label-onP">Travel Class</label>' +
			'<ul>' +
			'<li class="adiFullp margin-top-10">' +
			'<label class="radio_lable"> <input type="radio" name="rdoResult" value="Economy" checked="checked" aria-invalid="false" id="cabinecom" class="cabineCl" />Economy</label>' +
			'</li>' +
			'<li class="adiFullp margin-top-10 margin-bottom-10">' +
			'<label class="radio_lable"> <input type="radio" name="rdoResult" class="cabineCl" value="Business" aria-invalid="false" style="" id="cabinbus" /> Business</label>' +
			'</li>' +
			'</ul>' +
			'</div>' +
			'<div class="adiFullp margin-top-10">' +
			'<div class="be-ddn-footer adiFullp"><a href="javascript:void(0)" style="background-color: #010801;" class="done adi-btn text-color-white adiFullp" ng-click="hideRoomGroup();">Done</a></div>' +
			'</div>' +
			'</div>' +
			'</li>' +

			'<li class="adiFullp mulcitysearchbtns">' +
			'<span class="multicityRouteHideText_not1" style="">' +
			'<span class="multicityRouteHideText" ng-click="backtodownarray()"><i style="" class="fa fa-toggle-off" aria-hidden="true"></i>Back to simple route</span>' +
			'</span>' +
			'</li>' +

			'<li class="adiFullp mulcitysearchbtnss"><button ng-click="Search_Flights_Multiple()" class="mulcitysearchbtn">Search</button></li>' +
			'</ul>' +
			'</div>' +
			'</div>' +

			'</div></div>' +


			'<div id="iframesize_manager_adivaha_atf" style=""></div>' +
			'<div id="adivaha_atf_adults" style=""></div>' +
			'<div id="iframesize_manager_travelpayout_flightdate" style=""></div>' +





			'<style>.tabpaneback{background-color:' + document.getElementById('color_wrapperbackground').value + ';padding-top:' + document.getElementById('paddingtop').value + ';padding-bottom:' + document.getElementById('paddingbottom').value + ';padding-left:' + document.getElementById('paddingleft').value + ';padding-right:' + document.getElementById('paddingright').value + '}.round_tripu a{}.onewayu_selected{}.labelColor{color:' + document.getElementById('color_labelcolor').value + '}.inputadiPColor{background-color:' + document.getElementById('color_filterbutton').value + '}.show-autocomplete-popup a:hover{background-color:' + document.getElementById('color_autocompletehover').value + '}</style>'
	};
});
jQuery(function () {
	var prefix = jQuery('#prefix_adivaha_travelpayout_flight').val();
	var language = document.getElementById("adh_language").value;
	if (language == 'ar') {
		var daysOfWeek = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
		var monthNames = ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونية', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
		var opens = 'left';
		var direction = 'rtl';
	} else {
		var daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
		var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var opens = 'right';
		var direction = 'ltr';
	}
	var today = new Date();
	var today_Date = new Date(document.getElementById(prefix + "departure_date").value);
	var nextDayDate = new Date(document.getElementById(prefix + "return_date").value);
	var dateformat = document.getElementById(prefix + "date_format").value;

	if (dateformat == '1') {
		dateformat = 'DD-MM-YYYY';
	}
	else if (dateformat == '2') {
		dateformat = 'DD/MM/YYYY';
	}
	else if (dateformat == '3') {
		dateformat = 'MM/DD/YYYY';
	}
	else if (dateformat == '4') {
		dateformat = 'DD MM YYYY';
	}
	else {
		dateformat = 'DD-MM-YYYY';
	}
	var today = new Date();
	var today_Date = new Date(document.getElementById(prefix + "departure_date").value);

	var nextDayDate = new Date(document.getElementById(prefix + "return_date").value);

	jQuery("#" + prefix + "depature_dateRange").daterangepicker({
		"singleDatePicker": true,
		startDate: today_Date,
		endDate: nextDayDate,
		minDate: today,
		opens: 'right',
		autoclose: true,
		"autoApply": true,

		locale: {
			format: dateformat,
			direction: direction,
			daysOfWeek: daysOfWeek,
			monthNames: monthNames,
			firstDay: 1
		}
	}, function (start, end, label) {

		jQuery("#" + prefix + "departure_date").val(start.format('YYYY-MM-DD'));
		jQuery("#" + prefix + "return_date").val(end.format('YYYY-MM-DD'));
		jQuery("#" + prefix + "return_dateRange").data('daterangepicker').minDate = jQuery("#" + prefix + "depature_dateRange").data('daterangepicker').startDate;
		jQuery("#" + prefix + "return_dateRange").data('daterangepicker').startDate = jQuery("#" + prefix + "depature_dateRange").data('daterangepicker').endDate;
		jQuery("#" + prefix + "return_dateRange").val(jQuery("#" + prefix + "depature_dateRange").data('daterangepicker').startDate.format('DD-MM-YYYY'));


		/*jQuery("#" + prefix + "departure_date").val(start.format('YYYY-MM-DD'));
		jQuery("#" + prefix + "return_date").val(end.format('YYYY-MM-DD'));
		jQuery("#" + prefix + "return_dateRange").data('daterangepicker').minDate = jQuery("#" + prefix + "depature_dateRange").data('daterangepicker').startDate;
	  jQuery("#" + prefix + "return_dateRange").data('minDate').startDate = jQuery("#" + prefix + "depature_dateRange").data('daterangepicker').startDate;
	   jQuery("#" + prefix + "return_dateRange").val(jQuery("#" + prefix + "depature_dateRange").data('daterangepicker').startDate.format('DD-MM-YYYY'));
	   
	   */
	});
	jQuery("#" + prefix + "return_dateRange").daterangepicker({
		"singleDatePicker": true,
		startDate: nextDayDate,
		endDate: nextDayDate,
		minDate: nextDayDate,
		opens: 'right',
		autoclose: true,
		"autoApply": true,

		locale: {
			format: dateformat,
			direction: direction,
			daysOfWeek: daysOfWeek,
			monthNames: monthNames,
			firstDay: 1
		}
	}, function (start, end, label) {
		jQuery("#" + prefix + "return_dateRange").val(start.format('YYYY-MM-DD'));
		jQuery("#" + prefix + "return_dateRange").val(end.format('YYYY-MM-DD'));
		jQuery("#" + prefix + "return_date").val(end.format('YYYY-MM-DD'));
	});






	var forResize = document.getElementById('travelpayout_flightforResize').value;
	jQuery("#travelpayout_flightdepature_dateRange").on('show.daterangepicker', function (ev, picker) {
		//do something, like clearing an input
		if (forResize == 'Yes') {
			document.getElementById("iframesize_manager_travelpayout_flightdate").style.height = "500px";
		}
	});
	jQuery("#travelpayout_flightdepature_dateRange").on('hide.daterangepicker', function (ev, picker) {
		//do something, like clearing an input
		if (forResize == 'Yes') {
			document.getElementById("iframesize_manager_travelpayout_flightdate").style.height = "0px";
		}
	});
	jQuery("#travelpayout_flightreturn_dateRange").on('show.daterangepicker', function (ev, picker) {
		//do something, like clearing an input
		if (forResize == 'Yes') {
			document.getElementById("iframesize_manager_travelpayout_flightdate").style.height = "500px";
		}
	});
	jQuery("#travelpayout_flightreturn_dateRange").on('hide.daterangepicker', function (ev, picker) {
		//do something, like clearing an input
		if (forResize == 'Yes') {
			document.getElementById("iframesize_manager_travelpayout_flightdate").style.height = "0px";
		}
	});

	if (jQuery(window).width() < 1024) {


		var forResize = document.getElementById('travelpayout_flightforResize').value;
		jQuery("#travelpayout_flightdepature_dateRange").on('show.daterangepicker', function (ev, picker) {
			//do something, like clearing an input
			if (forResize == 'Yes') {
				document.getElementById("iframesize_manager_travelpayout_flightdate").style.height = "750px";
			}
		});
		jQuery("#travelpayout_flightdepature_dateRange").on('hide.daterangepicker', function (ev, picker) {
			//do something, like clearing an input
			if (forResize == 'Yes') {
				document.getElementById("iframesize_manager_travelpayout_flightdate").style.height = "0px";
			}
		});
		jQuery("#travelpayout_flightreturn_dateRange").on('show.daterangepicker', function (ev, picker) {
			//do something, like clearing an input
			if (forResize == 'Yes') {
				document.getElementById("iframesize_manager_travelpayout_flightdate").style.height = "750px";
			}
		});
		jQuery("#travelpayout_flightreturn_dateRange").on('hide.daterangepicker', function (ev, picker) {
			//do something, like clearing an input
			if (forResize == 'Yes') {
				document.getElementById("iframesize_manager_travelpayout_flightdate").style.height = "0px";
			}
		});


		/*
		
		var forResize =document.getElementById('travelpayout_flightforResize').value;
	jQuery("#" + prefix + "depature_dateRange").on('show.daterangepicker', function(ev, picker) {
			
			if(forResize=='Yes'){
			document.getElementById("iframesize_manager_adivaha_travelpayout_flight").style.height = "750px";
			}
	});
	jQuery("#" + prefix + "depature_dateRange").on('hide.daterangepicker', function(ev, picker) {
		
		if(forResize=='Yes'){
		document.getElementById("iframesize_manager_adivaha_travelpayout_flight").style.height = "0px";
		}
	});
	jQuery("#" + prefix + "return_dateRange").on('show.daterangepicker', function(ev, picker) {
			
			if(forResize=='Yes'){
			document.getElementById("iframesize_manager_adivaha_travelpayout_flight").style.height = "750px";
			}
	});
	jQuery("#" + prefix + "return_dateRange").on('hide.daterangepicker', function(ev, picker) {
		
		if(forResize=='Yes'){
		document.getElementById("iframesize_manager_adivaha_travelpayout_flight").style.height = "0px";
		}
	});*/

	}


	/*
	jQuery("#"+prefix+"dateRange").on('show.daterangepicker', function(ev, picker) {
			//do something, like clearing an input
	   if(forResize=='Yes'){	
		document.getElementById("iframesize_manager_travelpayout_flight").style.height = "500px";
	   }
	});
	jQuery("#"+prefix+"dateRange").on('hide.daterangepicker', function(ev, picker) {
		//do something, like clearing an input
		if(forResize=='Yes'){
		 document.getElementById("iframesize_manager_travelpayout_flight").style.height = "0px";
		}
	});*/






});