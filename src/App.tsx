import { useState, useEffect } from "react";
import { IconLogin, utils } from "./components/IconLogin";
import "./App.css";
import IconLogo from "./icon-logo.png";

// Make sure LOCAL_KEY is a unique string
const LOCAL_KEY = "_UNIQUE_KEY_";

function App() {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [localData, setLocalData] = useState(utils.getInitLocalData());
  //  localData: {
  //    auth: {
  //      selectedWallet: 'hx93940...',
  //      methodUsed: 'ICONEX' | 'LEDGER1',
  //      successfulLogin: bool
  //    }
  // }

  function toggleLogin() {
    // toggles between login and logout
    if (localData.auth.successfulLogin) {
      handleLogout();
    } else {
      handleLogin();
    }
  }

  function handleLogin() {
    // login with ICON
    setLoginModalIsOpen(true);
  }

  function handleLogout() {
    // close user session
    handleLocalDataChange(utils.getInitLocalData());
  }

  function handleLocalDataChange(newLocalData) {
    //
    setLocalData(newLocalData);

    // write login data locally to make user session persistance
    utils.saveDataToLocal(newLocalData, LOCAL_KEY);
  }

  function closeLoginModal() {
    // this function handles the closing of the LoginModal
    // dataFromModal is the login data passed from the component
    // to the parent after the login process
    setLoginModalIsOpen(false);
  }

  function getDataFromLoginModal(loginData) {
    // Callback function that gets called from within LoginModal
    // to pass login data into parent
    const newLocalData = {
      auth: loginData
    };

    handleLocalDataChange(newLocalData);
  }

  useEffect(() => {
    // get local login data on first render
    const userLocalData = utils.getLocalData(LOCAL_KEY);

    // set loginData state
    handleLocalDataChange(userLocalData);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={IconLogo} className="App-logo" alt="icon logo" />
        <h2>Login with ICON</h2>
        <button className="App-button-login" onClick={toggleLogin}>
          {localData.auth.successfulLogin ? <p>Log out</p> : <p>Log in</p>}
        </button>
        <IconLogin
          isOpen={loginModalIsOpen}
          onRequestClose={closeLoginModal}
          onRetrieveData={getDataFromLoginModal}
        />
        <p>Login data: {JSON.stringify(localData)}</p>
      </header>
    </div>
  );
}

export default App;
