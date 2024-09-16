import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

document.addEventListener('DOMContentLoaded', () => {
    const firebaseConfig = {
      apiKey: "AIzaSyDzzZs4JEgfGId9F46d71Q-49xODxMT6Ks",
      authDomain: "mypets777.firebaseapp.com",
      projectId: "mypets777",
      storageBucket: "mypets777.appspot.com",
      messagingSenderId: "1059772562446",
      appId: "1:1059772562446:web:b9bca3465024103c02105f",
      measurementId: "G-G0YLV8HRWB"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const database = getDatabase(app);

    const signUpForm = document.getElementById('sign-up-form');
    signUpForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('Sign-up form submitted');

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const nickname = document.getElementById('nickname').value;

        try {
            const isIdAvailable = await checkId(email);
            console.log('ID available:', isIdAvailable);
            if (!isIdAvailable || !validateNickname(nickname)) {
                console.log('Validation failed');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await set(ref(database, 'users/' + user.uid), {
                email: email,
                nickname: nickname
            });

            alert('회원가입에 성공했습니다!');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('회원가입 실패:', error.message);
            alert('회원가입에 실패했습니다: ' + error.message);
            window.location.href = 'fail.html';
        }
    });

    const signInForm = document.getElementById('sign-in-form');
    signInForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('Sign-in form submitted');

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            alert('로그인에 성공했습니다!');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('로그인 실패:', error.message);
            alert('로그인에 실패했습니다: ' + error.message);
            window.location.href = 'fail.html';
        }
    });

    async function checkId(id) {
        try {
            const snapshot = await get(child(ref(database), `users/${id}`));
            if (snapshot.exists()) {
                alert('이미 존재하는 아이디입니다.');
                return false;
            } else {
                alert('사용 가능한 아이디입니다.');
                return true;
            }
        } catch (error) {
            console.error('ID 확인 중 오류 발생:', error);
            alert('ID 확인 중 오류가 발생했습니다.');
            return false;
        }
    }

    function validateNickname(nickname) {
        const regex = /^[a-zA-Z가-힣0-9\s\-.\/]{1,6}$/;
        if (!regex.test(nickname)) {
            alert('닉네임은 6자 이하로 영어/한국어/숫자/띄어쓰기/-/. 만 사용할 수 있습니다.');
            return false;
        }
        return true;
    }
});
