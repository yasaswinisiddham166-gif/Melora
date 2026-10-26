/* ==============================
   CHECK LOGIN
============================== */

function checkLogin() {

    const user = localStorage.getItem("meloraUser");

    if (!user) {
        window.location.href = "login.html";
    }
}


/* ==============================
   LOGOUT
============================== */

function logoutUser() {

    localStorage.removeItem("meloraUser");

    window.location.href = "login.html";
}