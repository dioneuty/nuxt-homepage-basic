<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- 상단 메뉴 -->
      <div class="footer-menu">
        <NuxtLink to="/privacy" class="menu-item">개인정보처리방침</NuxtLink>
        <span class="divider">·</span>
        <NuxtLink to="/terms" class="menu-item">이용약관</NuxtLink>
        <span class="divider">·</span>
        <NuxtLink to="/sitemap" class="menu-item">고객센터</NuxtLink>
      </div>

      <!-- 회사 정보 -->
      <div class="company-info">
        <p class="info-line">
          상호: 개인블로그(예시) | (대표자): 박노준 | 사업자등록번호 : 123-45-67890 | 개인정보관리책임자 : me@yourblog.com
        </p>
        <p class="info-line">
          주소 : (46721) 부산광역시 강서구 공항진입로 108, 신화테크빌딩 고객센터(이하) 1층 부산센터 | 전화번호 : (051)971-2780 | FAX : (051)971-2781
        </p>
        <p class="copyright">
          COPYRIGHT (C) 2022 KYUNG BOK KUNG CULTURE. ALL RIGHT RESERVED.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #2b2b2b;
  color: #999;
  padding: 30px 0;
  font-size: 13px;
}

.footer-container {
  margin: 0 auto;
  padding: 0 90px;
}

.footer-menu {
  margin-bottom: 20px;
}

.menu-item {
  color: #999;
  text-decoration: none;
}

.menu-item:hover {
  color: #fff;
}

.divider {
  margin: 0 8px;
  color: #555;
}

.company-info {
  line-height: 1.6;
}

.info-line {
  margin: 0;
  color: #777;
}

.copyright {
  margin-top: 10px;
  color: #666;
}

@media (max-width: 768px) {
  .footer {
    padding: 20px 0;
  }

  .info-line {
    font-size: 12px;
  }
}
</style>