import * as React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Container, Navbar, NavbarBrand } from 'reactstrap';

import './App.scss';
import Create from './Create';
import DisplaySecret from './DisplaySecret';
import Download from './Download';
import Features from './Features';
import Upload from './Upload';

import { useTranslation } from 'react-i18next';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Navbar color="dark" dark={true} expand="md">
          <NavbarBrand href="/">
            Yopass <img width="40" height="40" alt="" src="yopass.svg" />
          </NavbarBrand>
	  <LangButtons />
        </Navbar>
        <Container className="margin">
          <Routes />
        </Container>
        <Features />
        <Attribution />
      </Router>
    );
  }
}

function LangButtons() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('de')}>de</button>
      <button onClick={() => changeLanguage('en')}>en</button>
    </div>
  );
}


const Routes = () => {
  return (
    <div>
      <Route path="/" exact={true} component={Create} />
      <Route path="/upload" exact={true} component={Upload} />
      <Route exact={true} path="/s/:key/:password" component={DisplaySecret} />
      <Route exact={true} path="/s/:key" component={DisplaySecret} />
      <Route exact={true} path="/f/:key/:password" component={Download} />
      <Route exact={true} path="/f/:key" component={Download} />
    </div>
  );
};

const Attribution = () => {
const { t } = useTranslation();
  return (
    <Container className="text-center">
      <div className="text-muted small footer">
        {t("Created by")} <a href="https://github.com/jhaals/yopass">Johan Haals</a>
      </div>
    </Container>
  );
};
export default App;
