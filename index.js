$(() => {
    $.ajax({
        url: "http://54.87.35.125:3333/usuario",
        method: "GET",
        success: (result) => {
            $("#tUsuarios>tbody").html("");
            for(i in result){
                montarUsuario(result[i])
            }
        }
    })
});

function montarUsuario(usuario){
    
    let user_id = usuario.id
    let client_id = usuario.client_id

    let $row = `<tr><td>${user_id}</td><td id='user_save_${user_id}'></td></tr>`;

    $("#tUsuarios>tbody").append($row);

    loadSave(client_id, user_id);
}

function loadSave(client_id, user_id){
    $.ajax({
        url: "http://54.87.35.125:3333/usuario/getdados/" + client_id,
        method: "GET",
        success: (result) => {
            for(var i in result){
                let show = `<span class="badge bg-secondary" style="display: inline-flex;">${result[i].level}&nbsp;&nbsp;${montarStars(result[i].stars)}</span>`;
                $(`#user_save_${user_id}`).append(show);
            }
        }
    })
}

/*function montarSave(save_data){
    let stages = save_data.split(";;")[0].split(",");
    let stars = save_data.split(";;")[1].split(",");

    let retorno = "";

    for(i in stages){
        let stg = stages[i].substr(3);
        let star = stars[i];

        console.log(stg);

        let show = `<span class="badge bg-secondary" style="display: inline-flex;">${stg}&nbsp;&nbsp;${montarStars(star)}</span>`;
        retorno += show;
    }

    // console.log(retorno);

    return retorno;
}*/

function montarStars(stars){
    let ret = "";
    for(i=0; i<stars; i++){
        ret += "<div class='five-pointed-star'></div>";
    }
    return ret;
}