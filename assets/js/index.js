$(document).ready(function () {
    getData();
});


$("#people-form").submit(function (e) {
    e.preventDefault();
    const id = $('#id').val()
    const url = `http://127.0.0.1:3333/pessoas/register`

    var name = $('#name').val()
    var surname = $('#surname').val()
    var email = $('#email').val()
    var zipcode = $('#zip_code').val()
    var state = $('#state').val()
    var city = $('#city').val()
    var street = $('#street').val()
    var docnumber = $('#doc_number').val()
    var cellphone = $('#cellphone').val()
    var nationality = $('#nationality').val()

    $.ajax({
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        type: "POST",
        data: {
            "name": name,
            "surname": surname,
            "email": email,
            "zip_code": zipcode,
            "state": state,
            "city": city,
            "street": street,
            "doc_number": docnumber,
            "cellphone": cellphone,
            "nationality": nationality
        },

        success: function (data) {
            alert('cadastrado')
        }
    });
})

function getData() {
    $.ajax({
        url: `http://127.0.0.1:3333/pessoas`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Accept": "application/json"
        },
        type: "GET",
        crossDomain: true,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
        },
        success: function (data) {
            $.each(data, function (key, item) {
                $('#tbody-table').append(
                    `
                    <tr>
                        <td>${item.name} ${item.surname}</td>
                        <td>${item.email}</td>
                        <td>${item.telephone}</td>
                        <td>${item.nationality}</td>
                        <td>${item.zip_code}</td>
                        <td>${item.city}</td>
                        <td>${item.street}</td>
                        <td>${item.doc_number}</td>
                        <td>${item.createdAt}</td>
                        <td><button type="button" data-id="${item.id}" onclick="getDataFromPeople(this)" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">editar</button><button>deletar</button></td>   
                    </tr>                        
                    `
                );

            });
        }
    });
}


function getDataFromPeople(obj) {
    var id = $(obj).attr('data-id');
    $.ajax({
        url: `http://127.0.0.1:3333/pessoas/show/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Accept": "application/json"
        },
        type: "GET",
        crossDomain: true,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
        },
        success: function (data) {
            $('#name').val(data.name)
            $('#surname').val(data.surname)
            $('#email').val(data.email)
            $('#zip_code').val(data.zip_code)
            $('#state').val(data.state)
            $('#city').val(data.city)
            $('#street').val(data.street)
            $('#doc_number').val(data.doc_number)
            $('#cellphone').val(data.cellphone)
        }
    });
}


function deletePeople(obj) {
    var id = $(obj).attr('data-id');
    $.ajax({
        url: `http://127.0.0.1:3333/pessoas/delete/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Accept": "application/json"
        },
        type: "DELETE",
        crossDomain: true,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
        },
        success: function (data) {
            alert('sucesso!')
        }
    });
}

// $('#doc_number').focusout(function () {
//     let cpf = $('#doc_number').val();
//     cpf = cpf.replace(/[^\d]/g, "");
//     let data = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
//     $('#doc_number').val(data)
// })

$('#zip_code').focusout(function () {
    // $('#zip_code').mask('00000-000')
    const zipcode = $('#zip_code').val()
    $.ajax({
        url: `https://viacep.com.br/ws/${zipcode}/json/`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Accept": "application/json"
        },
        type: "GET",
        crossDomain: true,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
        },
        success: function (data) {
            $('#state').val(data.uf)
            $('#city').val(data.localidade)
            $('#street').val(data.logradouro)
        }
    });
})