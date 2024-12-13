<template>
  <aside class="sidebar">
    <ul>
      <li>나의 쇼핑정보</li>
      <li>주문 / 취소내역</li>
      <li>나의 정보</li>
      <li>여권 정보</li>
      <li>입국 정보</li>
      <li>회원 정보 수정</li>
      <li>고객센터</li>
      <li>공지사항</li>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 200px;
  background-color: white;
  padding: 0;
  height: 100%;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 15px 20px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

li:hover {
  background-color: #f0f0f0;
  color: #000;
}
</style>