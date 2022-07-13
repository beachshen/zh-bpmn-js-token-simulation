import {
  domify,
  classes as domClasses,
  event as domEvent
} from 'min-dom';

import {
  TOGGLE_MODE_EVENT,
  RESET_SIMULATION_EVENT,
  SCOPE_CREATE_EVENT
} from '../../util/EventHelper';

import {
  ResetIcon
} from '../../icons';


export default function ResetSimulation(eventBus, tokenSimulationPalette, notifications) {
  this._eventBus = eventBus;
  this._tokenSimulationPalette = tokenSimulationPalette;
  this._notifications = notifications;

  this._init();

  eventBus.on(SCOPE_CREATE_EVENT, () => {
    domClasses(this._paletteEntry).remove('disabled');
  });

  eventBus.on(TOGGLE_MODE_EVENT, (event) => {
    const active = this._active = event.active;

    if (!active) {
      this.resetSimulation();
    }
  });
}

ResetSimulation.prototype._init = function() {
  this._paletteEntry = domify(`
    <div class="bts-entry disabled" title="重置模拟">
      ${ ResetIcon() }
    </div>
  `);

  domEvent.bind(this._paletteEntry, 'click', () => {
    this.resetSimulation();

    this._notifications.showNotification({
      text: '重置模拟',
      type: 'info'
    });
  });

  this._tokenSimulationPalette.addEntry(this._paletteEntry, 2);
};

ResetSimulation.prototype.resetSimulation = function() {
  domClasses(this._paletteEntry).add('disabled');

  this._eventBus.fire(RESET_SIMULATION_EVENT);
};

ResetSimulation.$inject = [
  'eventBus',
  'tokenSimulationPalette',
  'notifications'
];