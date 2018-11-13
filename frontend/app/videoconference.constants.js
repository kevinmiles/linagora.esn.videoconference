(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .constant('VIDEOCONFERENCE_EVENTS', {
      INCOMING_CALL: 'call:incoming',
      ACCEPTED_CALL: 'call:accepted'
    })
    .constant('VIDEOCONFERENCE_WEBSOCKET', {
      NAMESPACE: '/videoconference'
    })
    .constant('VIDEOCONFERENCE_MODULE_METADATA', {
      id: 'linagora.esn.videoconference',
      title: 'Video Conference',
      icon: '/videoconference/images/videoconference.svg',
      config: {
        template: 'videoconference-config-form',
        displayIn: {
          user: false,
          domain: true,
          platform: false
        }
      }
    });

})(angular);
