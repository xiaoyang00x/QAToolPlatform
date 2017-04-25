$(document).ready(function(){
	$("button#signin").click(function(){
		$.ajax({
			cache: true,
	        type: "POST",
	        url:"http://10.0.1.167:3000/signin",
	        data:$('#form-signin').serialize(),// 你的formid
	        async: false,
	        error: function(request) {
	            alert("Connection error");
	        },
	        success: function(data) {
	           console.log(data);
	    	}		       
		})
  })

});



$(document).ready(function(){
	$("button#signup").click(function(){
		$.ajax({
			cache: true,
	        type: "POST",
	        url:"http://10.0.1.167:3000/signup",
	        data:$('#form-signin').serialize(),// 你的formid
	        async: false,
	        error: function(request) {
	            alert("Connection error");
	        },
	        success: function(data) {
	           console.log(data);
	    	}		       
		})
  })
});
