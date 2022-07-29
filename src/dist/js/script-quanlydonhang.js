//region 1
const gCOL_NAME = ["stt", "orderId", "hoTen", "soDienThoai", "kichCo", "loaiPizza", "idLoaiNuocUong", "thanhtoan", "trangThai", "action"];
const gSTT_COL = 0;
const gORDERID_COL = 1;
const gHOTEN_COL = 2;
const gSODIENTHOAI_COL = 3;
const gKICHCO_COL = 4;
const gLOAIPIZZA_COL = 5;
const gNUOCUONG_COL = 6;
const gTHANHTOAN_COL = 7;
const gTRANGDTHAI_COL = 8;
const gACTION_COL = 9;

var gTable = $("#table-result").DataTable({
    ordering: false,
    columns: [
        { data: gCOL_NAME[gSTT_COL] },
        { data: gCOL_NAME[gORDERID_COL] },
        { data: gCOL_NAME[gHOTEN_COL] },
        { data: gCOL_NAME[gSODIENTHOAI_COL] },
        { data: gCOL_NAME[gKICHCO_COL] },
        { data: gCOL_NAME[gLOAIPIZZA_COL] },
        { data: gCOL_NAME[gNUOCUONG_COL] },
        { data: gCOL_NAME[gTHANHTOAN_COL] },
        { data: gCOL_NAME[gTRANGDTHAI_COL] },
        { data: gCOL_NAME[gACTION_COL] },
    ],
    columnDefs: [
        {
            targets: gSTT_COL,
            width: "3%",
            render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            }
        },
        {
            targets: gTHANHTOAN_COL,
            render: function (data, type, row) {
                return row.thanhTien - row.giamGia;
            }
        },
        {
            targets: gACTION_COL,
            width: "10%",
            defaultContent: `
                    <i class="fas fa-edit pointer" data-toggle="tooltip" data-placement="bottom" title="Sửa" id="edit-btn"></i>
                    <i class="fas fa-trash-alt pl-3 pointer" data-toggle="tooltip" data-placement="bottom" title="Xóa" id="del-btn"></i>
                    `
        }
    ]
})

var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
});

var gObjectRequest = {
    kichCo: "",
    duongKinh: "",
    suon: "",
    salad: "",
    loaiPizza: "",
    idVourcher: "",
    idLoaiNuocUong: "",
    soLuongNuoc: "",
    hoTen: "",
    thanhTien: "",
    email: "",
    soDienThoai: "",
    diaChi: "",
    loiNhan: ""
}

var gId = "";

//region 2
$("#btn-create-order").on("click", function () {
    $("#create-order-modal").modal("show");
    loadSelectDrinkList();
})

$("#select-create-combo").on("click", function () {
    var vOptionSelect = $("#select-create-combo option:selected").val();
    displayComboInfo(vOptionSelect);
})

$("#id-create-voucher").on("change", function () {
    if ($(this).val() !== "") {
        kiemTraVoucher($(this).val());
    }
    else {
        $("#id-create-giamgia").val("");
    }
})

$("#btn-confirm-create-order").on("click", function () {
    onBtnConfirmCreate();
})

$(document).on("click", "#edit-btn", function () {
    onBtnEditClick(this);
})

$("#btn-confirm-edit-order").on("click", function () {
    onBtnConfirmEditClick();
})

$(document).on("click", "#del-btn", function () {
    onBtnDelClick(this);
})

$("#btn-confirm-delete-order").on("click", function () {
    onBtnConfirmDeleteClick(gId);
})

$("#btn-tracuu").on("click", function () {
    onBtnTraCuuClick();
})


//region 3
function onPageLoading() {
    loadOrderList();
}

function loadOrderList() {
    $.ajax({
        url: "http://42.115.221.44:8080/devcamp-pizza365/orders",
        method: "GET",
        success: function (res) {
            $("#div-result").show();
            //console.log(res);
            displayToTable(res);
        },
        error: function (res) {
            console.log(res);
            Toast.fire({
                icon: 'error',
                title: 'Server chưa phản hồi. Hãy thử lại'
            })
        }
    })
}

