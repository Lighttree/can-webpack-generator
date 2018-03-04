// Polyfills
import 'core-js/es6/promise';

// Application dependencies
import Component from 'can-component';
import DefineMap from 'can-define/map/map';
import stache from 'can-stache';
import 'can-route-pushstate';
import view from './app.stache';
import './app.scss';

const AppViewModel = DefineMap.extend({
    greeting: { default: 'Hello' },
    subject: { default: 'World' }
});

Component.extend({
    tag: '<%= name %>',
    view: stache(view),
    ViewModel: AppViewModel
});

export default AppViewModel;
