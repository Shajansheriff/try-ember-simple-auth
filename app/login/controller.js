import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
    session: service('session'),
    ajax: service('ajax'),
    actions: {
        authenticate() {
            let { username, password } = this.getProperties('username', 'password');
            this.get('session').authenticate('authenticator:oauth2', username, password).catch((reason) => {
                this.set('errorMessage', reason.error || reason);
            });
        }
    }
});
