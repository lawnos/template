angular.module("AdivahaTravelpayoutHotelsSearchbox", [
	'elif',
	'AdivahaTravelpayoutHotelsSearchbox.directives'
]);

angular.element(document).ready(function() {
var element = angular.element(document.querySelector('#adivaha_travelpayout_hotels_box'));
var isInitialized = element.injector();
if (!isInitialized) {
	angular.bootstrap(element, ['AdivahaTravelpayoutHotelsSearchbox']);
}
});

angular.module("AdivahaTravelpayoutHotelsSearchbox").filter('range', function() {
	return function(input, total) {
		total = parseInt(total);
		for (var i=0; i<total; i++)
			input.push(i);
			return input;
	};
});

'use strict';
/* Controllers */
angular.module('AdivahaTravelpayoutHotelsSearchbox.directives', [])

/* Starting of Tbo Hotel Search Box abhishek */
.directive('adivahaTravelpayoutHotelsSearchbox', function () {
    return {
		controller: function ($scope, $http) {

		
		var prefix =jQuery('#prefix_travelpayout_hotels').val(); 
        $scope.prefix = prefix;
		var mid =jQuery('#travelpayout_hotels_mid').val(); 
		$scope.hotel_nationality_hide = jQuery('#'+prefix+'nationality_hide').val(); 
		
		var actionUrl =document.getElementById('adivaha_plugin_url').value+'apps/modules/adivaha-travelpayout-hotels/update_rates.php';
	
		
		var forResize =document.getElementById('travelpayout_hotels_forResize').value;

		// if(forResize=='Yes'){
		// setInterval(function(){ 
		// 	iframesizeincreaser = parseInt(angular.element(".autocomplete-dropdown-travelpayout")[0].offsetHeight);
		// 	document.getElementById("iframesize_manager_adivaha_hotel_travelpayout_booking").style.height = (iframesizeincreaser  + 150)+"px";
			
			
			
		// 	iframesizeincreasers3 = 0;
		// 	iframesizeincreasers3 = parseInt(angular.element(".drope_box_he")[0].offsetHeight);
		// 	if(iframesizeincreasers3 >0){
		// 	document.getElementById("iframesize_manager_adivaha_hotel_travelpayout_booking_adults").style.height = (iframesizeincreasers3 + 150)+"px";
		// 	}else{
				
		// 		document.getElementById("iframesize_manager_adivaha_hotel_travelpayout_booking_adults").style.height = (iframesizeincreasers3 + 0)+"px";
		// 	}
				
			
		// },10);
		
		// }
		
		/*=== Get Country List ===*/
		var param="action=getCountryList";
		var url = actionUrl+'?'+param;
		$http.get(url).success( function(response) {
		$scope.countries =response;
		});
		
		$scope.adi_nationality_name=document.getElementById(prefix+"nationality").value;
		
		setTimeout(function(){
		 jQuery("#nationality option:contains(" + $scope.adi_nationality_name + ")").attr('selected', 'selected');
		},1000);
		
		jQuery('#nationality').change(function () {
		$scope.adi_nationality_name = jQuery(this).val();
		document.getElementById(prefix+"nationality").value = $scope.adi_nationality_name;						
		});
		
		 $scope.isMobile = document.getElementById("IsMobile").value;
		 //console.log($scope.isMobile);
		
		var xhr = null;
		$scope.getLocation_TBOHotelsHint = function(val) {
			var locale= document.getElementById("adh_language").value;
			var term =$scope.adi_destination_name;
			return xhr = $http.get(jQuery('#adivaha_plugin_url').val()+'/apps/modules/adivaha-travelpayout-hotels/update_rates.php', {
				params: {
				action: 'getLocations',
			    locale: locale,
				limit: "5",
				term: term
				}
			}).then(function(response) {
                    if (JSON.stringify(response.data.cities) != "[]" && JSON.stringify(response.data.cities) != "[]") {
                      
                        $scope.city_destinations = response.data.zonegroup;
						//console.log($scope.city_destinations);
                        $scope.showpopup = true;
                    } else {
                        $scope.showpopup = false;
                    }
                });
		};
		    
		    $scope.Update_Search_Hotels_Param = function(city_destinations_id,cityFullName,countryCode){
            $scope.adi_destination_name = cityFullName;
			$scope.adi_destination_id = city_destinations_id;
			$scope.adi_destination_countrycode = countryCode;
			document.getElementById(prefix+"regionid").value = $scope.adi_destination_id;
			document.getElementById(prefix+"regionname").value = cityFullName;
			document.getElementById(prefix+"countrycode").value = countryCode;
			$scope.showpopup = false;
		};

		$scope.Search_Hotels = function(){		
			var rooms =document.getElementById(prefix+"rooms").value;
			var adtStr ='';
			var chdStr ='';
			var childAgeStr ='';
			for(var i=0;i<rooms;i++){
			  adtStr+=jQuery('#'+prefix+'adults_'+i).val()+',';
			  chdStr+=jQuery('#'+prefix+'childs_'+i).val()+',';
			  
			  var chls =jQuery('#'+prefix+'childs_'+i).val();
			  if(chls>0){
				var agess='';
				var agesss='';
				for(var c=0; c < chls; c++){
				  var age =document.getElementById(prefix+"childAge"+i+'_'+c).value;
				  agess+=age+',';
				}
				agesss= agess.slice(0,-1);
				childAgeStr+=i+'_'+agesss+'-';
			   }
			   else{
				childAgeStr+=i+'_';   
			   }
			}
			
			var adults =adtStr.slice(0,-1);
			var childs =chdStr.slice(0,-1);
			var childAge = childAgeStr.slice(0,-1);
		
			var resultsPage = document.getElementById(prefix + 'result_page').value;
		    
			
			   var url = resultsPage+"?mid="+mid+"&mt=result&dest="+document.getElementById(prefix+"regionname").value+"&iata="+document.getElementById(prefix+"regionid").value+"&checkIn="+document.getElementById(prefix+"checkIn").value+"&checkOut="+document.getElementById(prefix+"checkOut").value+"&room_count="+document.getElementById(prefix+"rooms").value+"&adults="+adults+"&children="+childs+"&childAge="+childAge+"&lng="+document.getElementById("adh_language").value+"&currency=USD&nationality="+document.getElementById(prefix+"nationality").value+ "&countrycode="+document.getElementById(prefix+"countrycode").value+"&action=get_search_id&pid="+document.getElementById("pid").value;
			
			
			top.location.href =url;
			
			//top.location.href =url;
			jQuery(".inputadiPColor").addClass("clicked_btnloader");
		};
		
		/* Show Hide Hotel Criteria Filters */
		$scope.showpopupfilters = false;
		$scope.filtersonoff = function(val) {
			$scope.showpopupfilters = true;
		}
		$scope.hideRoomGroup = function(val) {
			$scope.showpopupfilters = false;
			showGuestRoom();
		}
		
		$scope.increasenoofrooms = function(){
			if($scope.noofrooms<7){
				$scope.noofrooms++;
			   document.getElementById(prefix+"rooms").value = $scope.noofrooms;
			}
		  setTimeout(function(){ changeChildNo(); }, 100);		
		}
		$scope.decreasenoofrooms = function(){
			if($scope.noofrooms>1){
				$scope.noofrooms--;
			  document.getElementById(prefix+"rooms").value = $scope.noofrooms;
			}
			
		  setTimeout(function(){ changeChildNo(); }, 100);	
		}
		
		function showGuestRoom(){
		  var totalGuest =0;
		  for(var i=0; i<$scope.noofrooms;i++){
			var adt =jQuery('#'+prefix+'adults_'+i).val();
            var chd =jQuery('#'+prefix+'childs_'+i).val();  
            totalGuest+= parseInt(adt)+ parseInt(chd);			
		  }	
          $scope.totalGuest = totalGuest;		  
		  $scope.filterswitcher = $scope.noofrooms + " " + document.getElementById('txt_Rooms').value + " " +  totalGuest + " " + document.getElementById('txt_guests').value;
		}
		
		function changeChildNo(){ 
		  jQuery('.changeChildNo').change(function(){ 
			  var r  =jQuery(this).attr('relRoom');
			  var n  =jQuery(this).val();
			  var html ='';
			  if(n>0){ 
				  html+='<span class="age_label">Age Below 12 years</span>'; 
				  for(var i=0;i<n;i++){
					html+='<div class="age_childdiv"><select name="childAge['+r+'][]" id="'+prefix+'childAge'+r+'_'+i+'" class="form-control-h"><option selected="selected" value="0">0</option><option value="1">1</option><option value="2">2</option></select></div>'
				  }
			  }
			jQuery('#'+prefix+'childAgeID_'+r).html(html);
		  })
		}
		
		setTimeout(function(){ changeChildNo(); }, 100);
		
		


		/* Set the Default Values */	
		$scope.adi_destination_id = document.getElementById(prefix+"regionid").value;
		$scope.adi_destination_name=document.getElementById(prefix+"regionname").value;
		$scope.adi_destination_countrycode=document.getElementById(prefix+"countrycode").value;
		/* $scope.adi_nationality_name=document.getElementById(prefix+"nationality").value; */
		$scope.noofrooms = document.getElementById(prefix+"rooms").value;
	
		var adultArr = document.getElementById(prefix+"adults").value.split(",");
		var childsArr = document.getElementById(prefix+"children").value.split(",");
		var childAgeArr = document.getElementById(prefix+"childage").value.split("-");
		
		/* Bind Child Age ==*/
		
		function childAgeHtml(){
		  for(var g =0; g<$scope.noofrooms;g++){
			 var nchild =childsArr[g];
			 if(nchild>0){
				var childAgeHtml=''; 
				var cAge =childAgeArr[g].split('_');
				var childAg =cAge[1];
				for(var h=0;h<nchild;h++){
				  var childAgArr =childAg.split(',');
				  childAgeHtml+='Age Below 12 years <select id="'+prefix+'childAge'+g+'_'+h+'">';
				   for(var k=0;k<13;k++){
					 if(childAgArr[h]==k){
					   childAgeHtml+='<option value="'+k+'" selected="selected">'+k+'</option>';  
				     } else{
						childAgeHtml+='<option value="'+k+'">'+k+'</option>';  
					 }					 
				   }
				  childAgeHtml+='</select>';
				} 
			 }
			 jQuery('#adivaha_hotels_childAgeID_'+g).html(childAgeHtml);
		  }
		}
		setTimeout(function() { childAgeHtml()}, 400);
		
		
		setTimeout(function() { selectAdtChd()}, 100);
		function selectAdtChd(){ 
		   for(var s=0;s<$scope.noofrooms;s++){
			jQuery("#"+prefix+"adults_"+s+" option[value="+adultArr[s]+"]").attr('selected', 'selected');
			jQuery("#"+prefix+"childs_"+s+" option[value="+childsArr[s]+"]").attr('selected', 'selected');
		   }
		}

		/*==== On Page Load show this ===*/ 
		var totalGuest =0;
	    for(var i=0; i<$scope.noofrooms;i++){
		 var adt =adultArr[i];
		 var chd =childsArr[i];;  
		 totalGuest+= parseInt(adt)+ parseInt(chd);			
	    }	
	    $scope.totalGuest = totalGuest;
		
		$scope.filterswitcher = $scope.noofrooms + " " + document.getElementById('txt_Rooms').value + " " +  totalGuest + " " + document.getElementById('txt_guests').value;
        },
		template:'<div class="adiFullp tabpaneback searchBoxMobile" ng-class="isMobile==1?\'mobileapphide\':\'mobileappshow\'"><div class="'+document.getElementById('adimaxwidth').value+'"><h2 style="display:none">Book a Cheap Flight</h2><ul class="adiFullp width'+document.getElementById('responsive_width').value+' labelno'+document.getElementById('label_yes_and_no').value+' siteL'+document.getElementById('adh_language').value+' tpaddclassmobile1"><li class="adiFullWp-45 position-relative map_ioncs tpaddclassmobile2 adiFullWp-100 adiFullWpp-100"  ng-class="hotel_nationality_hide==\'Yes\'? \'hotel_nationality_hide_cls25\':\'\'"><label class="label-onP nolabel labelColor">I want to go to</label><div class="jsx-3254483914 icon_aero_up"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/></svg></div><input type="text" class="inputadiP " ng-model="adi_destination_name" onfocus="this.select()" ng-model-options="{debounce: 400}" ng-change="getLocation_TBOHotelsHint(desti)"><div class="show-autocomplete-popup showhidepopup{{showpopup}} background-color-white adi-box-shadow position-absolute autocomplete-dropdown-travelpayout notranslate show-autocomplete-popupdisplay_flex">'+ 
		'<div class="top_bottom_lo"><a class="autocomplete-dropdown adi-full padding-10 border-bottom-1" ng-cloak ng-repeat="city_destination in city_destinations track by $index" ng-click="Update_Search_Hotels_Param(city_destination.destinationCode, city_destination.destinationName,city_destination.countryName)"><div class="city_fullname_left"><span class="adi_leftspancss">{{city_destination.destinationName}}</span></div></a></div>'+
	
		'</div></li>'+
		
		'<li class="adiFullWp-15 position-relative map_ioncs" ng-class="hotel_nationality_hide==\'Yes\'? \'hotel_nationality_hide_cls\':\'\'" style="display:none;"><label class="label-onP nolabel labelColor">Nationality</label><select class="inputadiP border-rightcls" name="nationality" id="nationality" ng-model="adi_nationality_name"  style="padding-left: 4px;"><option value="">Choose Country</option><option ng-repeat="countries in countries" value="{{countries.code}}">{{countries.name}}</option></select></li>'+
		
		'<li class="adiFullWp-21 calendar_ioncs tpaddclassmobile3 adiFullWp-100 adiFullWpp-50"> <label class="label-onP nolabel labelColor">Travel Dates</label><div class="jsx-4217354310 icon_calendeer"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-alt" class="svg-inline--fa fa-calendar-alt fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path></svg></div><input type="text" class="inputadiP daterangeResorts adip-border" name="daterangeResorts" id="{{prefix}}dateRange" value=""></li><li class="adiFullWp-20 position-relative man_image_ioncs tpaddclassmobile4 adiFullWp-100  adiFullWpp-50"> <label class="label-onP labelColor nolabel">Travelers</label><div class="jsx-2465708302 icon_passenger"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" class="svg-inline--fa fa-users fa-w-20 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg></div><input type="text" ng-model="filterswitcher" class="inputadiP adip-border"  ng-click="filtersonoff()" readonly="readonly" id="dropboxadi">'+
		
		
		'<div id="drope_box" class="background-color-white P-adi-box-shadow adiFullp padding-20 position-absolute drope_box-css-h showhidefilters{{showpopupfilters}}">'+
	'<div class="adiFullp">'+
	
		'<div id="packListdiv"  class="newpaclistdiv">'+
		 '<div class="margintopFull1" ng-repeat="n in [] | range: noofrooms"><div class="adi_main_packadultscls"><p class="adi_room_index">'+document.getElementById('txt_Room').value+' {{$index + 1}} <a href="" class="border-one-11" ng-click="decreasenoofrooms()">Remove</a></p><div class="adi_main_packadultscls_main"><div class="packadultscls new-div-add1 nomar newpaclistdivadd1"><i class="fa-solid fa-person"></i><span class="label-onP-h"  ng-if="n<1">'+document.getElementById('txt_adults').value+'</span><select name="adults[]" id="{{prefix}}adults_{{n}}" class="form-control-h backImgUseNew"><option selected="selected" value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option></select></div> <div class="packchildsscls  nomar"><i class="fa-solid fa-child"></i><span class="label-onP-h" ng-if="n<1">'+document.getElementById('txt_childs').value+'</span><select name="childs[]" id="{{prefix}}childs_{{n}}" class="form-control-h changeChildNo backImgUseNew selectchild" relroom="{{n}}"><option selected="selected" value="0">0</option><option value="1">1</option><option value="2">2</option></select></div></div><div id="{{prefix}}childAgeID_{{n}}" class="packchildagecls age-childAge"></div></div></div>'+
		'</div>'+
	'</div>'+

	'<div class="adiFullp"><div class="be-ddn-footer adiFullp" style=""><a href="javascript:void(0)" class="done adi-btn  text-color-white adiFullp" ng-click="hideRoomGroup();">Done</a></div></div>'+
'</div>'+
'</li>'+
'<li class="adiFullWp-14 tpaddclassmobile5 adiFullWp-100  adiFullWpp-100">'+
	'<label class="label-onP nolabel">&nbsp;</label>'+
	'<input class="inputadiPColor" type="button" value="Search" ng-click="Search_Hotels()">'+
'</li>'+
'</ul>'+
'</div>'+
'</div><div class="tabpanebackinmg"><div class="floghttabimg" style="display:none"><p>Hotel Booking Online | Budget , Luxury &amp; Cheap Hotel ...</p><p>Best hotel deals are available at Adivaha. Book budget hotels, luxury hotels or resorts at cost effective rates and book hotels smoothly like never before.</p></div></div>'+





'<div id="iframesize_manager_adivaha_hotel_travelpayout_booking" style=""></div>'+
'<div id="iframesize_cal_manager_adivaha_hotel_travelpayout_booking" style=""></div>'+
'<div id="iframesize_manager_adivaha_hotel_travelpayout_booking_adults" style=""></div>'+








'<style></style>'

};
})