function loadSelectDrinkList() {
    $.ajax({
        url: "http://42.115.221.44:8080/devcamp-pizza365/drinks",
        method: "GET",
        success: function (res) {
            //console.log(res);
            displayToSelectDrink(res);
        },
        error: function (res) {
            console.log(res);
            Toast.fire({
                icon: 'error',
                title: 'Server chưa phản hồi. Hãy thử lại'
            })
        }
    })
}

function kiemTraVoucher(paramVoucher) {
    $.ajax({
        url: "http://42.115.221.44:8080/devcamp-voucher-api/voucher_detail/" + paramVoucher,
        method: "GET",
        success: function (res) {
            //console.log(res);
            displayMaGiamGia(res);
        },
        error: function (res) {
            console.log(res);
            Toast.fire({
                icon: 'error',
                title: 'Server chưa phản hồi. Hãy thử lại'
            })
        }
    })
}

function onBtnConfirmCreate() {
    //b1
    getOrderData(gObjectRequest);
    //b2
    var vValidData = validateData(gObjectRequest);
    if (vValidData) {
        //console.log(gObjectRequest);
        $.ajax({
            url: "http://42.115.221.44:8080/devcamp-pizza365/orders",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(gObjectRequest),
            success: function (res) {
                //console.log(res);
                Toast.fire({
                    icon: 'success',
                    title: 'Đặt hàng thành công'
                });
                loadOrderList();
                $("#create-order-modal").modal("hide");
                clearCreateOrderForm();
            },
            error: function (res) {
                console.log(res);
                Toast.fire({
                    icon: 'error',
                    title: 'Server chưa phản hồi. Hãy thử lại'
                })
            }
        })
    }

}

function onBtnEditClick(paramElement) {
    var vRow = $(paramElement).closest("tr");
    var vTable = $("#table-result").DataTable();
    var vRowData = vTable.row(vRow).data();
    console.log(vRowData);

    displayDataToModal(vRowData);
}

function onBtnDelClick(paramElement) {
    var vRow = $(paramElement).closest("tr");
    var vTable = $("#table-result").DataTable();
    var vRowData = vTable.row(vRow).data();
    console.log(vRowData);
    gId = vRowData.id;
    $("#delete-question").html("Click Confirm To Delete OrderId " + vRowData.orderId)
    $("#delete-order-modal").modal("show");
}

function onBtnConfirmEditClick() {
    var vId = $("#id-edit-id").val();

    var vObjectRequest = {
        trangThai: $("#id-edit-status option:selected").val() //3 trang thai open, confirmed, cancel
    }

    $.ajax({
        url: "http://42.115.221.44:8080/devcamp-pizza365/orders" + "/" + vId,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(vObjectRequest),
        success: function (res) {
            //console.log(res);
            Toast.fire({
                icon: 'success',
                title: 'Cập nhật đơn hàng thành công'
            });
            loadOrderList();
            $("#edit-order-modal").modal("hide");
        },
        error: function (res) {
            console.log(res);
            Toast.fire({
                icon: 'error',
                title: 'Server chưa phản hồi. Hãy thử lại'
            })
        }
    })
}

function onBtnConfirmDeleteClick(paramId) {
    $.ajax({
        url: "http://42.115.221.44:8080/devcamp-pizza365/orders" + "/" + paramId,
        method: "DELETE",
        success: function (res) {
            //console.log(res);
            Toast.fire({
                icon: 'success',
                title: 'Xóa đơn hàng thành công'
            });
            $("#delete-order-modal").modal("hide");
            loadOrderList();

        },
        error: function (res) {
            console.log(res);
            Toast.fire({
                icon: 'error',
                title: 'Server chưa phản hồi. Hãy thử lại'
            })
        }
    })
}

