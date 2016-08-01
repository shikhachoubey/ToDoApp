$(document).ready(function(){
    var length;
    var data;
    var taskListData = [];
    var taskItem=[];
    setTime();
    $("#dialogBox").hide();
    $("#dialogDate").datepicker({
        yearRange: "2016:2020",
        minDate: '0',
        changeMonth: true,
        changeYear: true,
    });
    $("#dialogDate").datepicker().datepicker("setDate", new Date());
    $("#addTask").click(function() {
        newDialogBox();
    });

    /*var onClickEditTask = function(id){
        console.log('In onClickEditTask:: ',id); //task1/ task2
        var taskIndex = id - 1;
        var taskItem  = taskListData[taskIndex];
        openEditTaskDialog(taskItem);
    }*/

    function newDialogBox(){
        $("#dialogTitle").val('');
        $("#dialogDescription").val('');
        $("#dialogBox").dialog({
            buttons: {
                SAVE: function() {
                    if(($('#dialogTitle').val() == '')||($('#dialogDescription').val()== '')){
                        alert("Please enter task Title and Description.");
                    }else{
                        /*if(today.getMinutes() == startmin){
                            alert("alarm ringing");
                        }*/
                        taskItem.push(getDataFromAddTaskDialog());
                        $(this).dialog("close");
                        loadDataInDiv(getDataFromAddTaskDialog(), taskItem.length);
                    }
                }
            }
        });
    }

    function getDataFromAddTaskDialog(){
        return data={
            title: toTitleCase($("#dialogTitle").val()),
            date: $("#dialogDate").val(),
            hour: $("#dialogStartHour").val(),
            min: $("#dialogStartMin").val(),
            AMPM: $("#dialogAmPm").val(),
            descrip: $("#dialogDescription").val(),
        }
    }

    var loadDataInDiv = function(taskItem, length){
        var id = 'task' + length;
        var newHtml='<div class="span1" id="'+ id +'"><div><span>TITLE:</span><span>'+data.title+'</span><span><button class="button">edit</button></span></div><div><span>TIME:</span><span>'+data.hour+':'+data.min+data.AMPM+'</span></div><div></div><div><span>DATE:</span><span>'+data.date+'</span></div><div><span>DESCRIPTION:</span><span>'+data.descrip+'</span></div></div></div><br>';  
        $(".box1").append(newHtml);
        $("#"+id).draggable({
            revert : 'invalid'
        });
        console.log(id)
        $(".box2").droppable({
            drop: function (event,ui) {
                accept:'.box1',
                console.log(ui);
                $(ui.draggable).css('top','0px');
            }
        });
        $(".button").click(function(){
            $(".button").hide();
            $("#"+id).hide();
            $("#dialogBox").dialog({
                buttons: {
                    SAVE: function() {
                        $(this).dialog("close");
                        loadDataInDiv(getDataFromAddTaskDialog(), taskItem.length);
                        $(".button").hide();
                    }
                }    
            });  
        });
    }

    function setTime() {
        var today=new Date();
        var hours = today.getHours();
        var minutes = today.getMinutes();
        var ampm = (hours>= 12) ? 'PM' : 'AM';
        var timeHour = $("#dialogStartHour").val(hours);
        var timeMin = $("#dialogStartMin").val(minutes);
        var AMPM = $("#dialogAmPm").val(ampm);
    }

    function toTitleCase(str) {
        return str.replace(/(?:^|\s)\w/g, function(match) {
            return match.toUpperCase();
        });
    } 
});