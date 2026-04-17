const counters = document.querySelectorAll('.counter');

const runCounter = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 200; // Tốc độ càng cao số càng chậm

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Kích hoạt khi cuộn trang (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        runCounter();
    }
}, { threshold: 0.5 });

observer.observe(document.querySelector('.achievements'));
function goTo(url) {
    window.open(url, "_blank");
}

document.querySelectorAll('.arrow-next').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const grids = document.querySelectorAll('.grid');
        grids[index].scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Ngăn việc load lại trang nếu bạn chưa gắn link thật
            // e.preventDefault(); 

            // 1. Xóa class 'active' khỏi tất cả các mục
            navItems.forEach(nav => nav.classList.remove('active'));

            // 2. Thêm class 'active' vào mục vừa được click
            this.classList.add('active');
        });
    });
});document.addEventListener('DOMContentLoaded', function()