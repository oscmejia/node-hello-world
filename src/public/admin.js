

$(document).ready(function () {
    $('#users').DataTable({
        "ajax": "./api/user",
        "dataType": "json",
        "paging": false,
        "ordering": false,
        buttons: [
            {
                text: 'Reload',
                action: function (e, dt, node, config) {
                    dt.ajax.reload();
                }
            }
        ],
        "columns": [
            { "data": "first_name" },
            { "data": "last_name" },
            { "data": "address_1" },
            { "data": "address_2" },
            { "data": "city" },
            { "data": "state" },
            { "data": "zipcode" },
            { "data": "zipcode_plus4" },
            { "data": "country" }
        ]
    });
});