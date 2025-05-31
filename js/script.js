document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling cho các link neo (anchor links)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Xử lý form liên hệ (ví dụ đơn giản)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn chặn việc gửi form theo cách truyền thống

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Vui lòng điền đầy đủ thông tin.');
                return;
            }

            // Tại đây bạn có thể thêm code để gửi dữ liệu form đi (ví dụ dùng Fetch API)
            // Ví dụ đơn giản chỉ hiển thị thông báo:
            alert(`Cảm ơn ${name} đã liên hệ! Chúng tôi sẽ sớm phản hồi qua email ${email}.`);
            contactForm.reset(); // Xóa các trường trong form
        });
    }

    // Thêm hiệu ứng active cho menu khi cuộn trang (tùy chọn)
    const sections = document.querySelectorAll('main section');
    const navLi = document.querySelectorAll('header nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Điều chỉnh offsetTop để active chính xác hơn
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
    // Thêm CSS cho class 'active' trong file style.css nếu bạn muốn sử dụng phần này
    // Ví dụ:
    // header nav ul li a.active {
    //     color: #0779e4; /* Hoặc một màu khác để làm nổi bật */
    //     border-bottom: 2px solid #0779e4;
    // }
});