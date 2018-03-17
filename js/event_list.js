function getevent(){
    


        if (document.getElementById("work_event")) {
                document.getElementById('loading_gif').style.display = "";
                 Ext.Ajax.request({
                        url: AJAX_ROOT + 'event/listEvent',
                        method: 'POST',
                        success: function(response, config) {
                                document.getElementById('loading_gif').style.display = "none";
                                var ret = Ext.util.JSON.decode(response.responseText);
                                document.getElementById("timestamp").innerHTML = ret.timestamp;
                                document.getElementById("work_event").innerHTML = ret.work_event;
                        }
                });
        }
}

var event_task ={
        run:getevent,
        interval:1000000
        
}  

var event_runner = new Ext.util.TaskRunner();
// event_runner.start(event_task);

