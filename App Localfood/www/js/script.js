var xhttp = new XMLHttpRequest();
var Token = "Bearer rdsq33fe895u780tdbe2f0dlvc8o47tj";
//prima chiamata recupero prodotto singolo
function Cambiotesto(){
    // xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        var data = this.responseText;
        var jsonResponse = JSON.parse(data);
        document.getElementById("nomeprod").innerHTML =
            jsonResponse.name;
        document.getElementById("price").innerHTML =
            jsonResponse.price;
        document.getElementById("info").innerHTML =
            jsonResponse.custom_attributes[0].value;

        };
    xhttp.open("GET","https://food.localecom.it/Cremasco/index.php/rest/V1/products/PB004",true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.setRequestHeader("Authorization", Token);
    xhttp.send();
}

//Funzione recupero nomi categorie
function NomeCate(id){
    var link_menu ="";
    var text_prodotti ="";
    //var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200){
                var data = this.responseText;
                var jsonResponse = JSON.parse(data);
                for(var i=0; i < jsonResponse.items.length; i++){
                    //console.log("Nomecate lenght " + jsonResponse.items.length);
                    if (i===0){
                        //console.log("Categoria IF: " + jsonResponse.items[i].name);
                        link_menu += "<li class=\"nav-item\">" +
                            "<a class=\"nav-link active\" id=\"pills-"+jsonResponse.items[i].id+"-tab\" data-toggle=\"pill\" href=\"#pills-" + jsonResponse.items[i].id + "\" role=\"tab\" aria-controls=\"pills-" + jsonResponse.items[i].id + "\" aria-selected=\"true\" onclick=\"ProdCate('pills-"+ jsonResponse.items[i].id +"')\">" +
                            jsonResponse.items[i].name + "</a></li>";
                        text_prodotti +="<div class=\"tab-pane fade show active\" id=\"pills-"+ jsonResponse.items[i].id +"\" role=\"tabpanel\" aria-labelledby=\"pills-"+jsonResponse.items[i].id+"-tab\"></div>";
                        document.getElementById("pills-tab").innerHTML = link_menu;
                        document.getElementById("pills-tabContent").innerHTML = text_prodotti;
                        ProdCate("pills-"+ jsonResponse.items[i].id);
                    }else {
                        //console.log("Categoria Else:" + jsonResponse.items[i].name);
                        link_menu += "<li class=\"nav-item\">" +
                            "<a class=\"nav-link\" id=\"pills-" + jsonResponse.items[i].id + "-tab\" data-toggle=\"pill\" href=\"#pills-" + jsonResponse.items[i].id + "\" role=\"tab\" aria-controls=\"pills-" + jsonResponse.items[i].id + "\" aria-selected=\"false\" onclick=\"ProdCate('pills-"+ jsonResponse.items[i].id +"')\">" +
                            jsonResponse.items[i].name + "</a></li>";
                        text_prodotti += "<div class=\"tab-pane fade\" id=\"pills-" + jsonResponse.items[i].id + "\" role=\"tabpanel\" aria-labelledby=\"pills-" + jsonResponse.items[i].id + "-tab\"></div>";
                        document.getElementById("pills-tab").innerHTML = link_menu;
                        document.getElementById("pills-tabContent").innerHTML = text_prodotti;
                        ProdCate("pills-"+ jsonResponse.items[i].id);
                    }
                }
            }else{
                console.log("Richiesta non 200");
            }
        };
    var Url= "https://food.localecom.it/Cremasco/index.php/rest/V1/categories/list?" +
        "searchCriteria[filterGroups][0][filters][1][conditionType]=eq" +
        "&searchCriteria[filterGroups][0][filters][1][field]=parent_id" +
        "&searchCriteria[filterGroups][0][filters][1][value]=" + id;
    //console.log(Url);
    xhttp.open("GET",Url,true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.setRequestHeader("Authorization", Token);
    xhttp.send();
}

//Funzione recupero prodotti (per Categoria)
function ProdCate(id){
    var IDCategoriaSplit = id.split("-");
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200){
        var data = this.responseText;
        var jsonResponse = JSON.parse(data);
        var i=0;
        var TabContainProd = document.getElementById(id);
            if (TabContainProd.innerText === ""){
                for(i=0;i < jsonResponse.length;i++){
                    CambioTestoADV(jsonResponse[i].sku,id);
                    //console.log("Invio SKU:" + jsonResponse[0].sku);
                    //console.log("Lenght:" + jsonResponse.length);
                }
            }
        }
    };
    var Url= "https://food.localecom.it/Cremasco/index.php/rest/V1/categories/" + IDCategoriaSplit[1] + "/products";
    //console.log(Url);
    xhttp.open("GET",Url,true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.setRequestHeader("Authorization", Token);
    xhttp.send();
}

//Funziona avanzate recupero prodotti per categoria
function CambioTestoADV(sku,idPills){
    var xhttp = new XMLHttpRequest();
    //console.log("CAMBIOTESTOADV: " + sku + "," + idPills);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            //console.log("On readystatechange: " + sku);
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            var descProdTab = document.createElement('div');
            descProdTab.setAttribute("class", "card");
            //descProdTab.setAttribute("id", idPills);
            //descProdTab.setAttribute("class","tab-pane fade show");
            //descProdTab.setAttribute("role","tabpanel");
            //descProdTab.setAttribute("aria-labelledby",idPills+"-tab");
            descProdTab.setAttribute("style", "margin-bottom:10px;");
            if (!jsonResponse.extension_attributes.bundle_product_options){
                descProdTab.innerHTML = "" +
                    "  <img class=\"card-img-top\" src=\"https://food.localecom.it/Cremasco/pub/media/catalog/product/"+jsonResponse.media_gallery_entries[0].file+"\" alt=\"Card image cap\">\n" +
                    "  <div class=\"card-body\">\n" +
                    "    <h5 class=\"card-title\">"+jsonResponse.name+" - "+jsonResponse.price+"&euro;</h5>\n" +
                    "    <p class=\"card-text\">"+jsonResponse.custom_attributes[1].value+"</p>\n" +
                    "<form name=\"addToCart\" method=\"post\">" +
                    "<input type=\"hidden\" value=\""+jsonResponse.sku+"\" name=\"sku\" id=\"sku\">"+
                    "    <button type=\"button\" class=\"btn btn-localecom\" onclick=\"AddToCart('"+jsonResponse.sku+"')\">Aggiungi al carrello</button>\n" +
                    "  </div>";
            }else{
                descProdTab.innerHTML = "" +
                    "  <img class=\"card-img-top\" src=\"https://food.localecom.it/Cremasco/pub/media/catalog/product/"+jsonResponse.media_gallery_entries[0].file+"\"alt=\"Card image cap\">\n" +
                    "  <div class=\"card-body\">\n" +
                    "    <h5 class=\"card-title\">"+jsonResponse.name+" - "+jsonResponse.price+"&euro;</h5>\n" +
                    "    <p class=\"card-text\">"+jsonResponse.custom_attributes[1].value+"</p>\n" +
                    "<form name=\"addToCart\" method=\"post\">" +
                    "<input type=\"hidden\" value=\""+jsonResponse.sku+"\" name=\"sku\" id=\"sku\">"+
                    "    <button type=\"button\" class=\"btn btn-localecom\" data-toggle=\"modal\" data-target=\"#exampleModal\" onclick=\"OpenModalBundle('"+jsonResponse.sku+"',"+jsonResponse.extension_attributes.bundle_product_options.length+")\">Componi panino</button>\n" +
                    "  </div>" +
                    "<!-- Modale per prodotto bundle (componi panino) -->\n" +
                    "<div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n" +
                    "  <div class=\"modal-dialog\" role=\"document\">\n" +
                    "    <div class=\"modal-content\">\n" +
                    "      <div class=\"modal-header\">\n" +
                    "        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Componi il tuo panino</h5></h5>\n" +
                    "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
                    "          <span aria-hidden=\"true\">&times;</span>\n" +
                    "        </button>\n" +
                    "      </div>\n" +
                    "      <div class=\"modal-body\">\n" +
                    "        <!--form per componenti panino-->\n" +
                    "<form name=\"bundleProduct\" id=\"bundleProduct\" method=\"post\">" +
                    "<fieldset class=\"form-group\" id=\"insertFieldset\">" +
                    //inserire qui fieldsetbundle
                    "</fieldset>" +
                    "</form>" +
                    "      </div>\n" +
                    "      <div class=\"modal-footer\">\n" +
                    "        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Annulla</button>\n" +
                    "        <button type=\"button\" class=\"btn btn-localecom\" onclick=\"AddToCartBundle()\">Aggiungi al carrello </button>\n" +
                    "      </div>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "</div>";
                for (i = 0; i < jsonResponse.extension_attributes.bundle_product_options.lenght; i++) {
                    OpenModalBundle(jsonResponse.sku,i);
                }
            }
            var TabContainProd = document.getElementById(idPills);
            TabContainProd.appendChild(descProdTab);
            //console.log("https://food.localecom.it/Cremasco/pub/media/catalog/product/"+jsonResponse.media_gallery_entries[0].file);
        }
    };
    var Url= "https://food.localecom.it/Cremasco/index.php/rest/V1/products/"+ sku;
    xhttp.open("GET",Url,true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.setRequestHeader("Authorization", Token);
    xhttp.send();
}