jQuery(function() {
	var prefix =jQuery('#prefix_travelpayout_hotels').val(); 
	var language =document.getElementById("adh_language").value;
	if(language=='ar'){
	  var daysOfWeek =['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
	  var monthNames =['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونية','يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
	  var opens ='left';
	  var direction ='rtl';
	}else{
	 var daysOfWeek =['Su','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	 var monthNames =['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
	 var opens ='right';
	 var direction ='ltr';	
	}

	if (document.getElementById(prefix+"checkIn") != null) {			
		var today_Date = new moment(document.getElementById(prefix+"checkIn").value);
		var nextDayDate = new moment(document.getElementById(prefix+"checkOut").value);
		var today = new Date();
		jQuery("#"+prefix+"dateRange").daterangepicker({
		startDate: today_Date, 
		endDate: nextDayDate,
		opens: opens,
		autoApply: true,
		minDate: today,
		autoclose: true,
		locale: {
			  direction: direction,
			  format: 'DD-MMM-YYYY',
			  daysOfWeek: daysOfWeek,
			  monthNames: monthNames ,
			  separator: " - ",
			  firstDay: 1
			}
		}, function(start, end, label) {
		  jQuery("#"+prefix+"checkIn").val(start.format('YYYY-MM-DD'));
		  jQuery("#"+prefix+"checkOut").val(end.format('YYYY-MM-DD'))
		});
		
		
		/*
		
		var forResize =document.getElementById('two_hotels_forResize').value;*/
		
		var forResize =document.getElementById('travelpayout_hotels_forResize').value;
	jQuery("#"+prefix+"dateRange").on('show.daterangepicker', function(ev, picker) {
			//do something, like clearing an input
	   if(forResize=='Yes'){	
		document.getElementById("iframesize_cal_manager_adivaha_hotel_travelpayout_booking").style.height = "500px";
	   }
	});
	jQuery("#"+prefix+"dateRange").on('hide.daterangepicker', function(ev, picker) {
		//do something, like clearing an input
		if(forResize=='Yes'){
		 document.getElementById("iframesize_cal_manager_adivaha_hotel_travelpayout_booking").style.height = "0px";
		}
	});
	
	
	/*jQuery("#"+prefix+"checkIn").on('show.daterangepicker', function(ev, picker) {
		
	   if(forResize=='Yes'){	
		document.getElementById("iframesize_cal_manager_adivaha_hotel_travelpayout_booking").style.height = "500px";
	   }
	});
	jQuery("#"+prefix+"checkOut").on('hide.daterangepicker', function(ev, picker) {

		if(forResize=='Yes'){
		 document.getElementById("iframesize_cal_manager_adivaha_hotel_travelpayout_booking").style.height = "0px";
		}
	});
		
		
		*/
		
		
		
	}
	
	
});