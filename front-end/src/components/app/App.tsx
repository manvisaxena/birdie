import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Title from '@App/components/Title';
import Logo from '@App/components/Logo';
import DetailsTable from '@App/components/detailsTable/detailsTable';

const LogoUrl = require('../../assets/images/logo-birdie.svg');

interface AppProps {

}

interface AppState {

}

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    background-color: #F9F9F9;
    > div {
      height: 100%;
    }
  }
`;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: left;
`;

class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
  }

  public render() {
    return (
      <>
        <GlobalStyle />
        <Logo src={LogoUrl} />
        <Title>Welcome to the birdie</Title>
        <AppContainer>
          <DetailsTable/>
        </AppContainer>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {};

export default connect(mapStateToProps, mapDispatchToProps)(App);