function OpenModalBundle(sku,i){
    var InsertRadioForm = document.getElementById("insertFieldset");
    if (InsertRadioForm.innerHTML === ""){
        var xhttp = new XMLHttpRequest();
        //console.log("kLancio della funzione ");
        //console.log("CAMBIOTESTOADV: " + sku + "," + idPills);
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
                var data = this.responseText;
                var jsonResponse = JSON.parse(data);
                //crea blocchi con titolo del bundle
                for(r = 0; r < i; r++){
                    var inputFieldset = "";
                    //console.log("dopo primo for");
                    var fieldsetBundle = document.createElement('div');
                    fieldsetBundle.innerHTML = " <div class=\"row\">\n" +
                        "    <legend class=\"col-form-label col-sm-2 pt-0\">Scegli " + jsonResponse.extension_attributes.bundle_product_options[r].title + "</legend>\n" +
                        "    <div class=\"col-sm-10\" id=\"insertRadio_"+r+"\">\n" +
                        //inserire qui inputFieldset
                        "    </div>\n" +
                        "  </div>\n";
                    InsertRadioForm.appendChild(fieldsetBundle);
                    for (t = 0; t < jsonResponse.extension_attributes.bundle_product_options[r].product_links.length; t++) {
                        //console.log("dopo secondo for");
                        //crea i radio buttons per selezionare il tipo di scelta
                        //inputFieldset.innerHTML =
                        inputFieldset += "" +
                            "<div class=\"form-check\">\n" +
                            "<input class=\"form-check-input\" type=\"radio\" name=\"" + jsonResponse.extension_attributes.bundle_product_options[r].title+"\" id=\"" + jsonResponse.extension_attributes.bundle_product_options[r].product_links[t].id + "\" value=\"" + jsonResponse.extension_attributes.bundle_product_options[r].product_links[t].id + "_"+jsonResponse.extension_attributes.bundle_product_options[r].option_id+"\">\n" +
                            "<label class=\"form-check-label\" for=\"" + jsonResponse.extension_attributes.bundle_product_options[r].product_links[t].id + "\">\n" +
                            "" + jsonResponse.extension_attributes.bundle_product_options[r].product_links[t].sku + "\n" +
                            "</label>\n" +
                            "</div>\n";
                        //var insertFieldForm = document.getElementById("insertRadio_"+r);
                        //insertFieldForm.appendChild(inputFieldset);
                        document.getElementById("insertRadio_"+r).innerHTML = inputFieldset;
                        //console.log("Blocco input:"+inputFieldset);
                    }
                    //console.log("Blocco conteiner:"+fieldsetBundle);
                }

            }
        };
        var Url= "https://food.localecom.it/Cremasco/index.php/rest/V1/products/"+ sku;
        xhttp.open("GET",Url,true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        //Header inserire il token d'accesso dell'integrazione di magento
        xhttp.setRequestHeader("Authorization", Token);
        xhttp.send();
    }else{
        console.log("modal already full");
    }
}

function AddToCartBundle(){

    var dasplittare_pane = document.getElementsByName("Pane");
    var dasplittare_main = document.getElementsByName("Main");
    var dasplittare_aggiunte = document.getElementsByName("Aggiunte");
    var bundle_option1 = "";
    var bundle_option2 = "";
    var bundle_option3 = "";
    for (i=0;i < dasplittare_pane.length; i++){
        if (dasplittare_pane[i].checked){
            bundle_option1 = dasplittare_pane[i].value.split("_");
        }
    }
    for (i=0;i < dasplittare_main.length; i++){
        if (dasplittare_main[i].checked){
            bundle_option2 = dasplittare_main[i].value.split("_");
        }
    }
    for (i=0;i < dasplittare_aggiunte.length; i++){
        if (dasplittare_main[i].checked){
            bundle_option3 = dasplittare_aggiunte[i].value.split("_");
        }
    }
    console.log(dasplittare_pane+"||"+dasplittare_main+"||"+dasplittare_aggiunte);
    //var sku_prod = document.addToCart.sku.value;
    var token_cliente = window.localStorage.getItem("token_cliente");
    if (!token_cliente){
        //ricreo il token utente se non è presente o se è scaduto
        TokenCart();
        token_cliente = window.localStorage.getItem("token_cliente");
    }
    var id_cart = window.localStorage.getItem("id_carrello");
    if (!id_cart){
        //ricreo l'id carello in modo da associare sempre l'id corretto all'utente
        CreateIdCart();
        id_cart = window.localStorage.getItem("id_carrello");
    }
    var qty = 1;
    //var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            //Stampa a video del carrello
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            console.log("Abbiamo aggiunto: "+ jsonResponse.name + " al carrello");
            $('#exampleModal').modal('toggle');
            CountCartItems();
            navigator.notification.alert("Abbiamo aggiunto: "+ jsonResponse.name + " al carrello");
        }
    };
    var Url = "https://food.localecom.it/Cremasco/index.php/rest/default/V1/carts/mine/items";
    var bodyCartInfo = {
        "cartItem":
            {
                "sku":"BHCP001",
                "qty": 1,
                "quote_id": id_cart,
                "product_option":{
                    "extensionAttributes": {
                        "bundleOptions":[
                            {
                                "optionId": bundle_option1[1], //id Gruppo
                                "optionQty": 1, //quantità fissa
                                "optionSelections": [bundle_option1[0]] //id del prodotto
                            },
                            {
                                "optionId": bundle_option2[1],
                                "optionQty": 1,
                                "optionSelections": [bundle_option2[0]]
                            },
                            {
                                "optionId": bundle_option3[1],
                                "optionQty": 1,
                                "optionSelections": [bundle_option3[0]]
                            }
                        ]
                    }
                }
            }
    };
    xhttp.open("POST", Url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader("Authorization", token_cliente);
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.send(JSON.stringify(bodyCartInfo));
}

function ValidateAddress(){
    var x = document.forms.convalidaAddress.inputAddress.value;
    if (x !== "") {
        window.location.href ='/result.html';
        window.localStorage.setItem("indirizzo_consegna", x);
        return true;
    }else{
        navigator.notification.alert("Inserisci una via");
        return false;
    }
}
//funzione test accesso
function init() {
    document.addEventListener("deviceready", deviceReady, true);
    //delete init;
}
function checkPreAuth() {
    var form = $("#loginForm");
    if(window.localStorage.username !== undefined && window.localStorage.password !== undefined) {
        $("#username", form).val(window.localStorage.username);
        $("#password", form).val(window.localStorage.password);
        handleLogin();
    }else{
        console.log("No storage data");
    }
}

