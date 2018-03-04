import DefineMap from 'can-define/map/map';
import view from './app.stache';

const AppViewModel = DefineMap.extend({
    message: {
        value: 'Hello World!',
        serialize: false
    },
    title: {
        value: '<%= name %>',
        serialize: false
    }
});

const appVM = new AppViewModel({});

document.body.appendChild(view(appVM));
