import { getWinInstalledApps } from "./dist/index.js";

getWinInstalledApps().then((apps) => {
  console.log(apps);
});
