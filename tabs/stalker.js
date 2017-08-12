'use strict';

TABS.stalker = {};
TABS.stalker.initialize = function (callback) {
    var self = this;

    if (GUI.active_tab != 'stalker') {
        GUI.active_tab = 'stalker';
        //googleAnalytics.sendAppView('Stalker');
    }


    $('#content').load("./tabs/stalker.html", process_html);

    
    if (semver.lt(CONFIG.apiVersion, "1.32.0")) {
            $(".tab-stalker").removeClass("supported");
            return;
        }
        
        $(".tab-stalker").addClass("supported");


    function process_html() {
        
        $('a.update').click(function () {
            console.log("update click")
        });
        
        localize();
        GUI.content_ready(callback);
    }

    function update_stalker_raw_data() {
            
    }

    function update_stalker_uav_data() {
        
    }
    
    GUI.interval_add('STALKER_RAW_Pull', function stalker_raw_pull() {
        MSP.send_message(MSP_codes.MSP_STALKER_RAW_DATA, false, false, update_stalker_raw_data);
    }, 50, true);
    
    GUI.interval_add('STALKER_UAV_Pull', function stalker_uav_pull() {
        MSP.send_message(MSP_codes.MSP_STALKER_UAV_DATA, false, false, update_stalker_uav_data);
    }, 50, true);
};

TABS.stalker.cleanup = function (callback) {
    if (callback) callback();
};
