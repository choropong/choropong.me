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

function getRandomImage() {
    const randomNumber = Math.floor(Math.random() * 10) + 1; // 1부터 10까지 랜덤 숫자 생성
    return `image/st${randomNumber}.png`; // 이미지 파일 경로 반환
}

// 랜덤 이미지 설정
document.getElementById("imgLeft").src = getRandomImage();
document.getElementById("imgRight").src = getRandomImage();

function showModal(title, content) {
    document.getElementById('authModalLabel').textContent = title;
    document.querySelector('#authModal .modal-body').textContent = content;
    var myModal = new bootstrap.Modal(document.getElementById('authModal'));
    myModal.show();
}
