document.querySelector(".scroll-container").addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentSlide = 0;
// 1. Hàm dùng chung để cuộn đến một mục tiêu cụ thể trong container
function smoothScrollTo(targetSelector) {
  const targetElement = document.querySelector(targetSelector);
  const container = document.querySelector(".scroll-container");

  if (targetElement && container) {
    // Tính toán vị trí của phần tử mục tiêu so với đỉnh của container
    const targetOffset = targetElement.offsetTop;

    // Thực hiện cuộn container đến vị trí đó
    container.scrollTo({
      top: targetOffset,
      behavior: "smooth", // Cuộn mượt mà
    });
  }
}

// 2. Gán sự kiện click cho các ảnh ở phần Hero
document.querySelectorAll(".clickable-img").forEach((item) => {
  item.addEventListener("click", () => {
    const target = item.getAttribute("data-target"); // Lấy giá trị #merch
    smoothScrollTo(target);
  });
});

// 3. Gán sự kiện click cho các thẻ Merchandise
document.querySelectorAll(".clickable-merch").forEach((item) => {
  item.addEventListener("click", () => {
    const target = item.getAttribute("data-target"); // Lấy #detail-silent hoặc #detail-talkative
    smoothScrollTo(target);
  });
});
