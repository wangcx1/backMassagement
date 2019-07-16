import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Admin from './admin';
import Login from './pages/login';
import Buttons from './pages/ui/button';
import NoMacth from './pages/nomatch';
import Modals from './pages/ui/modal'
import Loadings from './pages/ui/loading';
import Notice from './pages/ui/notification';
import Messages from './pages/ui/message';
import Tabts from './pages/ui/tab';
import Gallerys from './pages/ui/gallery'
import Carousels from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import FormRegister from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';
import City from './pages/city';
import Order from './pages/order';
import Common from './common';
import OrderDetail from './pages/order/order';
import User from './pages/user';
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import Rich from './pages/rich';
// import PerimmsionUser from './pages/permission';
import PermissionUser from './pages/permission';
export default class Routers extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                   <Switch>
                   <Route path="/common" render={() =>
                        <Common>
                            <Switch>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route>
                            </Switch>
                        </Common>
                    } />
                    <Route path='/' render={() =>
                        <Admin>
                            <Switch>
                                <Route path='/ui/buttons' component={Buttons} />
                                <Route path='/ui/modals' component={Modals} />
                                <Route path='/ui/loadings' component={Loadings} />
                                <Route path='/ui/notification' component={Notice} />
                                <Route path='/ui/messages' component={Messages} />
                                <Route path='/ui/tabs' component={Tabts} />
                                <Route path='/ui/gallery' component={Gallerys} />
                                <Route path='/ui/carousel' component={Carousels} />
                                <Route path='/form/login' component={FormLogin} />
                                <Route path='/form/reg' component={FormRegister} />
                                <Route path='/table/basic' component={BasicTable} />
                                <Route path='/table/high' component={HighTable} />
                                <Route path='/city' component={City} />
                                <Route path='/order' component={Order} />
                                <Route path='/user' component={User} />
                                <Route path='/bikeMap' component={BikeMap} />
                                <Route path='/charts/bar' component={Bar} />
                                <Route path='/charts/pie' component={Pie} />
                                <Route path='/charts/line' component={Line} />
                                <Route path='/rich' component={Rich} />
                                <Route path='/permission' component={PermissionUser} />
                                <Route component={NoMacth} />
                            </Switch>
                        </Admin>
                    } />
                   </Switch>

                </App>
            </HashRouter>
        )
    }
}