ngSISApplication.directive('sisCalender',
[
    '$templateCache', 'httpi', 'Logger', 'Utilities','$filter',
    function ($templateCache, httpi, Logger, Utilities,$filter) {
        var li = Logger.i('Directive -> sisCalender');
        li.log('Init');
        return {
            restrict: 'E',
            replace: true,
            scope: {
                selOption: "=ngModel"

            },
            //templateUrl: "SisCalender.html",
            template: function () {
                // return $templateCache.get('sisCalendar.html');

                //return '<div>  <div id="gregDiv">   <input type="text" id="gregCalendar"/> <button class="icon-button"  ng-click="gregClicked();">   <i class="fa fa-calendar" style="font-size:24px;"> </i></button>   </div> <div id="hijridiv"> <input type="text" id="hijriDate"> <button class="icon-button" ng-click="hijraClicked();">         <i class="fa fa-calendar" style="font-size:24px;color:green;"> </i>     </button>   </div>  <br />     <label id="hijriDate"> </label> </div>'

                return '<div>  <div id="gregDiv">   <input type="text" id="gregCalendar"/> <button class="icon-button"  ng-click="gregClicked();">   <i class="fa fa-calendar" style="font-size:24px;"> </i></button> <button class="icon-button" ng-click="hijraClicked();">         <i class="fa fa-calendar" style="font-size:24px;color:green;"> </i>     </button>  </div> <div id="hijridiv">(MM-DD-YYYY)   </div>  <br />     <label id="hijriDate"> </label> </div>'
            },
            controller: [
                '$scope', function ($scope) {
                    var self = this;
                }
            ],
            link: function (scope, el, attr, controller) {
                Logger.logInit('sisCalender', controller);
                li.log('invoke link');
                var cal1 = new Calendar(),
                cal2 = new Calendar(true, 0, false, true),
                date1 = document.getElementById('gregCalendar'),
                date2 = document.getElementById('hijriDate'),
                cal1Mode = cal1.isHijriMode(),
                cal2Mode = cal2.isHijriMode();

                document.getElementById('gregDiv').appendChild(cal1.getElement());
                document.getElementById('hijridiv').appendChild(cal2.getElement());

                scope.gregClicked = function () {
                    cal1.show();
                }

                scope.hijraClicked = function () {
                    cal2.show();
                }
                cal2.callback = function () {
                    if (cal2Mode !== cal2.isHijriMode()) {
                        cal1.disableCallback(true);
                        cal1.changeDateMode();
                        cal1.disableCallback(false);
                        cal1Mode = cal1.isHijriMode();
                        cal2Mode = cal2.isHijriMode();
                        cal1.setTime(cal2.getTime());
                    }
                    else {
                        cal1.setTime(cal2.getTime());
                    }
                    setDateFields();
                    cal2.hide();
                };
                cal1.callback = function () {
                    if (cal1Mode !== cal1.isHijriMode()) {
                        cal2.disableCallback(true);
                        cal2.changeDateMode();
                        cal2.disableCallback(false);
                        cal1Mode = cal1.isHijriMode();
                        cal2Mode = cal2.isHijriMode();
                    }
                    else {
                        cal2.setTime(cal1.getTime());
                    }
                    setDateFields();
                };
                function setDateFields() {
                    //date1.value = cal1.getDate().getDateString();
                    //for English Date
                             date1.value = $filter('date')(cal1.getDate(), 'MM-dd-yyyy');
                    //for Hijri Date
                           date2.value = cal2.getDate().getDateString();
                    //date2.value = $filter('date')(cal2.getDate(), 'MM-dd-yyyy');

                    scope.selGregDate = date1.value;
                    scope.selHijriDate = date2.value;
                    //for Both English & Hijri
                    //scope.selOption = date1.value + "," + date2.value;
                    //for Only hijri Date value
                    scope.selOption = date2.value;
                    //alert(scope.selGregDate + " " + scope.selHijriDate);
                }
            }
        }
    }]);