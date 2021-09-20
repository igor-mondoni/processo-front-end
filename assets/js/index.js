$(document).ready(function () {
    getData();
});


$("#people-form").submit(function (e) {
    e.preventDefault();
    const id = $('#id').val();
    const url = id ? `http://127.0.0.1:3333/pessoas/register/${id}` : `http://127.0.0.1:3333/pessoas/register`;

    var name = $('#name').val();
    var surname = $('#surname').val();
    var email = $('#email').val();
    var zipcode = $('#zip_code').val();
    var state = $('#state').val();
    var city = $('#city').val();
    var street = $('#street').val();
    var docnumber = $('#doc_number').val();
    var cellphone = $('#cellphone').val();
    var nationality = $('#nationality').val();

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
            if (data === "CPF já existe") {
                alert('CPF já consta no cadastro')
            } else {
                alert('cadastrado')
                window.location.href = "/";
            }
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
                        <td>${item.cellphone}</td>
                        <td>${item.nationality}</td>
                        <td>${item.zip_code}</td>
                        <td>${item.city}</td>
                        <td>${item.street}</td>
                        <td>${item.doc_number}</td>
                        <td>${item.createdAt}</td>
                        <td><button type="button" data-id="${item.id}" onclick="getDataFromPeople(this)" class="btn btn-primary" data-toggle="modal" data-target=".bd-pessoas-modal-lg">editar</button>
                        <button data-id="${item.id}" onclick="dataDestroy(this)" class="btn btn-secondary">deletar</button></td>   
                    </tr>                        
                    `
                );
            });
            $('#payload-data').DataTable();
        }
    });
}

function dataDestroy(obj) {
    var id = $(obj).attr('data-id');
    $.ajax({
        url: `http://127.0.0.1:3333/pessoas/delete/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Accept": "application/json"
        },
        type: "GET",
        crossDomain: true,
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
        },
        success: function (data) {
            alert('Deletado com sucesso!')
            window.location.href = "/"
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
            $('#id').val(data.id)
            $('#name').val(data.name)
            $('#surname').val(data.surname)
            $('#email').val(data.email)
            $('#zip_code').val(data.zip_code)
            $('#state').val(data.state)
            $('#city').val(data.city)
            $('#street').val(data.street)
            $('#doc_number').val(data.doc_number)
            $('#cellphone').val(data.cellphone)
            $('#nationality').val(data.nationality)
        }
    });
}

$('#doc_number').focusout(function () {
    let cpf = $('#doc_number').val();
    cpf = cpf.replace(/[^\d]/g, "");
    let data = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    $('#doc_number').val(data)
});


$('#open-register-modal').click(function () {
    $('#id').val('');
    $('#name').val('');
    $('#surname').val('');
    $('#email').val('');
    $('#zip_code').val('');
    $('#state').val('');
    $('#city').val('');
    $('#street').val('');
    $('#doc_number').val('');
    $('#cellphone').val('');
    $('#nationality').val('');
})

$('#zip_code').focusout(function () {
    let cep = $('#zip_code').val()
    if (cep.length != 8) {
        return;
    }
    cep = cep.substring(0, 5) + "-" + cep.substring(5, cep.length);

    $('#zip_code').val(cep);
    const zipcode = $('#zip_code').val();
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
            $('#state').val(data.uf);
            $('#city').val(data.localidade);
            $('#street').val(data.logradouro);
        }
    });
});