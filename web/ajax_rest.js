$(document).ready(function () {

    $("#frm").submit(function (event) {
        var formData = {
            ip: $("#ip").val(),
        };

        var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address";

        if(iSEmptyInputsFrm(formData)) {
            return;
        }

        $.ajax({
            type: "POST",
            url: url,
                beforeSend: function (hdrs) {
                    hdrs.setRequestHeader("Accept", "application/json");
                    hdrs.setRequestHeader("Content-Type", "application/json");
                    hdrs.setRequestHeader("Authorization", "Token 833f50904ce0c04b16be7b367ebc56c3179f74f6");
                },
            data: JSON.stringify({
               ip: formData.ip
            }),
            dataType: "json",
            encode: true,
        }).done(function (result) {
            console.log(result);

            $("#span_for_name").html(
                '<p>Город: ' + checkLocation(result.location) + '</p>'
            );
        }).done(function () {
            $("#frm").hide();
            $("#span_for_name").show();
            $("#link").show();
        });

        event.preventDefault();
    });

    $("#link").click(function (e) {
        e.preventDefault();
        $("#frm").show();
        $("#frm")[0].reset();
        $("#span_for_name").hide();
        $("#link").hide();
    })
});

function iSEmptyInputsFrm(frm)
{
    if(frm.ip === ""){
        alert("Необходимо заполнить поле IP")
        return true;
    }
    return false;
}

function checkLocation(location){
    if(!location){
        return "Адрес не найден!";
    }
    return location.value;
}
