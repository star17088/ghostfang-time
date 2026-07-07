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
  const pageData = pages[page];

  pageTitle.textContent = pageData.title;
  pageDesc.textContent = pageData.desc;

  menuButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });

  if (page === "dashboard") {
    renderDashboard();
  } else if (page === "entry") {
    renderEntryForm();
  } else {
    renderPlaceholder(page);
  }
}

function renderEntryForm() {
  content.innerHTML = `
    <section class="panel">
      <div class="panel-header">
        <h2>입장 등록</h2>
        <p>팔찌 시간권 이용자를 등록합니다.</p>
      </div>

      <form class="entry-form" id="entryForm">
        <div class="form-grid">
          <div class="form-group">
            <label>팀 이름 *</label>
            <input type="text" id="teamName" placeholder="예: 김하나팀" required />
          </div>

          <div class="form-group">
            <label>휴대폰번호 *</label>
            <input type="tel" id="phone" placeholder="01012345678" required />
          </div>

          <div class="form-group">
            <label>인원수 *</label>
            <input type="number" id="people" min="1" placeholder="예: 3" required />
          </div>

          <div class="form-group">
            <label>팔찌번호 *</label>
            <input type="text" id="braceletNo" placeholder="팔찌 스캔 또는 입력" required autofocus />
          </div>

          <div class="form-group">
            <label>이용권 *</label>
            <select id="ticketMinutes" required>
              <option value="60">1시간권</option>
              <option value="120">2시간권</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="primary-btn">입장 등록</button>
          <button type="reset" class="secondary-btn">초기화</button>
        </div>
      </form>
    </section>
  `;

  const entryForm = document.getElementById("entryForm");

  entryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      teamName: document.getElementById("teamName").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      people: Number(document.getElementById("people").value),
      braceletNo: document.getElementById("braceletNo").value.trim(),
      ticketMinutes: Number(document.getElementById("ticketMinutes").value),
    };

    if (!data.teamName || !data.phone || !data.people || !data.braceletNo) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    console.log("입장 등록 데이터:", data);
    alert("입장 등록 화면 테스트 완료! 다음 단계에서 Firebase 저장을 연결합니다.");
  });
}

menuButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setPage(btn.dataset.page);
  });
});

const quickEntryBtn = document.getElementById("quickEntryBtn");
const refreshBtn = document.getElementById("refreshBtn");

if (quickEntryBtn) {
  quickEntryBtn.addEventListener("click", () => {
    setPage("entry");
  });
}

if (refreshBtn) {
  refreshBtn.addEventListener("click", () => {
    setPage("dashboard");
  });
}

setPage("dashboard");