function handleLogin() {
    var form = $("#loginForm");
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    console.log("click");
    if(u !== '' && p!== '') {
        $.post("https://localecom.it/Cremasco/index.php/rest/V1/integration/customer/token", {
            username: u,
            password: p
        }, function (res) {
            if (res === true) {
                //store
                window.localStorage.username = u;
                window.localStorage.password = p;
                $.mobile.changePage("index.html");
                navigator.notification.alert("Username corretto");
            } else {
                navigator.notification.alert("Your login failed", function () {
                });
            }
            $("#submitButton").removeAttr("disabled");
        }, "json");
    } else {
        //Thanks Igor!
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

function deviceReady() {

    $("#loginForm").on("submit",handleLogin);

}
//Contatore
var input = 0;

function ControlloStoredCredential(){
    var username_stored = window.localStorage.getItem("username");
    var password_stored = window.localStorage.getItem("password");
    if (username_stored !== undefined && password_stored !== undefined){
        console.log("Credenziali presenti");
        return input + 1;
    }else{
        console.log("Credenziali non presenti");
        return input;
    }
}
function TokenUtente () {
    var username = document.loginForm.username.value;
    var password = document.loginForm.password.value;
    var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                var data = this.responseText;
                var jsonResponse = JSON.parse(data);
                if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
                    window.localStorage.setItem("username", username);
                    window.localStorage.setItem("password", password);
                    window.localStorage.setItem("token_cliente", "Bearer " + jsonResponse);
                    UserInfo();
                    window.location.reload();
                }if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 400 ) {
                    console.log("error400");
                    navigator.notification.alert(jsonResponse.message);
                }if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 401 ) {
                    console.log("error401");
                    navigator.notification.alert(jsonResponse.message);
                }
            };
                var Url = "https://food.localecom.it/Cremasco/index.php/rest/V1/integration/customer/token";
                var credenziali = {"username": username, "password": password};
                xhttp.open("POST", Url, true);
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
                //Header inserire il token d'accesso dell'integrazione di magento
                xhttp.send(JSON.stringify(credenziali));
    }

//funzione ridondante utilizzare solo TokenUtente()
function TokenCart(){
    var username = window.localStorage.getItem("username");
    var password = window.localStorage.getItem("password");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        var data = this.responseText;
        var jsonResponse = JSON.parse(data);
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            window.localStorage.setItem("token_cliente", "Bearer " + jsonResponse);
        }if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 401){
            //Stampa a video del carrello
            navigator.notification.alert(jsonResponse.message);
        }
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 404){
            //Stampa a video del carrello
            navigator.notification.alert(jsonResponse.message);
        }
    };
    var Url = "https://food.localecom.it/Cremasco/index.php/rest/V1/integration/customer/token";
    var credenziali = {"username": username, "password": password};
    xhttp.open("POST", Url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.send(JSON.stringify(credenziali));
}

function UserInfo(){
    var token_cliente = window.localStorage.getItem("token_cliente");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        var data = this.responseText;
        var jsonResponse = JSON.parse(data);
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            var indirizzo_viaCiv = jsonResponse.addresses.street.split(", ");
            var nome = jsonResponse.firstname;
            var cognome = jsonResponse.lastname;
            var indirizzo = indirizzo_viaCiv[0];
            var civico = indirizzo_viaCiv[1];
            var citta = jsonResponse.city;
            var regione = jsonResponse.addresses.region;
            var cap = jsonResponse.addresses.postcode;
            var nazione = jsonResponse.addresses.country_id;
            var telefono = jsonResponse.addresses.telephone;
            var customer_id = jsonResponse.id;
            window.localStorage.setItem("username", username);
            window.localStorage.setItem("password", password);
            window.localStorage.setItem("nome", nome);
            window.localStorage.setItem("cognome", cognome);
            window.localStorage.setItem("indirizzo", indirizzo);
            window.localStorage.setItem("civico", civico);
            window.localStorage.setItem("citta", citta);
            window.localStorage.setItem("regione", regione);
            window.localStorage.setItem("cap", cap);
            window.localStorage.setItem("nazione", nazione);
            window.localStorage.setItem("customer_id", customer_id);
        }
    };
    var Url = "https://food.localecom.it/Cremasco/index.php/rest/V1/customers/me";
    xhttp.open("GET", Url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader('Authorization', token_cliente );
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.send();
}

function CreateIdCart () {
    TokenCart();
    var token_cliente = window.localStorage.getItem("token_cliente");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            //Stampa a video del carrello
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            window.localStorage.setItem("id_carrello", jsonResponse);
        }
    };
        var Url = "https://food.localecom.it/Cremasco/index.php/rest/default/V1/carts/mine";
        xhttp.open("POST", Url, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhttp.setRequestHeader("Authorization", token_cliente);
        //Header inserire il token d'accesso dell'integrazione di magento
        xhttp.send();
}

function CreateUtente(){
    var username = document.registrazioneForm.username.value;
    var password = document.registrazioneForm.password.value;
    var nome = document.registrazioneForm.name.value;
    var cognome = document.registrazioneForm.cognome.value;
    var indirizzo = document.registrazioneForm.route.value; //solo nome via
    var civico = document.registrazioneForm.street_number.value; //solo civico
    var citta = document.registrazioneForm.locality.value; //Nome citta
    var regione = document.registrazioneForm.administrative_area_level_1.value; //Regione
    var cap = document.registrazioneForm.postal_code.value; //Cap
    var nazione = document.registrazioneForm.country.value; //Nazione
    var address_array = indirizzo.split(", ");
    var telefono = document.registrazioneForm.telefono.value;
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            //se la richiesta va a buon fine salvare i dati dell'utente
            window.localStorage.setItem("username", username);
            window.localStorage.setItem("password", password);
            window.localStorage.setItem("nome", nome);
            window.localStorage.setItem("cognome", cognome);
            window.localStorage.setItem("indirizzo", indirizzo);
            window.localStorage.setItem("civico", civico);
            window.localStorage.setItem("citta", citta);
            window.localStorage.setItem("regione", regione);
            window.localStorage.setItem("cap", cap);
            window.localStorage.setItem("nazione", nazione);
            navigator.notification.alert("Utente creato con successo conferma la tua mail");
            window.location="account.html";
        }else{
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            var message = jsonResponse.message;
            var correct_message = message.replace("%1", jsonResponse.parameters);
            navigator.notification.alert(correct_message);
        }
    };
    var Url = "https://food.localecom.it/Cremasco/index.php/rest/default/V1/customers";
    var userInfo = {
        "customer": {
            "email": username,
            "firstname": nome,
            "lastname": cognome,
            "addresses": [{
                "defaultShipping": true,
                "defaultBilling": true,
                "firstname": nome,
                "lastname": cognome,
                "postcode": cap,
                "street": [indirizzo + ", " + civico],
                "city": citta,
                "telephone": telefono,
                "countryId": "IT"
            }]
        },
        "password": password
    };
    xhttp.open("POST", Url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.send(JSON.stringify(userInfo));
}

function disconnettiUtente() {
    //con il logout rimuovo i token associati all'utente precendente
    //window.localStorage.removeItem("username");
    //window.localStorage.removeItem("password");
    //window.localStorage.removeItem("nome");
    //window.localStorage.removeItem("cognome");
    //window.localStorage.removeItem("indirizzo");
    //window.localStorage.removeItem("civico");
    //window.localStorage.removeItem("citta");
    //window.localStorage.removeItem("regione");
    //window.localStorage.removeItem("cap");
    //window.localStorage.removeItem("nazione");
    window.localStorage.clear();
    window.location = "account.html";
}

function AddToCart(sku) {

    //var sku_prod = document.addToCart.sku.value;
    var token_cliente = window.localStorage.getItem("token_cliente");
    if (!token_cliente){
        //ricreo il token utente se non è presente o se è scaduto
        TokenCart();
    }
    var id_cart = window.localStorage.getItem("id_carrello");
    if (!id_cart){
        //ricreo l'id carello in modo da associare sempre l'id corretto all'utente
        CreateIdCart();
    }
    var qty = 1;
    //var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            //Stampa a video del carrello
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            console.log("Abbiamo aggiunto: "+ jsonResponse.name + " al carrello");
            navigator.notification.alert("Abbiamo aggiunto: "+ jsonResponse.name + " al carrello");
            CountCartItems();
        }
    };
    id_cart = window.localStorage.getItem("id_carrello");
    token_cliente = window.localStorage.getItem("token_cliente");
    var Url = "https://food.localecom.it/Cremasco/index.php/rest/default/V1/carts/mine/items";
    var bodyCartInfo = {
        "cartItem": {
            "sku": sku,
            "qty": qty,
            "quote_id": id_cart
        }
    };
    xhttp.open("POST", Url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader("Authorization", token_cliente);
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.send(JSON.stringify(bodyCartInfo));
}

