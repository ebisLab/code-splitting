import React, { Component, Suspense } from 'react';
import './App.css';

import Page1 from './Components/Page1';
import AsyncComponent from './AsyncComponent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'page1',
      component: null
    }
  }
  onRouteChange = (route) => {
    // Part 1 - No Code Splitting
    // this.setState({ route: route });
    // Part 2 - Code Splitting - manual
    if (route === 'page1') {
      this.setState({ route: route })
    } else if (route === 'page2') {
      const OtherComponent = React.lazy(()=> import('./Components/Page2'))

    } 
    //else {
    //   import('./Components/Page3')
    //     .then((Page3) => {
    //       this.setState({ route: route, component: Page3.default })
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     });
    // }
  }
  render() {
    // Part 1 - No code splitting
    // if (this.state.route === 'page1') {
    //   return <Page1 onRouteChange={this.onRouteChange} />
    // } else if (this.state.route === 'page2') {
    //   return <Page2 onRouteChange={this.onRouteChange} />
    // } else {
    //   return <Page3 onRouteChange={this.onRouteChange} />
    // }

    // Part 2 - No Code Splitting - manual
    // if (this.state.route === 'page1') {
    //   return <Page1 onRouteChange={this.onRouteChange} />
    // } else {
    //   return <this.state.component onRouteChange={this.onRouteChange} />
    // }

    // Part 3 - Cleaner Code Splitting
    if (this.state.route === 'page1') {
      return <Page1 onRouteChange={this.onRouteChange} />
    } else if (this.state.route === 'page2') {
      return (<Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>)
    } else {
      const AsyncPage3 = AsyncComponent(() => import("./Components/Page3"));
      return <AsyncPage3 onRouteChange={this.onRouteChange} />
    }

  }
}

export default App;