function onBtnTraCuuClick() {
    var vData = {
        loaiPizza: "",
        trangThai: ""
    }

    //b1
    layThongTinTraCuu(vData);
    //b2
    var vValidData = validateThongTinTraCuu(vData);
    if (vValidData) {
        $.ajax({
            url: "http://42.115.221.44:8080/devcamp-pizza365/orders",
            method: "GET",
            success: function (res) {
                var vResult = res.filter(function (element) {
                    return ((element.loaiPizza == vData.loaiPizza || vData.loaiPizza == 0)
                        && (element.trangThai == vData.trangThai || vData.trangThai == 0))
                });
                //b4
                if (vResult.length > 0) {
                    $("#p-result").hide();
                    $("#div-result").show();
                    displayToTable(vResult);
                }
                else {
                    $("#div-result").hide();
                    $("#p-result").show();
                    $("#p-result").html("Không có kết quả hiển thị");
                }
                //console.log(res);
            },
            error: function (res) {
                console.log(res);
                Toast.fire({
                    icon: 'error',
                    title: 'Server chưa phản hồi. Hãy thử lại'
                })
            }
        })
    }
}

//region 4
function displayToTable(paramResponse) {
    gTable.clear();
    gTable.rows.add(paramResponse);
    gTable.draw();
}

function displayComboInfo(paramSelect) {
    if (paramSelect == "0") {
        $("#id-create-duongkinh").val("");
        $("#id-create-suonnuong").val("");
        $("#id-create-salad").val("");
        $("#id-create-soluongnuocuong").val("");
        $("#id-create-thanhtien").val("");
    };
    if (paramSelect == "S") {
        $("#id-create-duongkinh").val("20");
        $("#id-create-suonnuong").val("2");
        $("#id-create-salad").val("200");
        $("#id-create-soluongnuocuong").val("2");
        $("#id-create-thanhtien").val("150000");
    };
    if (paramSelect == "M") {
        $("#id-create-duongkinh").val("25");
        $("#id-create-suonnuong").val("4");
        $("#id-create-salad").val("300");
        $("#id-create-soluongnuocuong").val("3");
        $("#id-create-thanhtien").val("200000");
    };
    if (paramSelect == "L") {
        $("#id-create-duongkinh").val("30");
        $("#id-create-suonnuong").val("8");
        $("#id-create-salad").val("500");
        $("#id-create-soluongnuocuong").val("4");
        $("#id-create-thanhtien").val("250000");
    };
}

function displayToSelectDrink(paramResponse) {
    for (var bI in paramResponse) {
        var vOption = $("<option/>", {
            value: paramResponse[bI].maNuocUong,
            text: paramResponse[bI].tenNuocUong,
        })
        $("#select-create-drink").append(vOption);
    }
}

function displayMaGiamGia(paramResponse) {
    var vGiamGia = Number(paramResponse.phanTramGiamGia);
    if (vGiamGia > 0) {
        $("#id-create-giamgia").val("Mã giảm " + vGiamGia + "% giá trị đơn hàng");
    }
    else {
        $("#id-create-giamgia").val("");
    }
}

function getOrderData(paramObject) {
    paramObject.kichCo = $("#select-create-combo option:selected").val();
    paramObject.duongKinh = $("#id-create-duongkinh").val();
    paramObject.suon = $("#id-create-suonnuong").val();
    paramObject.salad = $("#id-create-salad").val();
    paramObject.loaiPizza = $("#select-create-pizzatype option:selected").val();
    paramObject.idVourcher = $("#id-create-voucher").val();
    paramObject.idLoaiNuocUong = $("#select-create-drink option:selected").val();
    paramObject.soLuongNuoc = $("#id-create-soluongnuocuong").val();
    paramObject.hoTen = $("#id-create-hoten").val();
    paramObject.thanhTien = $("#id-create-thanhtien").val();
    paramObject.email = $("#id-create-email").val();
    paramObject.soDienThoai = $("#id-create-sodienthoai").val();
    paramObject.diaChi = $("#id-create-diachi").val();
    paramObject.loiNhan = $("#id-create-loinhan").val();
}

