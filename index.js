$(() => {
    $.ajax({
        url: "http://54.87.35.125:3333/usuario",
        method: "GET",
        success: (result) => {
            $("#tUsuarios>tbody").html("");
            for(i in result){
                let $row = `<tr><td>${result[i].client_id}</td><td>${montarSave(result[i].save_data)}</td></tr>`;
                $("#tUsuarios>tbody").append($row);
            }
        }
    })
});

function montarSave(save_data){
    let stages = save_data.split(";;")[0].split(",");
    let stars = save_data.split(";;")[1].split(",");

    console.log(stages);

    //ordenar(stages, stars);

    console.log(stages);

    let retorno = "";

    for(i in stages){
        let stg = stages[i].substr(3);
        let star = stars[i];

        console.log(stg);

        let show = `<span class="badge bg-secondary">${stg}${montarStars(star)}</span>`;
        retorno += show;
    }

    // console.log(retorno);

    return retorno;
}

function ordenar(stages, stars){
    for(i in stages){
        for(j in stages){
            if(stages[i] < stages[j]){
                let aux_stg = stages[i];
                let aux_star = stars[i];
                stages[i] = stages[j];
                stars[i] = stars[j];
                stages[j] = aux_stg;
                stages[j] = aux_star;
            }
        }
    }

    // console.log(stages);
}

function montarStars(stars){
    let ret = "";
    for(i=0; i<stars; i++){
        ret += "<div class='five-pointed-star'></div>";
    }
    return ret;
}