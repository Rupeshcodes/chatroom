//set user id by php
var username='rupesh';
var userid='192';


var rootref= firebase.database().ref().child('chatroom');

function resetChat(){
    $("ul").empty();
}

$(".mytext").on("keydown", function(e){
    if (e.which == 13){
        var text = $(this).val();
		
		var name= username;
        if (text!=""){
            insertNewChat(name , text);              
            $(this).val('');
        }
    }
});

$('#enter').click(function(){
    $(".mytext").trigger({type: 'keydown', which: 13, keyCode: 13});
})

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}            


rootref.on("child_added",snap =>{
    
    var name = snap.child("name").val();
    var time = snap.child("time").val();
    var content = snap.child("content").val();
    var mid = snap.child("memberid").val();
	
	showChat(name,content,time,mid);
	
});
//-- No use time. It is a javaScript effect. insert all chats
function showChat(who, textt, time,mid){
 
    var control = "";	
    if (who == username){
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+textt+'</p>' +
                                '<p><small>'+time+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><a href="https://www.myeksas.com/profile.php?id='+mid+'">'+who+'</a></div>' +                                
                  '</li>';                 
    }else{
        control ='<li style="width:100%">' +
                        '<div class="msj macro">' +
						'<div class="avatar"><a href="https://www.myeksas.com/profile.php?id='+mid+'">'+who+'</a></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ textt +'</p>' +
                                '<p><small>'+time+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';
		
		
    }
	
                              
            $("ul").append(control).scrollTop($("ul").prop('scrollHeight'));
        
}




//-- Clear Chat
resetChat();


//-- NOTE: No use time on insertChat.


function insertNewChat(who, textt){
	
    var date = formatAMPM(new Date());
    
    if (who == username){     
        var fref = firebase.database().ref();

fref.child('chatroom').push(

{
    name:username,
    time:date,
	content:textt,
	memberid:userid
}
);          				  
    }else{
		alert('Please login');
		
	}
	                       
          
    
}

showChat("me", "Hello Tom...",'23 pm','23');
showChat("me", "mamamamamama",'23 pm','23');
showChat("rupesh", "nonon no ",'23 pm','192');
showChat("me", "mdpawdpowad hnaoidnaodi...",'23 pm','24');
showChat("rupesh", "rupesh best",'23 pm','192');