function ListCartItems(){
    TokenCart();
    var token_cliente = window.localStorage.getItem("token_cliente");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            //Stampa a video del carrello
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            var list_itemsCart = "";
            var i = 0;
            for (i=0;i < jsonResponse.length; i++){
                window.localStorage.setItem("NumeroCarrello",jsonResponse.length);
                var subtot = jsonResponse[i].price * jsonResponse[i].qty;
                if (!jsonResponse[i].product_option){
                    list_itemsCart += "" +
                        "<li class=\"list-group-item\" style=\"padding:.75rem .25rem\">\n" +
                        " "+jsonResponse[i].name+" - "+ subtot +"&euro;\n" +
                        "  <span id=\"quantitaProd\" style=\"float: right;\">\n" +
                        "    <button type=\"button\" onclick=\"AumentaProd("+jsonResponse[i].item_id+","+(jsonResponse[i].qty - 1)+","+jsonResponse[i].item_id+")\" class=\"btn\" style=\"font-size: 1rem;padding: 5px;margin-right: 3px;\">−</button>\n" +
                        "      <input type=\"text\" value=\""+jsonResponse[i].qty+"\" style=\"width: 34px;\" id=\""+jsonResponse[i].item_id+"\">\n" +
                        "     <button type=\"button\" onclick=\"AumentaProd("+jsonResponse[i].item_id+","+(jsonResponse[i].qty + 1)+","+jsonResponse[i].item_id+")\" class=\"btn\" style=\"font-size: 1rem;padding: 5px;margin-left: 3px;\">+</button>\n" +
                        "  </span>" +
                        " <button style=\"float: left;\" type=\"button\" class=\"close\" onclick=\"RemoveFromCart("+jsonResponse[i].item_id+")\">\n" +
                        "   <span aria-hidden=\"true\">×</span>\n" +
                        " </button>" +
                        "</li>";
                }else{
                    var ingredientiPanino = jsonResponse[i].sku.split("-");
                    list_itemsCart += "" +
                        "<li class=\"list-group-item\" style=\"padding:.75rem .25rem\">\n" +
                        " "+jsonResponse[i].name+" - "+ subtot +"&euro;\n" +
                        " <ul>" +
                        "  <li>"+ingredientiPanino[1]+"</li>" +
                        "  <li>"+ingredientiPanino[2]+"</li>" +
                        "  <li>"+ingredientiPanino[3]+"</li>" +
                        "</ul>" +
                        "  <span id=\"quantitaProd\" style=\"float: right;\">\n" +
                        "    <button type=\"button\" onclick=\"AumentaProd("+jsonResponse[i].item_id+","+(jsonResponse[i].qty - 1)+","+jsonResponse[i].item_id+")\" class=\"btn\" style=\"font-size: 1rem;padding: 5px;margin-right: 3px;\">−</button>\n" +
                        "      <input type=\"text\" value=\""+jsonResponse[i].qty+"\" style=\"width: 34px;\" id=\""+jsonResponse[i].item_id+"\">\n" +
                        "     <button type=\"button\" onclick=\"AumentaProd("+jsonResponse[i].item_id+","+(jsonResponse[i].qty + 1)+","+jsonResponse[i].item_id+")\" class=\"btn\" style=\"font-size: 1rem;padding: 5px;margin-left: 3px;\">+</button>\n" +
                        "  </span>" +
                        " <button style=\"float: left;\" type=\"button\" class=\"close\" onclick=\"RemoveFromCart("+jsonResponse[i].item_id+")\">\n" +
                        "   <span aria-hidden=\"true\">×</span>\n" +
                        " </button>" +
                        "</li>";
                }
                //console.log(list_itemsCart);
                document.getElementById("section-items-cart").innerHTML= list_itemsCart;
            }
        }
    };
    var Url = "https://food.localecom.it/Cremasco/index.php/rest/default/V1/carts/mine/items";
    xhttp.open("GET", Url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader("Authorization", token_cliente);
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.send();
}

function CountCartItems(){
    TokenCart();
    var token_cliente = window.localStorage.getItem("token_cliente");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            //Stampa a video del carrello
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            if (!jsonResponse.qty){
                document.getElementById("numero-carrello").innerText = "0";
            }else{
                var qty = 0;
                for (i=0; i< jsonResponse.length; i++){
                    qty = jsonResponse[i].qty + qty;
                    console.log(qty);
                    var numeroCarrello = document.getElementById("numero-carrello");
                    numeroCarrello.innerText = qty;
                }
            }
        }
    };
    var Url = "https://food.localecom.it/Cremasco/index.php/rest/default/V1/carts/mine/items";
    xhttp.open("GET", Url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader("Authorization", token_cliente);
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.send();
}

function GetShippingMethod(){
    //token client sempre aggiornato e corretto
    var token_cliente = window.localStorage.getItem("token_cliente");
    if(!token_cliente){
        TokenCart();
    }
    //console.log("T: " + token_cliente + " C: " + id_cart + " A: " + id_address);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            var list_ShippingMethods = "";
            if (jsonResponse.length === 0){
                list_ShippingMethods += "<li class=\"list-group-item\">" +
                    "Nessuna spedizione disponibile. La spesa minima è di 15&euro;" +
                    "</li>";
                //console.log(list_ShippingMethods);
                document.getElementById("section-shipping-methods").innerHTML= list_ShippingMethods;
            }else{
                //Stampa a video del carrello
                var i = 0;
                for (i=0;i < jsonResponse.length; i++){
                    list_ShippingMethods += "<li class=\"list-group-item\">" +
                        ""+jsonResponse[i].carrier_title+" - "+ jsonResponse[i].method_title +" "+jsonResponse[i].amount +"&euro; " +
                        "<input " +
                        "type=\"radio\" " +
                        "name=\"shipping\" " +
                        "value=\""+jsonResponse[i].method_code+"-"+jsonResponse[i].carrier_code+"\" " +
                        "onclick=\"StoreShipping('"+jsonResponse[i].method_code+"-"+jsonResponse[i].carrier_code+"-"+jsonResponse[i].method_title+"');\">" +
                        "</li>";
                    //console.log(list_ShippingMethods);
                    document.getElementById("section-shipping-methods").innerHTML= list_ShippingMethods;
                }
            }
        }
    };

    var nome = window.localStorage.getItem("nome");
    var cognome = window.localStorage.getItem("cognome");
    var indirizzo = window.localStorage.getItem("indirizzo");
    var civico = window.localStorage.getItem("civico");
    var citta = window.localStorage.getItem("citta");
    var cap = window.localStorage.getItem("cap");

    var Url = "https://food.localecom.it/Cremasco/index.php/rest/default/V1/carts/mine/estimate-shipping-methods";
    var body_request = {  "address": {
            "region": "Cremona",
            "region_id": 0,
            "region_code": "CR",
            "country_id": "IT",
            "street":[ indirizzo + ", "+ civico],
            "postcode": cap,
            "city": citta,
            "firstname": nome,
            "lastname": cognome,
            "customer_id": window.localStorage.getItem("customer_id"),
            "email": window.localStorage.getItem("username"),
            "telephone": window.localStorage.getItem("telefono"),
            "same_as_billing": 1
        }
    };
    xhttp.open("POST", Url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader("Authorization", token_cliente);
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.send(JSON.stringify(body_request));
}

function StoreShipping(daSplittare){
    window.localStorage.removeItem("carrier_code");
    window.localStorage.removeItem("method_code");
    var shipping_stored = daSplittare.split("-");
    console.log(shipping_stored[0] + " spazio "+ shipping_stored[1]);
    window.localStorage.setItem("carrier_code",shipping_stored[1]);
    window.localStorage.setItem("method_code",shipping_stored[0]);
    window.localStorage.setItem("orario_consegna",shipping_stored[2]);
    var carrier_code = window.localStorage.getItem("carrier_code");
    var method_code = window.localStorage.getItem("method_code");
    console.log(carrier_code + " spazio " + method_code);
}

