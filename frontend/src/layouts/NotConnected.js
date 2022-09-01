function NotConnected({children}) {
    return (
      <div className="NotConnected">
        <header className="NotConnected-header">
          {/* <img src={logo} className="NotConnected-logo" alt="logo" /> */}
          <h1>Groupomania</h1>
        </header>
        <section className="NotConnected-form-container">
          {children}
        </section>
      </div>
    );
  }
  
  export default NotConnected;
  