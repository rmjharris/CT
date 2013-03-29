var PARSE_APP = "w5m8A2SsDHB7nfgXOoA4K0URVVcHZKbNE0fN9GEM";
var PARSE_JS = "oBnSjsM0cjWQJ9u4wmNagq8nVvtEOE4vHFX0sRxx";
var currentUser;

function init() {
    document.addEventListener('deviceready', deviceready, false);
}

function deviceready() {
    console.log("device ready to roll");
    if(navigator.connection.type === Connection.UNKNOWN ||
        navigator.connection.type === Connection.NONE) {
    } else {
        console.log("Initialize Parse");
        appReady();
    }
}

function appReady() {
	Parse.initialize(PARSE_APP, PARSE_JS);

	$(document).on("touchend","#lgButton", function(e) {
		e.preventDefault();
		
		$("#status").html("").removeClass("errorDiv");
		
		var usermail = $("#userName").val();
		var userpass = $("#passWord").val();
	
		var errors = "";
        if(userName === "") errors += "Username required.<br/>";
        if(passWord === "") errors += "Password required.<br/>";
		
		if(errors !== "") {
            $("#status").html(errors).addClass("errorDiv");
            return;
        }
		
		$("#status").html("<b>Logging in...</b>");
		
		Parse.User.logIn(userName, passWord, {
            success:function(user) {
                currentUser = user;
				console.log("Logged In!");
                console.dir(logged);
				$("#status").html(logged.message).addClass("errorDiv");
            },
            error:function(user, error) {
                console.log("ERROR!");
                console.dir(error);
                $("#status").html(error.message).addClass("errorDiv");
            }
        });
	});
}
