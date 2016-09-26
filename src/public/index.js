
$.validate({
    lang: 'en',
    errorMessagePosition: 'top',
    form: '#registration-form',
    validateOnBlur : false,
    onSuccess: function () {
        var processingStr = "Procesing...";
        var registerbtn = $("#registerBtn");

        // never submit more than once
        if(registerbtn.val() !== processingStr){
            // feedback for user.
            registerbtn.toggleClass('btn-info btn-success');
            registerbtn.val(processingStr);

            doRegistration();
        }
        
        // stop the submission of the form
        return false; 
    }
});

// Package data and call backend endpoint
function doRegistration() {
    var first_name = $("#first_name").val().trim();
    var last_name = $("#last_name").val().trim();
    var address_1 = $("#address_1").val().trim();
    var address_2 = $("#address_2").val().trim();
    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var zipcode = $("#zipcode").val().trim();
    var zipcode_plus4 = $("#zipcode_plus4").val().trim();
    var country = $("#country").val().trim();

    var data = {
        first_name: first_name,
        last_name: last_name,
        address_1: address_1,
        address_2: address_2,
        city: city,
        state: state,
        zipcode: zipcode,
        zipcode_plus4: zipcode_plus4,
        country: country
    };

    $.ajax({
        url: '/api/register', 
        type: 'POST', 
        contentType: 'application/json', 
        data: JSON.stringify(data),
        success: onRegistered
    });
 
}

// on succesful registration, go to confirmation page
function onRegistered(res){
    console.log("onRegistered", res);
    window.location.href = "./confirmation.html";
}