function GetPaymentsMethod(){
    //token client sempre aggiornato e corretto
    TokenCart();
    var token_cliente = window.localStorage.getItem("token_cliente");
    var carrier_code = window.localStorage.getItem("carrier_code");
    var method_code = window.localStorage.getItem("method_code");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            //Stampa a video del carrello
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            var list_PaymentMethods = "";
            var i = 0;
            window.localStorage.setItem("totale",jsonResponse.totals.grand_total * 100);
            document.getElementById("total-sales").innerHTML= "Totale: "+jsonResponse.totals.grand_total+" &euro; - Consegna Ore: "+ window.localStorage.getItem("orario_consegna");
            for (i=0;i < jsonResponse.payment_methods.length; i++){
                list_PaymentMethods += "<li class=\"list-group-item\">"+jsonResponse.payment_methods[i].title+" <input type=\"radio\" name=\"payments\" value=\""+jsonResponse.payment_methods[i].code+"\"></li>";
                //console.log(list_PaymentMethods);
                document.getElementById("section-payments-methods").innerHTML= list_PaymentMethods;
            }
        }
    };
    var nome = window.localStorage.getItem("nome");
    var cognome = window.localStorage.getItem("cognome");
    var indirizzo = window.localStorage.getItem("indirizzo");
    var civico = window.localStorage.getItem("civico");
    var citta = window.localStorage.getItem("citta");
    var cap = window.localStorage.getItem("cap");

    var Url = "https://food.localecom.it/Cremasco/index.php/rest/default/V1/carts/mine/shipping-information";
    var body_request = {  "addressInformation": {
            "shipping_address": {
                "region": "Cremona",
                "region_id": 0,
                "region_code": "CR",
                "country_id": "IT",
                "street":[ indirizzo + ", " + civico],
                "postcode": cap,
                "city": citta,
                "firstname": nome,
                "lastname": cognome,
                "email": window.localStorage.getItem("username"),
                "telephone": window.localStorage.getItem("telefono")
            },
            "billing_address": {
                "region": "Cremona",
                "region_id": 0,
                "region_code": "CR",
                "country_id": "IT",
                "street":[ indirizzo + ", " + civico],
                "postcode": cap,
                "city":  citta,
                "firstname": nome,
                "lastname":  cognome,
                "email": window.localStorage.getItem("username"),
                "telephone": window.localStorage.getItem("telefono")
            },
            "shipping_carrier_code": carrier_code,
            "shipping_method_code": method_code
        }
    };
    xhttp.open("POST", Url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader("Authorization", token_cliente);
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.send(JSON.stringify(body_request));
}

function HandleAccountPage(){
    var indirizzo = window.localStorage.getItem("indirizzo");
    var civico = window.localStorage.getItem("civico");
    var citta = window.localStorage.getItem("citta");
    var cap = window.localStorage.getItem("cap");

    //var checkStoreCrede = ControlloStoredCredential();
    var username_stored = window.localStorage.getItem("username");
    var password_stored = window.localStorage.getItem("password");
    if (username_stored !== null && password_stored !== null){
        TokenCart();
        CreateIdCart();
        var token_cliente = window.localStorage.getItem("token_cliente");
        //var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
                //Stampa a video del carrello
                var i = 0;
                //var userinfo = "";
                //for (i=0;i < jsonResponse.length; i++){
                var address_id = jsonResponse.addresses[0].id;
                var customer_id = jsonResponse.addresses[0].customer_id;
                var nome = jsonResponse.firstname;
                var cognome = jsonResponse.lastname;
                var appoggio = jsonResponse.addresses[0].street;
                var addressId = window.localStorage.getItem("address_id");
                window.localStorage.setItem("address_id", address_id);
                window.localStorage.setItem("customer_id", customer_id);
                window.localStorage.setItem("nome", nome);
                window.localStorage.setItem("cognome", cognome);
                window.localStorage.setItem("appoggio_split", appoggio);
                var address_viaciv = window.localStorage.getItem("appoggio_split").split(", ");
                window.localStorage.setItem("indirizzo", address_viaciv[0]);
                window.localStorage.setItem("civico", address_viaciv[1]);
                window.localStorage.setItem("citta", jsonResponse.addresses[0].city);
                window.localStorage.setItem("indirizzo_consegna", jsonResponse.addresses[0].street+","+jsonResponse.addresses[0].city);
                window.localStorage.setItem("telefono", jsonResponse.addresses[0].telephone);
                window.localStorage.setItem("country_id", jsonResponse.addresses[0].country_id);
                window.localStorage.setItem("region_id", jsonResponse.addresses[0].region_id);
                window.localStorage.setItem("cap", jsonResponse.addresses[0].postcode);
                window.localStorage.setItem("email", jsonResponse.email);
                var customerId = window.localStorage.getItem("customer_id");
                var Nome = window.localStorage.getItem("nome");
                var Cognome = window.localStorage.getItem("cognome");
                var indirizzo = window.localStorage.getItem("indirizzo");
                var civico = window.localStorage.getItem("civico");
                var citta = window.localStorage.getItem("citta");
                var consegna = window.localStorage.getItem("indirizzo_consegna");
                var telefono = window.localStorage.getItem("telefono");
                var country_id = window.localStorage.getItem("country_id");
                var region_id = window.localStorage.getItem("region_id");
                var cap = window.localStorage.getItem("cap");
                var name_stored = window.localStorage.getItem("nome");
                var cognome_stored = window.localStorage.getItem("cognome");
                var mail = window.localStorage.getItem("email");
                document.getElementById("sezione-utente").innerHTML = "" +
                    "<div class=\"jumbotron jumbotron-fluid\">\n" +
                    "        <div class=\"container\">\n" +
                    "            <h3 class=\"display-5\">Benvenuto "+name_stored+" "+cognome_stored+"</h3>\n" +
                    "            <p class=\"lead\">Gestisci le tue impostazioni e i tuoi ordini</p>\n" +
                    "        </div>\n" +
                    "    </div>" +
                    "<div>" +
                    "<ul class=\"list-group\" id=\"user-info\">" +
                    "<li class=\"list-group-item\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modalAccountCliente\">Informazioni Account</a></li>\n" +
                    "<li class=\"list-group-item\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#passwordCliente\">Modifica Password</a></li>\n" +
                    "<li class=\"list-group-item\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#editCustomerInfo\">Indirizzi</a></li>\n" +
                    "<li class=\"list-group-item\"><a href=\"ordini.html\">Gestisci Ordini</a></li>\n" +
                    "<li class=\"list-group-item\"><a href=\"#\" onclick=\"disconnettiUtente()\">Esci</a></li>" +
                    "</ul>" +
                    "</div>" +
                    "<!-- Modale Password -->\n" +
                    "<div class=\"modal fade\" id=\"passwordCliente\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n" +
                    "  <div class=\"modal-dialog\" role=\"document\">\n" +
                    "    <div class=\"modal-content\">\n" +
                    "      <div class=\"modal-header\">\n" +
                    "        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Modifica Password</h5><br>\n" +
                    "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
                    "          <span aria-hidden=\"true\">&times;</span>\n" +
                    "        </button>\n" +
                    "      </div>\n" +
                    "      <div class=\"modal-body\">" +
                    "<form id=\"passwordCliente\" name=\"passwordCliente\">" +
                    "       <div class=\"form-group\">\n" +
                    "        <label for=\"current\">Vecchia Password</label>\n" +
                    "        <input type=\"password\" class=\"form-control\" id=\"current\">\n" +
                    "       </div>\n" +
                    "       <div class=\"form-group\">\n" +
                    "        <label for=\"new\">Nuova Password</label>\n" +
                    "        <input type=\"password\" class=\"form-control\" id=\"new\">\n" +
                    "       </div>\n" +
                    "</form>" +
                    "      </div>\n" +
                    "      <div class=\"modal-footer\">\n" +
                    "        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Annulla</button>\n" +
                    "        <button type=\"button\" class=\"btn btn-primary\" onclick=\"EditPassword()\">Salva modifiche</button>\n" +
                    "      </div>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "</div>"+
                    "<!-- Modale Account -->\n" +
                    "<div class=\"modal fade\" id=\"modalAccountCliente\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n" +
                    "  <div class=\"modal-dialog\" role=\"document\">\n" +
                    "    <div class=\"modal-content\">\n" +
                    "      <div class=\"modal-header\">\n" +
                    "        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Informazioni Cliente</h5><br>\n" +
                    "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
                    "          <span aria-hidden=\"true\">&times;</span>\n" +
                    "        </button>\n" +
                    "      </div>\n" +
                    "      <div class=\"modal-body\">" +
                    "<form id=\"infocCliente\" name=\"infocCliente\">" +
                    "       <div class=\"form-group\">\n" +
                    "        <label for=\"nome\">Nome</label>\n" +
                    "        <input type=\"text\" class=\"form-control\" id=\"nome\" value=\""+name_stored+" "+cognome_stored+"\">\n" +
                    "       </div>\n" +
                    "       <div class=\"form-group\">\n" +
                    "        <label for=\"email\">Nome</label>\n" +
                    "        <input type=\"text\" class=\"form-control\" id=\"email\" value=\""+jsonResponse.email+"\">\n" +
                    "       </div>\n" +
                    "       <div class=\"form-group\">\n" +
                    "        <label for=\"telefono\">Nome</label>\n" +
                    "        <input type=\"text\" class=\"form-control\" id=\"telefono\" value=\""+telefono+"\">\n" +
                    "       </div>\n" +
                    "</form>" +
                    "      </div>\n" +
                    "      <div class=\"modal-footer\">\n" +
                    "        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Annulla</button>\n" +
                    "        <button type=\"button\" class=\"btn btn-primary\" onclick=\"EditInfoCustomer()\">Salva modifiche</button>\n" +
                    "      </div>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "</div>"+
                    "<!-- Modale Indirizzi -->\n" +
                    "<div class=\"modal fade\" id=\"editCustomerInfo\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n" +
                    "  <div class=\"modal-dialog\" role=\"document\">\n" +
                    "    <div class=\"modal-content\">\n" +
                    "      <div class=\"modal-header\">\n" +
                    "        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Informazioni Cliente</h5><br>\n" +
                    "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
                    "          <span aria-hidden=\"true\">&times;</span>\n" +
                    "        </button>\n" +
                    "      </div>\n" +
                    "      <div class=\"modal-body\">\n" +
                    "<form id=\"modificaInfoCliente\" name=\"modificaInfoCliente\">" +
                    "<div class=\"form-group\">\n" +
                "        <label for=\"cognome\">Inserisci indirizzo per autocompilazione</label>\n" +
                "        <input type=\"text\" class=\"form-control\" id=\"autocomplete\" name=\"autocomplete\" placeholder=\"Via,città o Cap\" onFocus=\"geolocate()\">\n" +
                "    </div>\n" +
                "<div id=\"address\" class=\"form-group\">\n"+
                "      <label for=\"route\">Indirizzo</label>\n"+
                "       <input id=\"route\" disabled=\"true\" class=\"form-control\"></input>\n"+
                "      <label for=\"street_number\">Civico</label>\n"+
                "       <input id=\"street_number\" disabled=\"true\" class=\"form-control\"></input>\n"+
                "      <label for=\"locality\">Città</label>\n"+
                "        <input id=\"locality\"\n disabled=\"true\" class=\"form-control\"></input>" +
                "     <label for=\"administrative_area_level_1\">Regione</label>\n"+
                "        <input id=\"administrative_area_level_1\" disabled=\"true\" class=\"form-control\"></input>" +
                "     <label for=\"postal_code\">Cap</label>\n"+
                "        <input id=\"postal_code\" disabled=\"true\" class=\"form-control\"></input>\n"+
                "      <label for=\"country\">Nazione</label>\n"+
                "        <input id=\"country\" disabled=\"true\" class=\"form-control\"></input>" +
                "    </div>" +
                    "</form>" +
                    "      </div>\n" +
                    "      <div class=\"modal-footer\">\n" +
                    "        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n" +
                    "        <button type=\"button\" class=\"btn btn-primary\">Save changes</button>\n" +
                    "      </div>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "</div>";
            }
        };
        var Url = "https://food.localecom.it/Cremasco/index.php/rest/V1/customers/me";
        xhttp.open("GET", Url, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhttp.setRequestHeader("Authorization", token_cliente);
        //Header inserire il token d'accesso dell'integrazione di magento
        xhttp.send();
        //navigator.notification.alert("Accesso tramite dati Form");
    }else{
        document.getElementById("sezione-utente").innerHTML = "<div class=\"jumbotron jumbotron-fluid\">\n" +
            "            <div class=\"container\">\n" +
            "                <h3 class=\"display-5\">Account Personale</h3>\n" +
            "                <p class=\"lead\">Accedi per visualizzare i tuoi ordini e gestire il tuo profilo</p>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "      <form id=\"loginForm\" name=\"loginForm\" method=\"post\" >\n" +
            "           <div class=\"form-group\">\n" +
            "                   <label for=\"username\">Email</label>\n" +
            "                  <input type=\"email\" class=\"form-control\" id=\"username\" name=\"username\" aria-describedby=\"emailHelp\" placeholder=\"Inserisci Email\">\n" +
            "              </div>\n" +
            "          <div class=\"form-group\">\n" +
            "                  <label for=\"password\">Password</label>\n" +
            "                  <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" placeholder=\"Password\">\n" +
            "               </div>\n" +
            "            <div class=\"form-group form-check\">\n" +
            "                <input type=\"checkbox\" class=\"form-check-input\" id=\"exampleCheck1\">\n" +
            "                <label class=\"form-check-label\" for=\"exampleCheck1\">Ricordami</label>\n" +
            "            </div>\n" +
            "            <button type=\"button\" class=\"btn btn-localecom\" id=\"submitButton\" name=\"submitButton\" onclick=\"TokenUtente()\">Accedi</button>\n" +
            "            <button type=\"button\" class=\"btn btn-localecom\" id=\"RegistrazioneButton\" name=\"submitButton\" onclick=\"window.location='registrati.html'\">Registrati</button>\n" +
            "            <small id=\"emailHelp\" class=\"form-text text-muted\"><a href=\"contatti.html\">Problemi con l'accesso?</a></small>\n" +
            "            <small id=\"emailHelp2\" class=\"form-text text-muted\"><a href=\"contatti.html\">Password dimenticata?</a></small>\n" +
            "      </form>";
    }
}

