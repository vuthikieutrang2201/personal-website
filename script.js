// ===== HIEUTHUHAI SLIDER =====
// Nguồn ảnh duy nhất: lấy từ thumbnail img[src], tự set background cho slide tương ứng

const slides  = document.querySelectorAll('.slide');
const thumbs  = document.querySelectorAll('.thumb');
const dots    = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let current   = 0;
let autoTimer = null;
const AUTO_DELAY = 5000;

// Khởi tạo: lấy src từ thumbnail -> set background cho từng slide
thumbs.forEach((thumb, i) => {
  const imgSrc = thumb.querySelector('img').src;
  // Dùng ảnh full-res hơn cho background (thay w=400 -> w=1400)
  const bgSrc = imgSrc.replace('w=400', 'w=1400');
  slides[i].style.backgroundImage = `url('${bgSrc}')`;
});

// ---- Chuyển slide ----
function goTo(index) {
  slides[current].classList.remove('active');
  slides[current].classList.add('exit');
  thumbs[current].classList.remove('active');
  dots[current].classList.remove('active');

  const exitSlide = slides[current];
  setTimeout(() => exitSlide.classList.remove('exit'), 700);

  current = (index + slides.length) % slides.length;

  slides[current].classList.add('active');
  thumbs[current].classList.add('active');
  dots[current].classList.add('active');

  // Reset animation chữ
  const content = slides[current].querySelector('.slide-content');
  if (content) {
    content.style.animation = 'none';
    requestAnimationFrame(() => { content.style.animation = ''; });
  }
}

// ---- Nút mũi tên ----
prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

// ---- Thumbnail ----
thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const idx = parseInt(thumb.dataset.index);
    if (idx !== current) { goTo(idx); resetAuto(); }
  });
});

// ---- Dots ----
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const idx = parseInt(dot.dataset.index);
    if (idx !== current) { goTo(idx); resetAuto(); }
  });
});

// ---- Bàn phím ----
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  { goTo(current - 1); resetAuto(); }
  if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
});

// ---- Touch / vuốt ----
let touchStartX = 0;
const wrapper = document.querySelector('.slider-wrapper');
wrapper.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
wrapper.addEventListener('touchend',   (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
}, { passive: true });

// ---- Auto play ----
function startAuto() { autoTimer = setInterval(() => goTo(current + 1), AUTO_DELAY); }
function resetAuto()  { clearInterval(autoTimer); startAuto(); }

startAuto();

// ===== ROW ARROWS =====
document.querySelectorAll('.row-prev').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.row).scrollBy({ left: -340, behavior: 'smooth' });
  });
});
document.querySelectorAll('.row-next').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.row).scrollBy({ left: 340, behavior: 'smooth' });
  });
});

// ===== NOTICE DETAIL DATA =====
const noticeData = {
  membership: {
    title: 'SUNDAYS OFFICIAL MEMBERSHIP – HIEUTHUHAI FANDOM PLATFORM',
    date: '2026.04.02',
    html: `
      <p style="text-align:center;font-size:1.05rem;font-weight:700;margin:0 0 20px">
        🚀 <strong>SUNDAYS OFFICIAL MEMBERSHIP CHÍNH THỨC RA MẮT 🚀</strong>
      </p>
      <p>SUNDAYS ơi, hành trình bước vào "vùng đặc quyền" dành riêng cho fan chính thức của HIEUTHUHAI đã chính thức bắt đầu!<br/>
      SUNDAYS OFFICIAL MEMBERSHIP không chỉ đơn giản là một chiếc thẻ, mà còn là "tấm vé" đưa bạn đến gần hơn với HIEUTHUHAI qua những nội dung độc quyền và trải nghiệm chỉ dành riêng cho cộng đồng SUNDAYS 🌻</p>
 
      <div class="d-heading">🌟 THÔNG TIN CHI TIẾT</div>
      <table class="d-table">
        <tr><th colspan="2">THÔNG TIN SUNDAYS OFFICIAL MEMBERSHIP</th></tr>
        <tr><td>Thời gian mở bán</td><td>20:00:00 – 02.04.2026 (Giờ Việt Nam)</td></tr>
        <tr><td>Giá gói</td><td>297,000 VNĐ</td></tr>
        <tr><td>Thời hạn</td><td>06 tháng kể từ thời điểm đăng ký<br/><span style="color:rgba(255,255,255,0.55);font-size:0.82rem">Kiểm tra thời hạn tại: Membership – Digital Card</span></td></tr>
      </table>
 
      <div class="d-heading">🎁 QUYỀN LỢI THÀNH VIÊN</div>
      <ul class="d-benefit">
        <li><strong>• Thẻ thành viên kỹ thuật số</strong><span>→ Kích hoạt ngay sau khi đăng ký thành công</span></li>
        <li><strong>• Nội dung độc quyền</strong><span>→ Truy cập loạt hình ảnh, video, bài đăng và cập nhật đặc biệt chỉ dành cho thành viên</span></li>
        <li><strong>• Quyền lợi mua vé sớm</strong><span>→ Ưu tiên đặt vé concert, fan meeting và các sự kiện (tùy chương trình)</span></li>
        <li><strong>• Merchandise giới hạn</strong><span>→ Quyền mua trước và sở hữu các sản phẩm độc quyền từ các dự án của HIEUTHUHAI</span></li>
        <li><strong>• Tham gia sự kiện đặc biệt</strong><span>→ Cơ hội đăng ký / bốc thăm tham gia livestream, event offline và hoạt động chính thức</span></li>
      </ul>
 
      <div class="d-highlight">✨ Gia nhập ngay SUNDAYS OFFICIAL MEMBERSHIP để không bỏ lỡ bất kỳ khoảnh khắc nào cùng HIEUTHUHAI!</div>
 
      <div class="d-note">
        🖤 <strong>Lưu ý quan trọng:</strong><br/>
        Mọi nội dung trong membership thuộc phạm vi riêng tư của cộng đồng thành viên.<br/>
        Vui lòng không chia sẻ, re-up hoặc phát tán ra bên ngoài để cùng giữ gìn giá trị chung của fandom.
      </div>
 
      <div class="d-copy">© HIEUTHUHAI Official. All rights reserved.</div>
      <p style="margin-top:16px">🌻 Hành trình đồng hành cùng HIEUTHUHAI chỉ vừa mới bắt đầu - và SUNDAYS chính là một phần không thể thiếu!</p>
    `
  }
};
 
// ===== NOTICE CLICK → DETAIL PAGE =====
const detailPage = document.getElementById('detailPage');
const detailBody = document.getElementById('detailBody');
const detailBack = document.getElementById('detailBack');
const mainPage   = document.getElementById('mainPage');
 
document.querySelectorAll('.notice-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const key  = card.dataset.notice;
    const data = noticeData[key];
    if (!data) return;
 
    detailBody.innerHTML = `
      <h1 class="d-title">${data.title}</h1>
      <p class="d-date">${data.date}</p>
      ${data.html}
    `;
 
    mainPage.style.display = 'none';
    detailPage.classList.add('active');
    detailPage.scrollTop = 0;
  });
});
 
detailBack.addEventListener('click', () => {
  detailPage.classList.remove('active');
  mainPage.style.display = '';
});