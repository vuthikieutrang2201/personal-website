var notifications = [
    "Nguyễn Văn Anh đã hoàn tất thanh toán đơn hàng #HTH001 - 1 phút trước",
    "Trần Minh Khôi đã thêm sản phẩm vào giỏ hàng - 3 phút trước",
    "Lê Thu Hà đã kích hoạt membership - 5 phút trước",
    "Phạm Quốc Bảo đã thêm album vào thư viện - 10 phút trước",
    "Hoàng Anh Tuấn đã xác nhận đơn hàng #HTH002 - 15 phút trước",
    "Đỗ Minh Quân đã cập nhật giỏ hàng - 20 phút trước",
    "Vũ Hải Nam đã áp dụng mã giảm giá - 30 phút trước",
    "Nguyễn Đức Phúc đã hoàn tất đơn hàng #HTH003 - 1 giờ trước",
    "Trần Thị Lan đã nhận hàng thành công - 2 giờ trước",
    "Lý Quốc Dũng đã thêm sản phẩm vào giỏ hàng - 3 giờ trước",
    "Phan Văn Sơn đã xác nhận email - 5 giờ trước",
    "Nguyễn Hồng Minh đã cập nhật tài khoản - 6 giờ trước"
];

var count = document.getElementById("count");
var list = document.getElementById("list");
var box = document.getElementById("box");
var overlay = document.getElementById("overlay");

count.innerHTML = notifications.length;

for (var i = 0; i < notifications.length; i++) {
    list.innerHTML += "<li>" + notifications[i] + "</li>";
}

function hienthongbao() {
    box.style.display = "block";
    overlay.style.display = "block";
}

function dong() {
    box.style.display = "none";
    overlay.style.display = "none";
}