function validateData(paramObject) {
    if (paramObject.loaiPizza == 0) {
        Toast.fire({
            icon: 'warning',
            title: 'Chưa chọn loại Pizza'
        })
        return false;
    }
    if (paramObject.kichCo == 0) {
        Toast.fire({
            icon: 'warning',
            title: 'Chưa chọn loại Pizza'
        })
        return false;
    }
    if (paramObject.idLoaiNuocUong == 0) {
        Toast.fire({
            icon: 'warning',
            title: 'Chưa chọn loại nước uống'
        })
        return false;
    }
    if (paramObject.hoTen == "") {
        Toast.fire({
            icon: 'warning',
            title: 'Chưa nhập họ tên'
        })
        return false;
    }
    if (paramObject.soDienThoai == "") {
        Toast.fire({
            icon: 'warning',
            title: 'Chưa nhập số điện thoại'
        })
        return false;
    }
    if (paramObject.email !== "") {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(paramObject.email) == false) {
            Toast.fire({
                icon: 'warning',
                title: 'Email không hợp lệ'
            })
            return false;
        }
    }
    if (paramObject.diaChi == 0) {
        Toast.fire({
            icon: 'warning',
            title: 'Chưa nhập địa chỉ'
        })
        return false;
    }
    return true;
}

function clearCreateOrderForm() {
    $("#select-create-combo").val("0");
    $("#id-create-duongkinh").val("");
    $("#id-create-suonnuong").val("");
    $("#id-create-salad").val("");
    $("#select-create-pizzatype").val("0");
    $("#id-create-voucher").val("");
    $("#select-create-drink").val("0");
    $("#id-create-soluongnuocuong").val("");
    $("#id-create-hoten").val("");
    $("#id-create-thanhtien").val("");
    $("#id-create-email").val("");
    $("#id-create-sodienthoai").val("");
    $("#id-create-diachi").val("");
    $("#id-create-loinhan").val("");
}



function displayDataToModal(paramResponse) {
    $("#edit-order-modal").modal("show");
    $("#id-edit-id").val(paramResponse.id);
    $("#id-edit-orderid").val(paramResponse.orderId);
    $("#id-edit-pizzatype").val(paramResponse.loaiPizza);
    $("#id-edit-combo").val(paramResponse.kichCo);
    $("#id-edit-duongkinh").val(paramResponse.duongKinh);
    $("#id-edit-suonnuong").val(paramResponse.suon);
    $("#id-edit-salad").val(paramResponse.salad);
    $("#id-edit-voucher").val(paramResponse.idVourcher);
    $("#id-edit-giamgia").val(paramResponse.giamGia);
    $("#id-edit-soluongnuocuong").val(paramResponse.soLuongNuoc);
    $("#id-edit-nuocuong").val(paramResponse.idLoaiNuocUong);
    $("#id-edit-hoten").val(paramResponse.hoTen);
    $("#id-edit-thanhtien").val(paramResponse.thanhTien);
    $("#id-edit-email").val(paramResponse.email);
    $("#id-edit-sodienthoai").val(paramResponse.soDienThoai);
    $("#id-edit-diachi").val(paramResponse.diaChi);
    $("#id-edit-loinhan").html(paramResponse.loiNhan);
    $("#id-edit-ngaytao").val(paramResponse.ngayTao);
    $("#id-edit-ngaycapnhat").val(paramResponse.ngayCapNhat);
    $("#id-edit-status option[value=" + paramResponse.trangThai + "]").attr('selected', 'selected');
}

function layThongTinTraCuu(paramData) {
    paramData.loaiPizza = $("#select-pizzaname option:selected").val();
    paramData.trangThai = $("#select-status option:selected").val();
}

function validateThongTinTraCuu(paramData) {
    if (paramData.loaiPizza == 0 && paramData.trangThai == 0) {
        Toast.fire({
            icon: 'info',
            title: 'Phải chọn ít nhất 1 thông tin để tra cứu'
        });
        return false;
    }
    return true;
}
