import domready from 'domready';

import ElementValidation from '../helpers/element-validation';

class OverpassComponent {

    constructor( ...options ) {
        Object.assign( this, ...options );
        domready( this.test.call( this ) );
    }

    test() {
        const initialize = ElementValidation( this.el ) ? true : false,
            element = document.querySelector( this.el );
        if ( initialize ) this.init();
    }

}

export default OverpassComponent;
