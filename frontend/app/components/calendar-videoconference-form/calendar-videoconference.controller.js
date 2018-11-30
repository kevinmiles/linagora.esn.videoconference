(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
         .controller('calendarVideoconferenceFormController', calendarVideoconferenceFormController);

  function calendarVideoconferenceFormController(uuid4, VideoConfConfigurationService, EVENT_VIDEOCONFERENCE_OPTIONS) {
    var self = this;

    self.videoconferenceOptions = EVENT_VIDEOCONFERENCE_OPTIONS;
    self.videoConfHostname = undefined;
    self._videoconference = EVENT_VIDEOCONFERENCE_OPTIONS.NO_VIDEOCONFERENCE;
    self._roomName = undefined;

    self.$onInit = $onInit;
    self.isVideoConfHostnameValid = isVideoConfHostnameValid;
    self.roomName = roomName;
    self.videoconference = videoconference;

    function $onInit() {
      return VideoConfConfigurationService.getJitsiInstanceUrl().then(function(jitsiInstanceUrl) {
        self.videoConfHostname = jitsiInstanceUrl;

        if (self.event.xOpenpaasVideoconference && self.event.xOpenpaasVideoconference.trim().length > 0) {
          self._videoconference = EVENT_VIDEOCONFERENCE_OPTIONS.OPENPAAS_VIDEOCONFERENCE;
          self.roomName(new URL(self.event.xOpenpaasVideoconference).pathname.slice(1));
        } else {
          self.roomName(uuid4.generate());
        }
      });
    }

    function isVideoConfHostnameValid() {
      return self.videoConfHostname && self.videoConfHostname.trim().length > 0;
    }

    function roomName(value) {
      if (!arguments.length) {
        return self._roomName;
      }

      self._roomName = value;
      self.event.xOpenpaasVideoconference = _fullPath();
    }

    function videoconference(value) {
      if (!arguments.length) {
        return self._videoconference;
      }

      self._videoconference = value;
      self.event.xOpenpaasVideoconference = _fullPath();
    }

    function _fullPath() {
      return (self.isVideoConfHostnameValid() &&
        self._videoconference !== EVENT_VIDEOCONFERENCE_OPTIONS.NO_VIDEOCONFERENCE) ?
        self.videoConfHostname + self._roomName : undefined;
    }
  }
})(angular);
