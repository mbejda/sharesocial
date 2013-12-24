require.config({
    packages: [
        { name: 'helpers',
            location: 'helpers',
        },
        { name: 'models',
            location: 'models',
        }
    ],
    paths: {
        'knockout'              : '../vendors/knockout/js/knockout-3.0.0',
        'ko-mapping'            :  '../vendors/knockout/js/komapping',
        'jquery'                : '../vendors/jquery/js/jquery.1.10.2',
        'jquery-ui'             : '../vendors/jquery/js/jquery-ui-1.10.3.custom.min',
        'bootstrap'             : '../vendors/bootstrap/js/bootstrap',
        'bootstrap-switch'      : '../vendors/bootstrap/js/bootstrap-switch',
        'bootstrap-select'      : '../vendors/bootstrap/js/bootstrap-select',
        'bootstrap-datepicker'  : '../vendors/bootstrap/js/bootstrap.datepicker',
        'wizard'                : '../vendors/fuelex/js/fuelux.wizard',
        'datatables'            : '../vendors/datatables/js/jquery.dataTables',
        //'google-places'         : 'http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false',
        'geocomplete'           : '../vendors/geocomplete/js/jquery.geocomplete',
        'highcharts'            : '../vendors/highcharts/js/highcharts-all',
        'fullcalendar'          : '../vendors/fullcalendar/js/fullcalendar.min',
        'theme'                 : 'theme',
        'jquery-scrollto'      : '../vendors/jquery/js/jquery.scrollTo-1.4.3.1-min'
    },
    shim: {
        "datatables":{
            deps: ["jquery"],
            exports: "datatables"
        },
        "geocomplete":{
            deps: ["jquery"],
            exports: "geocomplete"
        },
        "bootstrap":{
            deps: ["jquery"],
            exports: "bootstrap"
        },
        "bootstrap-switch":{
            deps: ["jquery","bootstrap"],
            exports: "bootstrap-switch"
        },
        "bootstrap-select":{
            deps: ["jquery","bootstrap"],
            exports: "bootstrap-select"
        },
        "bootstrap-datepicker":{
            deps: ["jquery","bootstrap"],
            exports: "bootstrap-datepicker"
        }
    }
});
//helpers 'responseHelper','chartHelper','testData,themehelper'
//
require(['knockout','jquery','bootstrap'],
    function(ko,$,bootstrap) {

        var Super =  new models.superModel();


        var vm =  {
            Analytics :  models.analyticsModel,
            Account:  models.accountModel,
            Campaigns:  new models.campaignsModel(),
            Search: new models.searchModel(),
            // Super : new models.superModel()
        }

        //document ready
        $(function() {


            //bind knockout models
            ko.applyBindings(vm);
            Super.init(curPageURL);



            //bootstrap popover - click outside of popover to close
            $('body').on('click', function (e) {
                $('[data-toggle="popover"]').each(function () {
                    //the 'is' for buttons that trigger popups
                    //the 'has' for icons within a button that triggers a popup
                    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                        $(this).popover('hide');
                        $('.popover').hide();
                    }
                });
            });
        });

    });
