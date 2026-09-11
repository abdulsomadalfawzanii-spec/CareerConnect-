import React from 'react';

function LoginPage() {
  return (
    <section className="login-template">
      <aside className="login-visual">
        <div className="login-brand">CareerConnect</div>

        <div className="login-image-panel">
          <div className="image-scrim"></div>
          <div className="login-visual-text">
            <div className="login-vertical-line"></div>
            <div>
              <h2>Welcome<br />Back</h2>
              <p>Glad to see you again.<br />Let’s continue where you left off.</p>
            </div>
          </div>

          <div className="login-visual-footer">
            <span>@ 2026 CareerConnect. All rights reserved.</span>
          </div>
        </div>
      </aside>

      <main className="login-card-wrap">
        <section className="login-card">
          <div className="login-icon">
            <span className="login-icon-inner">✦</span>
          </div>

          <h1>Login</h1>
          <p className="login-subtitle">Login to your account to continue</p>

          <form className="login-form">
            <div className="form-field">
              <label>Email Address</label>
              <div className="input-with-icon">
                <span className="mail-icon">✉</span>
                <input type="email" placeholder="you@example.com" />
              </div>
            </div>

            <div className="form-field">
              <label>Password</label>
              <div className="input-with-icon password-icon-row">
                <span className="lock-icon">♟</span>
                <input type="password" placeholder="••••••••" />
                <span className="eye-icon">◉</span>
              </div>
            </div>

            <div className="forgot-row">
              <a href="#">Forgot Password?</a>
            </div>

            <button className="login-button">
              <span>Login</span>
              <span className="button-arrow">→</span>
            </button>
          </form>

          <div className="divider"><span>or continue with</span></div>

          <div className="social-grid">
            <button className="social-button google">G</button>
            <button className="social-button apple"></button>
            <button className="social-button x">✕</button>
          </div>

          <div className="signup-row">
            <span>Don’t have an account?</span>
            <a href="#">Sign up</a>
          </div>

          <div className="security-row">
            <span>♞</span>
            <span>Your data is secure with us</span>
          </div>
        </section>
      </main>
    </section>
  );
}

export default LoginPage;