function PlaceOrder(){
    var nome = window.localStorage.getItem("nome");
    var cognome = window.localStorage.getItem("cognome");
    var indirizzo = window.localStorage.getItem("indirizzo");
    var civico = window.localStorage.getItem("civico");
    var citta = window.localStorage.getItem("citta");
    var cap = window.localStorage.getItem("cap");
    var pagamento = document.formOrdine.payments.value;
    TokenCart();
    var token_cliente = window.localStorage.getItem("token_cliente");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            //Stampa a video del carrello
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            navigator.notification.alert("Il tuo ordine N:"+jsonResponse+" è stato effettuato! Riceverai una mail con tutti i dettagli. Grazie");
            window.location.href="./ordini.html";
        }
    };
    var Url = "https://food.localecom.it/Cremasco/index.php/rest/default/V1/carts/mine/payment-information";
    xhttp.open("POST", Url, true);
    var body_request = "";
    if (pagamento === "cashondelivery"){
            body_request = {
            "paymentMethod": {
                "method": pagamento,
                "extension_attributes": {
                    "agreement_ids":["1"]
                }
            },
            "billing_address": {
                "email": window.localStorage.getItem("username"),
                "region": "Cremona",
                "region_code": "CR",
                "country_id": "IT",
                "street": [ indirizzo + ", "+civico],
                "postcode": cap,
                "city": citta,
                "telephone": window.localStorage.getItem("telefono"),
                "firstname": window.localStorage.getItem("nome"),
                "lastname": window.localStorage.getItem("cognome")
            }
            };
    }else{
        body_request = {
            "paymentMethod": {
                "method": pagamento,
                "additional_information":{
                    "cc_cid":"000",
                    "cc_type":"VI",
                    "cc_exp_year":"2017",
                    "cc_exp_month":"2",
                    "cc_number":"xxxxxxxxxxxxxxxx"
                },
                "extension_attributes": {
                    "agreement_ids":["1"]
                }
            },
            "billing_address": {
                "email": window.localStorage.getItem("username"),
                "region": "Cremona",
                "region_code": "CR",
                "country_id": "IT",
                "street":[indirizzo + ", "+civico],
                "postcode": cap,
                "city": citta,
                "telephone": window.localStorage.getItem("telefono"),
                "firstname": window.localStorage.getItem("nome"),
                "lastname":  window.localStorage.getItem("cognome")
            }
        };
    }

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader("Authorization", token_cliente);
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.send(JSON.stringify(body_request));
    //navigator.notification.alert("Accesso tramite dati Form");
}

