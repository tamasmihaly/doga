function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var data = xhttp.responseText;
    // Innen, ide dolgozz... Itt hívd meg a függvényeid stb. A json file tartalma innen érhető csak
    // Live servert használd mindig
    //console.log(data);


    //var table = "";

    jsonobj = JSON.parse(data);

    var table = "";

    for (var i in jsonobj) {


        table += `
                    <tr>
            <td class="id">${jsonobj[i].id}</td>
            <td class="mass">${jsonobj[i].mass}</td>
            <td class="name">${jsonobj[i].name}</td>
            <td class="nametype">${jsonobj[i].nametype}</td>
            <td class="reccclass">${jsonobj[i].reccclass}</td>
            <td class="reclat">${jsonobj[i].reclat}</td>
            <td class="reclong">${jsonobj[i].reclong}</td>
            <td class="year">${jsonobj[i].year}</td>
                      </tr>`;
        jsonobj[i];
    };

    document.querySelector("#ideberak").innerHTML = table;
    var tablebody = document.querySelectorAll("td");
    var tablebodyMass = document.querySelectorAll("td.mass");
    for (var i = 0; i < tablebodyMass.length; i++) {
        tablebodyMass[i].innerHTML = parseFloat(tablebodyMass[i].innerHTML).toFixed(2);
    }
    var tablebodyYear = document.querySelectorAll("td.year");
    for (var i = 0; i < tablebodyYear.length; i++) {
        var datConv = tablebodyYear[i].innerHTML;
        datConv = `${datConv.substring(0, 4)}.${datConv.substring(5, 7)}.${datConv.substring(8, 10)}.`
        tablebodyYear[i].innerHTML = datConv;


    }
    // document.querySelector("#headid").addEventListener("click", rendezes);
    osszsuly();


    /*
        function rendezes() {
            var tablebodyMass = document.querySelectorAll("td.mass");
            //   console.log(tablebodyMass.sort());
           
            for (var i = 0; i < tablebodyMass.length; i++) {
             
                

            }






        };
    */

    /*
        function rendezes() {
            var tmp;
            for (var i = 0; i < data.length - 1; i++) {
        
                for (var j = i + 1; j < jsonContent.length; j++) {
        
        
                    if (sortingKey == "FIFA ranking") {
                        jsonContent[i][sortingKey] = parseInt(jsonContent[i][sortingKey]);
                        jsonContent[j][sortingKey] = parseInt(jsonContent[j][sortingKey]);
                    };
                    if (jsonContent[i][sortingKey] > jsonContent[i][sortingKey]) {
                        tmp = jsonContent[i];
                        jsonContent[i] = jsonContent[j];
                        jsonContent[j] = tmp;
                    };
        
                }
            }
            createTable();
        };
    */


    // rendezes();


    //end successajax
}

function osszsuly() {
    var sum = 0;
    var min = 1e6;
    var max = -1e6;
    var avg;

    var tmp;
    for (var i in jsonobj) {
        if (!isNaN(jsonobj[i].mass)) {
            sum += parseFloat(jsonobj[i].mass);
            if (parseFloat(jsonobj[i].mass) < min) {
                min = jsonobj[i].mass;
            };
            if (parseFloat(jsonobj[i].mass) > max) {
                max = jsonobj[i].mass;
            };
        }
    }
    avg = sum / jsonobj.length;
    document.querySelector("#osszesites").innerHTML = `<td>${sum}</td>`
    document.querySelector("#osszesites").innerHTML += `<td>${min}</td>`
    document.querySelector("#osszesites").innerHTML += `<td>${max}</td>`
    document.querySelector("#osszesites").innerHTML += `<td>${avg}</td>`
};



getData('/js/meteorits.json', successAjax);







/* 
    A kapott JSON file a Föld-be csapódott meteoritok adatait tartalmazza.

    
    
    3. A táblázat fejlécére kattintva növekvő sorrendbe lehessen rendezni a táblázat adatait az alábbi
       meteorit tulajdonságok szerint: id, mass, name, és reclass.
       Az id és a mass szerinti rendezés számok alapján rendezzen.

    4.  Valósítsd meg a rendezést úgy, hogy nem csak növekvő, hanem csökkenő sorrendbe is lehessen az adatokat rendezni.
        Ha az adatok még nincsenek rendezve, akkor az adott fejlév/tulajdonság alapján növekvő sorrendbe rendezze az adatokat kattintásra.
        Amennyiben még egyszer ugyanarra a fejlécre kattintanak, akkor a sorrend legyen csökkenő. És így tovább....
        Amennyiben egy új fejlécre kattintanak, először mindig növekvő sorrend szerint legyenek az  adatok rendezve.

    5. A táblázat alá az alábbi adatokat ki kell iratni/számolni:

        Az összes meteorit összsúlya
        A legkönyebb meteorit súlya
        A legnehezebb meteorit súlya
        A meteoritok súlyának átlaga
        Hány darab meteorit csapódott be 1990-ben
        Hány darab meteorit súlya legalább 10000

        Ezeket az elemeket ne az innerHTML segítségével hozd létre. Használd az ismert node metódusokat. KÖTELEZŐEN!

    6. Legyen szép a táblázat és az adatok. HAsználj CSS-t a formázáshoz.

    7. Töltsd fel az elkészült fileokat egy github repoba, és küld el a repo elérhetőségét.

    8. Szusszanj egyet.


FELADATOK:
    1. Írasd ki egy táblázatba a következő adatait a meteoritoknak:
        id
        mass
        name
        nametype
        recclass
        reclat
        reclong
        year

     Pozitív, ha ezeket az elemeket nem az innerHTML segítségével hozod létre. 

    2. A táblázatban formázd a tömeget 2 tizedes jegy pontosan. Ha kell kerekíts a legközelebbi egészre.
       A matamatikai kerekítés szabályait használd. Ha valahol egész érték van, ott is legyen a 00 kiiratva
       az egész érték után .
       Formázd a dátumot az alábbi formátumba: 1990. 01. 02. 

*/