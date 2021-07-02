import axios from "axios";

(async () => {
  for (let i = 0; i < 20; i++) {
    console.time("version");

    await axios({
      method: "GET",
      url: "https://brk.werbefix.de/cp-fer-175/version.xml",
      timeout: 300000,
    });

    console.timeEnd("version");
  }
})();
