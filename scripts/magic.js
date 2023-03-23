
/* 2. Initialize Magic Instance */
const magic = new Magic('pk_live_09EF4F8C09120D83');


/* 3. Implement Render Function */


const render = async () => {
    let html = '';
     /*
      For this tutorial, all we need to worry about is simply the response we get after a successful OTP login flow
     */
    const isLoggedIn = await magic.user.isLoggedIn();

    /* Show login form if user is not logged in */
    html = `
        <p>For security reasons, this login flow does not use passwords.</p>
        <p>Please sign up or login with your email.</p>
        <form onsubmit="handleLogin(event)">
         <input type="email" name="email" required="required" placeholder="Enter your email" />
          <button type="submit">Send</button>
        </form>
      `;

    if (isLoggedIn) {
      /* Get user metadata including email */
      const userMetadata = await magic.user.getMetadata();
      html = `
          <p>Current user: ${userMetadata.email}</p>
          <p>This level of authorization will allow you to view your account in "read only" mode.</p>
          <p>In order to place orders, please click the "Authenticator" button to input your TOTP from Google Authenticator</p>
          <a href="totp.html"><button>Authenticator</button></a>
          <button onclick="handleLogout()">Logout</button>
        `;
    }

    document.getElementById('app').innerHTML = html;
 };


/* 4. Implement Login Handler */
const handleLogin = async (e) => {
    e.preventDefault();
    const email = new FormData(e.target).get('email');
     if (email) {
        /* One-liner login with email OTP 🤯 */
        await magic.auth.loginWithEmailOTP({ email });
        render();
     }
  };


/* 5. Implement Logout Handler */
const handleLogout = async () => {
    await magic.user.logout();
    render();
  };