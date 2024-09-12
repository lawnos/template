!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r=e();for(var o in r)("object"==typeof exports?exports:t)[o]=r[o]}}(self,(function(){return function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){for(var o=0;o<e.length;o++){var a=e[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,r(a.key),a)}}function r(e){var r=function(e,r){if("object"!=t(e)||!e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var a=o.call(e,r||"default");if("object"!=t(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}(e,"string");return"symbol"==t(r)?r:r+""}var o=function(){return t=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)},o=[{key:"initCompanyProfileMap",value:function(){var t="company_profile_map";if(KTDom.getElement("#".concat(t))&&L){var e,r=L.map(t,{center:[40.725,-73.985],zoom:30});L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(r),e=void 0===L.esri.Geocoding?L.esri.geocodeService():L.esri.Geocoding.geocodeService();var o=L.layerGroup().addTo(r),a=L.divIcon({html:'<i class="ki-solid ki-geolocation text-3xl text-success"></i>',bgPos:[10,10],iconAnchor:[20,37],popupAnchor:[0,-37],className:"leaflet-marker"});L.marker([40.724716,-73.984789],{icon:a}).addTo(o).bindPopup("430 E 6th St, New York, 10009.",{closeButton:!1}).openPopup(),r.on("click",(function(t){e.reverse().latlng(t.latlng).run((function(t,e){t||(o.clearLayers(),e.address.Match_addr,L.marker(e.latlng,{icon:a}).addTo(o).bindPopup(e.address.Match_addr,{closeButton:!1}).openPopup())}))}))}}},{key:"initContributionChart",value:function(){var t=["var(--tw-primary)","var(--tw-brand)","var(--tw-success)","var(--tw-info)","var(--tw-warning)"],e={series:[44,55,41,17,15],labels:["ERP","HRM","DMS","CRM","DAM"],colors:t,fill:{colors:t},chart:{type:"donut"},stroke:{show:!0,width:2,colors:"var(--tw-light)"},dataLabels:{enabled:!1},plotOptions:{pie:{expandOnClick:!1}},legend:{offsetY:-10,offsetX:-10,fontSize:"13px",fontWeight:"500",itemMargin:{vertical:1},labels:{colors:"var(--tw-gray-700)",useSeriesColors:!1},markers:{width:8,height:8}},responsive:[{breakpoint:480,options:{chart:{width:200},legend:{position:"bottom"}}}]},r=document.querySelector("#contributions_chart");r&&new ApexCharts(r,e).render()}},{key:"initMediaUploadsChart",value:function(){var t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e={series:[{name:"series1",data:[85,65,50,70,40,45,100,55,85,60,70,90]}],chart:{height:250,type:"area",toolbar:{show:!1}},dataLabels:{enabled:!1},legend:{show:!1},stroke:{curve:"smooth",show:!0,width:3,colors:["var(--tw-primary)"]},xaxis:{categories:t,axisBorder:{show:!1},maxTicks:12,axisTicks:{show:!1},labels:{style:{colors:"var(--tw-gray-500)",fontSize:"12px"}},crosshairs:{position:"front",stroke:{color:"var(--tw-primary)",width:1,dashArray:3}},tooltip:{enabled:!1,formatter:void 0,offsetY:0,style:{fontSize:"12px"}}},yaxis:{min:0,max:100,tickAmount:5,axisTicks:{show:!1},labels:{style:{colors:"var(--tw-gray-500)",fontSize:"12px"},formatter:function(t){return"$".concat(t,"K")}}},tooltip:{enabled:!0,custom:function(e){var r=e.series,o=e.seriesIndex,a=e.dataPointIndex,s=e.w,i=1e3*parseInt(r[o][a]),n=s.globals.seriesX[o][a],l=t[n],c=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(i);return'\n\t\t\t\t\t\t<div class="flex flex-col gap-2 p-3.5">\n\t\t\t\t\t\t\t<div class="font-medium text-2sm text-gray-600">'.concat(l,', 2024 Sales</div>\n\t\t\t\t\t\t\t<div class="flex items-center gap-1.5">\n\t\t\t\t\t\t\t\t<div class="font-semibold text-md text-gray-900">').concat(c,'</div>\n\t\t\t\t\t\t\t\t<span class="badge badge-outline badge-success badge-xs">+24%</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t')}},markers:{size:0,colors:"var(--tw-primary-light)",strokeColors:"var(--tw-primary)",strokeWidth:4,strokeOpacity:1,strokeDashArray:0,fillOpacity:1,discrete:[],shape:"circle",radius:2,offsetX:0,offsetY:0,onClick:void 0,onDblClick:void 0,showNullDataPoints:!0,hover:{size:8,sizeOffset:0}},fill:{gradient:{enabled:!0,opacityFrom:.25,opacityTo:0}},grid:{borderColor:"var(--tw-gray-200)",strokeDashArray:5,clipMarkers:!1,yaxis:{lines:{show:!0}},xaxis:{lines:{show:!1}}}},r=document.querySelector("#media_uploads_chart");r&&new ApexCharts(r,e).render()}},{key:"initEarningsChart",value:function(){var t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e={series:[{name:"series1",data:[75,25,45,15,85,35,70,25,35,15,45,30]}],chart:{height:250,type:"area",toolbar:{show:!1}},dataLabels:{enabled:!1},legend:{show:!1},stroke:{curve:"smooth",show:!0,width:3,colors:["var(--tw-primary)"]},xaxis:{categories:t,axisBorder:{show:!1},maxTicks:12,axisTicks:{show:!1},labels:{style:{colors:"var(--tw-gray-500)",fontSize:"12px"}},crosshairs:{position:"front",stroke:{color:"var(--tw-primary)",width:1,dashArray:3}},tooltip:{enabled:!1,formatter:void 0,offsetY:0,style:{fontSize:"12px"}}},yaxis:{min:0,max:100,tickAmount:5,axisTicks:{show:!1},labels:{style:{colors:"var(--tw-gray-500)",fontSize:"12px"},formatter:function(t){return"$".concat(t,"K")}}},tooltip:{enabled:!0,custom:function(e){var r=e.series,o=e.seriesIndex,a=e.dataPointIndex,s=e.w,i=1e3*parseInt(r[o][a]),n=s.globals.seriesX[o][a],l=t[n],c=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(i);return'\n\t\t\t\t\t\t<div class="flex flex-col gap-2 p-3.5">\n\t\t\t\t\t\t\t<div class="font-medium text-2sm text-gray-600">'.concat(l,', 2024 Sales</div>\n\t\t\t\t\t\t\t<div class="flex items-center gap-1.5">\n\t\t\t\t\t\t\t\t<div class="font-semibold text-md text-gray-900">').concat(c,'</div>\n\t\t\t\t\t\t\t\t<span class="badge badge-outline badge-success badge-xs">+24%</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t')}},markers:{size:0,colors:"var(--tw-primary-light)",strokeColors:"var(--tw-primary)",strokeWidth:4,strokeOpacity:1,strokeDashArray:0,fillOpacity:1,discrete:[],shape:"circle",radius:2,offsetX:0,offsetY:0,onClick:void 0,onDblClick:void 0,showNullDataPoints:!0,hover:{size:8,sizeOffset:0}},fill:{gradient:{enabled:!0,opacityFrom:.25,opacityTo:0}},grid:{borderColor:"var(--tw-gray-200)",strokeDashArray:5,clipMarkers:!1,yaxis:{lines:{show:!0}},xaxis:{lines:{show:!1}}}},r=document.querySelector("#earnings_chart");r&&new ApexCharts(r,e).render()}},{key:"initMyBalanceChart",value:function(){var t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"],e={series:[{name:"series1",data:[75,25,45,15,85,35,70,25,35]}],chart:{height:250,type:"area",toolbar:{show:!1}},dataLabels:{enabled:!1},legend:{show:!1},stroke:{curve:"smooth",show:!0,width:3,colors:["var(--tw-primary)"]},xaxis:{categories:t,axisBorder:{show:!1},maxTicks:12,axisTicks:{show:!1},labels:{style:{colors:"var(--tw-gray-600)",fontSize:"12px"}},crosshairs:{position:"front",stroke:{color:"var(--tw-primary)",width:1,dashArray:3}},tooltip:{enabled:!1,formatter:void 0,offsetY:0,style:{fontSize:"12px"}}},yaxis:{min:0,max:100,tickAmount:5,axisTicks:{show:!1},labels:{style:{colors:"var(--tw-gray-600)",fontSize:"12px"},formatter:function(t){return"$".concat(t,"K")}}},tooltip:{enabled:!0,custom:function(e){var r=e.series,o=e.seriesIndex,a=e.dataPointIndex,s=e.w,i=1e3*parseInt(r[o][a]),n=s.globals.seriesX[o][a],l=t[n],c=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(i);return'\n\t\t\t\t\t\t<div class="flex flex-col gap-2 p-3.5">\n\t\t\t\t\t\t\t<div class="font-medium text-2sm text-gray-600">'.concat(l,', 2024 Sales</div>\n\t\t\t\t\t\t\t<div class="flex items-center gap-1.5">\n\t\t\t\t\t\t\t\t<div class="font-semibold text-md text-gray-900">').concat(c,'</div>\n\t\t\t\t\t\t\t\t<span class="badge badge-outline badge-success badge-xs">+24%</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t')}},markers:{size:0,colors:"var(--tw-primary-light)",strokeColors:"var(--tw-primary)",strokeWidth:4,strokeOpacity:1,strokeDashArray:0,fillOpacity:1,discrete:[],shape:"circle",radius:2,offsetX:0,offsetY:0,onClick:void 0,onDblClick:void 0,showNullDataPoints:!0,hover:{size:8,sizeOffset:0}},fill:{gradient:{enabled:!0,opacityFrom:.25,opacityTo:0}},grid:{borderColor:"var(--tw-gray-200)",strokeDashArray:5,clipMarkers:!1,yaxis:{lines:{show:!0}},xaxis:{lines:{show:!1}}}},r=document.querySelector("#my_balance_chart");r&&new ApexCharts(r,e).render()}}],(r=null)&&e(t.prototype,r),o&&e(t,o),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,r,o}();return KTDom.ready((function(){o.initCompanyProfileMap(),o.initContributionChart(),o.initMediaUploadsChart(),o.initEarningsChart(),o.initMyBalanceChart()})),{}}()}));