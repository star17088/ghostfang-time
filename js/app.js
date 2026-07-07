const content = document.getElementById("content");
const pageTitle = document.getElementById("pageTitle");
const pageDesc = document.getElementById("pageDesc");
const menuButtons = document.querySelectorAll(".menu-btn");

const pages = {
  dashboard: {
    title: "대시보드",
    desc: "오늘의 팔찌 시간권 이용 현황을 확인합니다.",
  },
  entry: {
    title: "입장 등록",
    desc: "팀명, 휴대폰번호, 인원수, 팔찌번호, 이용권을 등록합니다.",
  },
  active: {
    title: "이용자 목록",
    desc: "현재 이용 중인 팀과 남은 시간을 확인합니다.",
  },
  checkout: {
    title: "퇴장 처리",
    desc: "반납 팔찌를 스캔해 이용자를 확인하고 퇴장 처리합니다.",
  },
  tv: {
    title: "TV 화면",
    desc: "TV에 표시할 남은 시간 화면입니다.",
  },
  settings: {
    title: "설정",
    desc: "이용권, 알림, 운영 설정을 관리합니다.",
  },
};

function renderDashboard() {
  content.innerHTML = `
    <div class="dashboard-grid">
      <section class="stat-card">
        <span>현재 이용중</span>
        <strong>0</strong>
        <p>시간권 이용 중인 팀</p>
      </section>

      <section class="stat-card">
        <span>10분 전</span>
        <strong>0</strong>
        <p>곧 종료 예정인 팀</p>
      </section>

      <section class="stat-card">
        <span>시간 종료</span>
        <strong>0</strong>
        <p>퇴장 확인이 필요한 팀</p>
      </section>

      <section class="stat-card">
        <span>오늘 입장</span>
        <strong>0</strong>
        <p>오늘 등록된 전체 팀</p>
      </section>
    </div>

    <section class="panel">
      <div class="panel-head">
        <h3>빠른 작업</h3>
      </div>

      <div class="quick-actions">
        <button class="primary-btn" data-go="entry">입장 등록하기</button>
        <button class="secondary-btn" data-go="active">이용자 목록 보기</button>
        <button class="secondary-btn" data-go="checkout">퇴장 처리하기</button>
        <button class="secondary-btn" data-go="tv">TV 화면 열기</button>
      </div>
    </section>
  `;

  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setPage(btn.dataset.go);
    });
  });
}

function renderPlaceholder(page) {
  content.innerHTML = `
    <section class="panel">
      <h3>${pages[page].title}</h3>
      <p class="empty-text">이 화면은 다음 단계에서 제작합니다.</p>
    </section>
  `;
}

function setPage(page) {
  pageTitle.textContent = pages[page].title;
  pageDesc.textContent = pages[page].desc;

  menuButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });

  if (page === "dashboard") {
    renderDashboard();
  } else {
    renderPlaceholder(page);
  }
}

menuButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setPage(btn.dataset.page);
  });
});

document.getElementById("quickEntryBtn").addEventListener("click", () => {
  setPage("entry");
});

document.getElementById("refreshBtn").addEventListener("click", () => {
  setPage("dashboard");
});

setPage("dashboard");
