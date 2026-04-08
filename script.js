var noti = document.getElementById("noti");
var count = document.getElementById("count");
var list = document.getElementById("list");

noti.onclick = function(){
    noti.classList.toggle("active");
}

function getData(){
    var data = [
        "Co don hang moi dat ao HIEUTHUHAI",
        "Don hang merch vua duoc xac nhan",
        "Co nguoi vua dat hoodie HIEUTHUHAI",
        "Dang co chien dich giam gia merch",
        "Sap dien ra concert HIEUTHUHAI"
    ];
    return data;
}

function load(){
    var data = getData();

    count.innerText = data.length;

    list.innerHTML = "";

    for(var i=0;i<data.length;i++){
        var li = document.createElement("li");
        li.innerText = data[i];
        list.appendChild(li);
    }
}

load();
