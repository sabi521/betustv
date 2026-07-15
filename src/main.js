import "./style.css";
import { renderHome, initHome } from "./sections.js";

// Header and footer are shared/global (handled by the backend), so the home
// page renders only its own content here.
document.querySelector("#app").innerHTML = renderHome();
initHome();
