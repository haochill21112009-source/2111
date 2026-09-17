const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const audioFile = document.getElementById("audioFile");

const lyric = document.getElementById("lyric");
const nextLyric = document.getElementById("nextLyric");

const bar = document.getElementById("bar");
const time = document.getElementById("time");


/*
  ================================
  LỜI + THỜI GIAN
  ================================

  start = thời điểm câu bắt đầu.

  Ví dụ:
  0 giây    -> câu 1
  4 giây    -> câu 2
  8 giây    -> câu 3

  Hãy thay bằng lời bạn có quyền sử dụng.
*/

const lyrics = [

  {
    start: 0,
    text: "Họ nói thượng đế nếu lấy gì đó"
  },

  {
    start: 2,
    text: "Sẽ ban xuống một thứ khác"
  },

  {
    start: 3,
    text: "Lấy ánh sáng con đường anh chọn"
  },

  {
    start: 4,
    text: "Anh phải tự mò mẫm bao đêm dài"
  },

  {
    start: 6,
    text: "Ông lấy của anh kiên nhẫn"
  },

  {
    start: 7,
    text: "Chỉ ban cho anh tính tình cứng nhắc"
  },

  {
    start: 9,
    text: "Anh nghĩ khi nắm được tay của em"
  },
 
  {
    start: 11,
    text: "Thì anh sẽ cảm ơn ngài"
  },
  
  {
    start: 12,
    text: "Vì anh từng nghĩ điều này xa xôi"
  },
 
  {
    start: 14,
    text: "Đâu đó ngoài dãy ngân hà"
  },
   
  {
    start: 15,
    text: "Em làm anh muốn cho đi"
  },
   
  {
    start: 16,
    text: "Rồi ta sẽ là 1 phần của nhau"
  },

   {
    start: 18,
    text: "Khao khát nhiều hơn khả năng"
  },
   
  {
    start: 19,
    text: "Khó để hài lòng ngay cả khi già"
  },

  {
    start: 20,
    text: "Nhưng nếu đây là định mệnh"
  },

  {
    start: 22,
    text: "Thì những thứ khác chẳng cần nữa đâu"
  },  

  {
    start: 23,
    text: "Mãi lạc trong vòng luẩn quẩn"
  },

  {
    start: 24,
    text: "Trong việc lựa chọn giữa được và không"
  },

  {
    start: 26,
    text: "và con tim mệt mỏi chẳng thể cảm nhận"
  },
   
  {
    start: 28,
    text: "Ngủ quên cả một mùa đông"
  },

  {
    start: 29,
    text: "Những dòng dữ kiện sẽ được mã hóa"
  },

  {
    start: 30,
    text: "Hiện nguyên thành 1 và 0"
  },
  
  {
    start: 31,
    text: "Anh sợ mình đang bị thao túng"
  },
  
  {
    start: 32,
    text: "Trong bể Scandal và acc clone"
  },

   {
    start: 33,
    text: "_thnqy"
  },

];


function formatTime(seconds) {

  if (!Number.isFinite(seconds)) {
    return "00:00";
  }

  seconds = Math.floor(seconds);

  const minutes = Math.floor(seconds / 60);

  const secs = seconds % 60;

  return (
    String(minutes).padStart(2, "0")
    + ":" +
    String(secs).padStart(2, "0")
  );

}


/* Chọn nhạc */

audioFile.addEventListener("change", function () {

  const file = this.files[0];

  if (!file) return;

  audio.src = URL.createObjectURL(file);

  audio.load();

  lyric.textContent = "SẴN SÀNG";
  nextLyric.textContent = "Bấm PLAY";

});


/* PLAY / PAUSE */

playBtn.addEventListener("click", async function () {

  if (!audio.src) {

    alert("Hãy chọn file nhạc trước!");

    return;

  }

  if (audio.paused) {

    await audio.play();

    playBtn.textContent = "❚❚ PAUSE";

  } else {

    audio.pause();

    playBtn.textContent = "▶ PLAY";

  }

});


/* Cập nhật lyric */

function updateLyric() {

  const currentTime = audio.currentTime;

  let current = -1;


  for (let i = 0; i < lyrics.length; i++) {

    if (currentTime >= lyrics[i].start) {

      current = i;

    } else {

      break;

    }

  }


  if (current === -1) {

    lyric.textContent = "Bấm PLAY để bắt đầu";

    nextLyric.textContent = "";

    return;

  }


  if (lyric.dataset.current !== String(current)) {

    lyric.dataset.current = String(current);

    lyric.classList.remove("show");

    void lyric.offsetWidth;

    lyric.classList.add("show");

  }


  lyric.textContent = lyrics[current].text;


  if (lyrics[current + 1]) {

    nextLyric.textContent = lyrics[current + 1].text;

  } else {

    nextLyric.textContent = "";

  }

}


/* Thời gian + thanh chạy */

audio.addEventListener("timeupdate", function () {

  updateLyric();


  const percent =
    (audio.currentTime / audio.duration) * 100;


  bar.style.width = percent + "%";


  time.textContent =
    formatTime(audio.currentTime)
    + " / "
    + formatTime(audio.duration);

});


/* Khi hết nhạc */

audio.addEventListener("ended", function () {

  playBtn.textContent = "▶ PLAY";

  bar.style.width = "100%";

});


/* Phím Space để play */

document.addEventListener("keydown", function (event) {

  if (event.code === "Space") {

    event.preventDefault();

    playBtn.click();

  }

});