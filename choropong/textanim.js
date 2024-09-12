window.onload = function() {
    document.querySelectorAll('.fade-in').forEach(function(element) {
        element.style.opacity = "1";
    });
};

document.addEventListener('DOMContentLoaded', () => {
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 }); // 요소가 10% 보일 때 애니메이션 시작

    document.querySelectorAll('div.opa').forEach(div => {
        observer.observe(div);
    });
});