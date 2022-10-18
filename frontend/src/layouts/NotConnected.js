//import logo from '../../public/icon-above-font.png';

function NotConnected({children}) {
    return (
      <div className="container NotConnected">
        <div className="row">
          <div className="col">
            <header className="NotConnected-header text-center">
              <img style={{width:'250px', margin: '25px'}} src='/icon-left-font.png' className="NotConnected-logo" alt="logo" />
            </header>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <section className="NotConnected-form-container">
              {children}
            </section>
          </div>
        </div>
      </div>
    );
  }
  
  export default NotConnected;
  