function NotConnected({children}) {
    return (
      <div className="container NotConnected">
        <div class="row">
          <div class="col">
            <header className="NotConnected-header">
              {/* <img src={logo} className="NotConnected-logo" alt="logo" /> */}
              <h1>Groupomania</h1>
            </header>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-4 offset-md-4">
            <section className="NotConnected-form-container">
              {children}
            </section>
          </div>
        </div>
      </div>
    );
  }
  
  export default NotConnected;
  