function RetriveOrders() {
    var customer_id = window.localStorage.getItem("customer_id");
    TokenCart();
    var token_cliente = window.localStorage.getItem("token_cliente");
    if (!token_cliente) {
        navigator.notification.alert("Per visualizzare gli ordini devi effettuare l'accesso. Ti reindirizziamo noi.");
        window.location.href="./account.html";
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
                //Stampa a video del carrello
                var listOrders = "";
                var data = this.responseText;
                var jsonResponse = JSON.parse(data);
                for (i = 0; i < jsonResponse.items.length; i++) {
                    if (i === 0) {
                        listOrders += "" +
                            "<div class=\"card\">\n" +
                            "            <div class=\"card-header\" id=\"heading" + jsonResponse.items[i].entity_id + "\">\n" +
                            "                <h5 class=\"mb-0\">\n" +
                            "                    <button " + "class=\"btn btn-link\" type=\"button\" " + "data-toggle=\"collapse\" " + "data-target=\"#" + jsonResponse.items[i].entity_id + "_" + jsonResponse.items[i].status + "\" " + "aria-expanded=\"true\" " + "aria-controls=\"" + jsonResponse.items[i].entity_id + "_" + jsonResponse.items[i].status + "\">\n" +
                            "                        <p>Ordine n°:" + jsonResponse.items[i].entity_id + "" + jsonResponse.items[i].created_at + "(" + jsonResponse.items[i].status + ")</p>" +
                            "                    </button>\n" +
                            "                </h5>\n" +
                            "            </div>\n" +
                            "            <div " + "id=\"" + jsonResponse.items[i].entity_id + "_" + jsonResponse.items[i].status + "\" " + "class=\"collapse show\" " + "aria-labelledby=\"heading" + jsonResponse.items[i].entity_id + "\" " + "data-parent=\"#section-orders\">\n" +
                            "                <div class=\"card-body\">\n" +
                            "                    <!--Sezione dedicata ai metodi di pagamento -->\n" +
                            "                    <h2 id=\"total-sales\"></h2>\n" +
                            "                    <ul class=\"list-group\" id=\"section-payments-methods\">";
                        for (t = 0; t < jsonResponse.items[i].items.length; t++) {
                            listOrders += "<li class=\"list-group-item\">" + jsonResponse.items[i].items[t].name + "</li>";
                        }
                        listOrders += "" +
                            "                    </ul>\n" +
                            "                </div>\n" +
                            "            </div>\n" +
                            "        </div>";
                        //console.log(list_PaymentMethods);
                        document.getElementById("section-orders").innerHTML = listOrders;
                    } else {
                        listOrders += "" +
                            "<div class=\"card\">\n" +
                            "            <div class=\"card-header\" id=\"heading" + jsonResponse.items[i].entity_id + "\">\n" +
                            "                <h5 class=\"mb-0\">\n" +
                            "                    <button " + "class=\"btn btn-link collapsed\" " + "type=\"button\" " + "data-toggle=\"collapse\" " + "data-target=\"#" + jsonResponse.items[i].entity_id + "_" + jsonResponse.items[i].status + "\" " + "aria-expanded=\"false\" " + "aria-controls=\"" + jsonResponse.items[i].entity_id + "_" + jsonResponse.items[i].status + "\">\n" +
                            "                        <p>Ordine n°:" + jsonResponse.items[i].entity_id + "" + jsonResponse.items[i].created_at + "(" + jsonResponse.items[i].status + ")</p>\n" +
                            "                    </button>\n" +
                            "                </h5>\n" +
                            "            </div>\n" +
                            "            <div " + "id=\"" + jsonResponse.items[i].entity_id + "_" + jsonResponse.items[i].status + "\" " + "class=\"collapse\" " + "aria-labelledby=\"heading" + jsonResponse.items[i].entity_id + "\" " + "data-parent=\"#section-orders\">\n" +
                            "                <div class=\"card-body\">\n" +
                            "                    <!--Sezione dedicata ai metodi di pagamento -->\n" +
                            "                    <h2 id=\"total-sales\"></h2>\n" +
                            "                    <ul class=\"list-group\" id=\"section-payments-methods\">";
                        for (t = 0; t < jsonResponse.items[i].items.length; t++) {
                            listOrders += "<li class=\"list-group-item\">" + jsonResponse.items[i].items[t].name + "</li>";
                        }
                        listOrders += "" +
                            "                    </ul>\n" +
                            "                </div>\n" +
                            "            </div>\n" +
                            "        </div>";
                        //console.log(list_PaymentMethods);
                        document.getElementById("section-orders").innerHTML = listOrders;
                    }
                }
            }
        };
        var Url = "https://food.localecom.it/Cremasco/index.php/rest/V1/orders/?searchCriteria[filterGroups][0][filters][1][conditionType]=ep&searchCriteria[filterGroups][0][filters][1][field]=customer_id&searchCriteria[filterGroups][0][filters][1][value]=" + customer_id + "&searchCriteria[sortOrders][0][field]=entity_id&searchCriteria[sortOrders][0][direction]=DESC";
        xhttp.open("GET", Url, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhttp.setRequestHeader("Authorization", Token);
        //Header inserire il token d'accesso dell'integrazione di magento
        xhttp.send();
        //navigator.notification.alert("Accesso tramite dati Form");
    }
}

function RemoveFromCart(item_id){

    //token client sempre aggiornato e corretto
    TokenCart();
    var token_cliente = window.localStorage.getItem("token_cliente");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            //Stampa a video del carrello
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            if(jsonResponse === true){
                navigator.notification.alert("Prodotto rimosso");
                CountCartItems();
                window.location.reload();
            }else{
                navigator.notification.alert("Impossibile rimuovere il prodotto");
            }
        }
    };
    var Url = "https://food.localecom.it/Cremasco/index.php/rest/default/V1/carts/mine/items/"+item_id;
    xhttp.open("DELETE", Url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader("Authorization", token_cliente);
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.send();
}

function AumentaProd(id_prod,qty,id){
    //token client sempre aggiornato e corretto
    document.getElementById(id).value = qty;
    TokenCart();
    var token_cliente = window.localStorage.getItem("token_cliente");
    var id_cart = window.localStorage.getItem("id_carrello");
    if (!id_cart){
        //ricreo l'id carello in modo da associare sempre l'id corretto all'utente
        CreateIdCart();
        id_cart = window.localStorage.getItem("id_carrello");
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            //Stampa a video del carrello
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            //document.getElementById(id).value = jsonResponse.qty;
            CountCartItems();
            window.location.reload();
        }
    };
    var Url = "https://food.localecom.it/Cremasco/index.php/rest/default/V1/carts/mine/items/"+id_prod;
    var body_request = {
        "cartItem": {
            "qty": qty, //nuova quantità
            "quote_id":  id_cart //idcarrello
        }
    };
    xhttp.open("PUT", Url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader("Authorization", token_cliente);
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.send(JSON.stringify(body_request));
}

function HandleNegozioComuni(SearchComune){
    var elencoNegozi = document.getElementById("elenco_negozi");
    var segmentiAttivi = document.getElementById("segmenti_attivi");
    var offerteAttive = document.getElementById("offerte_attive");
    var novitaVar = document.getElementById("novita");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            //Stampa a video del carrello
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            //document.getElementById(id).value = jsonResponse.qty;
            for (i=0; i<jsonResponse.length; i++){
                    //console.log(jsonResponse[i].cap + "||" + SearchComune);
                    for(s=0; s<jsonResponse[i].comune.length;s++){
                        if (jsonResponse[i].comune[s].value === SearchComune){
                            if (jsonResponse[i].comune[s].abilitato === 1){
                            segmentiAttivi.innerHTML="<!--segmenti localfood-->\n" +
                                "    <div style=\"overflow: hidden;\">\n" +
                                "        <div class=\"segmento_food\">\n" +
                                "            <img src=\"img/burger_segmento.png\">\n" +
                                "        </div>\n" +
                                "        <div class=\"segmento_food\">\n" +
                                "            <img src=\"img/pizza_segmento.png\">\n" +
                                "        </div>\n" +
                                "        <div class=\"segmento_food\">\n" +
                                "            <img src=\"img/gelato_segmento.png\">\n" +
                                "        </div>\n" +
                                "        <div class=\"segmento_food\">\n" +
                                "            <img src=\"img/sushi_segmento.png\">\n" +
                                "        </div>\n" +
                                "    </div>\n" +
                                "    <!--segmenti localfood-->\n";
                            offerteAttive.innerHTML = "<!--banner offerte-->\n" +
                                "    <div id=\"carouselOfferteSettimana\" class=\"carousel slide\" data-ride=\"carousel\">\n" +
                                "        <div class=\"carousel-inner\">\n" +
                                "            <div class=\"carousel-item active\">\n" +
                                "                <img class=\"d-block w-100\" src=\"img/offerte_settimana_slider_scontomenu.png\" alt=\"First slide\">\n" +
                                "            </div>\n" +
                                "            <div class=\"carousel-item\">\n" +
                                "                <img class=\"d-block w-100\" src=\"img/offerte_settimana_slider_hambuger.png\" alt=\"Second slide\">\n" +
                                "            </div>\n" +
                                "            <div class=\"carousel-item\">\n" +
                                "                <img class=\"d-block w-100\" src=\"img/offerte_settimana_slider_bibitagratis.png\" alt=\"Third slide\">\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "    </div>\n" +
                                "    <!--banner offerte-->\n";
                            novitaVar.innerHTML = "<!-- banner novità-->\n" +
                                "    <div id=\"carouselNovita\" class=\"carousel slide\" data-ride=\"carousel\">\n" +
                                "        <div class=\"carousel-inner\">\n" +
                                "            <div class=\"carousel-item active\">\n" +
                                "                <img class=\"d-block w-100\" src=\"img/novita_slider_behappy.png\" alt=\"First slide\">\n" +
                                "            </div>\n" +
                                "            <div class=\"carousel-item\">\n" +
                                "                <img class=\"d-block w-100\" src=\"img/novita_slider_2.png\" alt=\"Second slide\">\n" +
                                "            </div>\n" +
                                "            <div class=\"carousel-item\">\n" +
                                "                <img class=\"d-block w-100\" src=\"img/novita_slider_3.png\" alt=\"Third slide\">\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "    </div>\n" +
                                "    <!-- banner novità-->\n";
                            for (t=0;t<jsonResponse[i].comune[s].set_negozi.length;t++){
                                elencoNegozi.innerHTML += "<!-- Card Negozi-->\n" +
                                    "    <div class=\"card\">\n" +
                                    "<span id=\"pranzo"+t+"\" class=\"drappo\">Solo pranzo</span>" +
                                    "<span id=\"cena"+t+"\" class=\"drappo\">Solo cena</span>" +
                                    "<span id=\"full"+t+"\" class=\"drappo\">Pranzo e Cena</span>" +
                                    "        <a href=\""+jsonResponse[i].comune[s].set_negozi[t].url_negozio+"\" style=\"width: 50%\"><img class=\"card-img-top\" src=\"img/"+jsonResponse[i].comune[s].set_negozi[t].url_foto+"\" alt=\"Card image cap\" style=\"width: 100%\"></a>\n" +
                                    "        <div class=\"card-body info_left_shop\">\n" +
                                    "            <a href=\""+jsonResponse[i].comune[s].set_negozi[t].url_negozio+"\">\n" +
                                    "                <h5 class=\"card-title\" style=\"margin-bottom: unset;\">"+jsonResponse[i].comune[s].set_negozi[t].nome_negozio+"</h5>\n" +
                                    "                <p class=\"card-text\">\n" +
                                    "                    <span style=\"font-size: 20px;\">"+jsonResponse[i].comune[s].set_negozi[t].segmento+"<br></span>\n" +
                                    "                    <span style=\"font-size: 10px;\">A casa tua "+jsonResponse[i].comune[s].set_negozi[t].orario_consegna+"<br></span>\n" +
                                    "                    <span>"+jsonResponse[i].comune[s].set_negozi[t].rating+"</span>\n" +
                                    "                </p>\n" +
                                    "            </a>\n" +
                                    "        </div>\n" +
                                    "    </div>\n" +
                                    "    <!--Negozio Behappy-->\n" +
                                    "    <p></p>\n";
                                var consegnaPranzoFull = jsonResponse[i].comune[s].set_negozi[t].orario_consegna[0];
                                var consegnaCenaFull = jsonResponse[i].comune[s].set_negozi[t].orario_consegna[1];
                                if(consegnaPranzoFull === ""){
                                    document.getElementById("pranzo"+t).style.display="none";
                                    document.getElementById("cena"+t).style.display="block";
                                    document.getElementById("full"+t).style.display="none";
                                }
                                if(consegnaCenaFull  === ""){
                                    document.getElementById("pranzo"+t).style.display="block";
                                    document.getElementById("cena"+t).style.display="none";
                                    document.getElementById("full"+t).style.display="none";
                                }
                                if((consegnaCenaFull  !== "") && (consegnaPranzoFull  !== "")){
                                    document.getElementById("pranzo"+t).style.display="none";
                                    document.getElementById("cena"+t).style.display="none";
                                    document.getElementById("full"+t).style.display="block";
                                }
                            }
                            }else{
                            elencoNegozi.innerHTML = "" +
                                "<div class=\"jumbotron jumbotron-fluid\">\n" +
                                "        <div class=\"container\">\n" +
                                "            <h3 class=\"display-5\">Ci dispiace ma consegnamo solo a Crema</h3>\n" +
                                "            <p class=\"lead\">Non preoccuparti arriveremo presto a "+ SearchComune +"</p>\n" +
                                "        </div>\n" +
                                "    </div>";
                        }
                        //console.log(jsonResponse[i].comune[s].value);
                    }
                }
            }
            //console.log(jsonResponse);
        }
    };
    var Url = "comuni/comuni.json";
    xhttp.open("get", Url, true);
    xhttp.send();
}

function EditInfoCustomer() {
    var nome = document.infocCliente.nome.value;
    var email = document.infocCliente.email.value;
    var telefono = document.infocCliente.telefono.value;
    var splitNome = nome.split(" ");
    //token client sempre aggiornato e corretto
    TokenCart();
    var token_cliente = window.localStorage.getItem("token_cliente");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            //Stampa a video del carrello
            var data = this.responseText;
            var jsonResponse = JSON.parse(data);
            //document.getElementById(id).value = jsonResponse.qty;
            window.location.reload();
        }
    };
    var Url = "https://food.localecom.it/Cremasco/index.php/rest/V1/customers/me";
    var body_request = {
        "customer": {
            "id": 30,
            "group_id": 1,
            "default_billing": "17",
            "default_shipping": "17",
            "created_at": "2018-11-15 13:48:54",
            "updated_at": "2018-11-26 10:50:05",
            "created_in": "Default Store View",
            "email": email,
            "firstname": splitNome[0],
            "lastname": splitNome[1],
            "store_id": 1,
            "website_id": 1,
            "addresses": [
                {
                    "id": 17,
                    "customer_id": 30,
                    "region": {
                        "region_code": "CR",
                        "region": "Cremona",
                        "region_id": 0
                    },
                    "region_id": 0,
                    "country_id": "IT",
                    "street": [
                        "Via XX Settembre, 33"
                    ],
                    "telephone": telefono,
                    "postcode": "26013",
                    "city": "Crema",
                    "firstname": "Antonio",
                    "lastname": "Bellini",
                    "default_shipping": true,
                    "default_billing": true
                }
            ],
            "disable_auto_group_change": 0
        }
    };
    xhttp.open("PUT", Url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader("Authorization", token_cliente);
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.send(JSON.stringify(body_request));
}

function EditPassword (){
    var currentPassword = document.passwordCliente.current.value;
    var newPassword = document.passwordCliente.new.value;
    //token client sempre aggiornato e corretto
    TokenCart();
    var token_cliente = window.localStorage.getItem("token_cliente");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        var data = this.responseText;
        var jsonResponse = JSON.parse(data);
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            //Stampa a video del carrello
            //document.getElementById(id).value = jsonResponse.qty;
            window.localStorage.setItem("password",newPassword);
            window.location.reload();
        }
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 401) {
            navigator.notification.alert(jsonResponse.message);
        }
    };
    var Url = "https://food.localecom.it/Cremasco/index.php/rest/V1/customers/me/password";
    var body_request = {
        "currentPassword" : currentPassword,
        "newPassword" : newPassword
    };
    xhttp.open("PUT", Url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader("Authorization", token_cliente);
    //Header inserire il token d'accesso dell'integrazione di magento
    xhttp.send(JSON.stringify(body_request));
}
