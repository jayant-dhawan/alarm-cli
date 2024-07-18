import {Job} from 'node-schedule';
import scheduler from './scheduler.js';
import {getTimeAndWeekday} from './utils/getTimeAndWeekday.js';
import {addMinutes} from './utils/addMinutes.js';

const SNOOZE_INTERVAL_IN_MINUTES = 3;
const SNOOZE_COUNT = 3;
class Alarm {
	private _snoozeCount = 0;
	private lastSnoozeTime: string | null = null;
	private _inactive: boolean = false;
	constructor(readonly time: string, private _job: Job | null) {}

	get snoozeCount() {
		return this._snoozeCount;
	}

	get job() {
		return this._job;
	}

	get inactive() {
		return this._inactive;
	}

	disableAlarm() {
		this._inactive = true;
	}

	snooze() {
		if (this._snoozeCount < SNOOZE_COUNT) {
			const [hour, minute, weekday] = addMinutes(
				this.lastSnoozeTime || this.time,
				SNOOZE_INTERVAL_IN_MINUTES,
			);
			this._job = scheduler.rescheduleJob(
				this._job!,
				`* ${minute} ${hour} * * ${weekday || '*'}`,
			);
			this.lastSnoozeTime = `${hour}:${minute} ${weekday || ''}`;
			this._snoozeCount++;
		} else {
			this.disableAlarm();
		}
	}
}

class Alarms {
	private static _instance: Alarms;
	private _list: Alarm[] = [];
	private _activeAlarm: Alarm | null = null;
	private _activeAlarmChangeListener: (() => void)[] = [];
	private _activeAlarmTimeOut: NodeJS.Timeout | null = null;
	constructor() {}

	public static getInstance(): Alarms {
		if (!Alarms._instance) {
			Alarms._instance = new Alarms();
		}
		return Alarms._instance;
	}

	private setCurrentAlarm(alarm: Alarm) {
		this._activeAlarm = alarm;
		this._activeAlarmChangeListener.forEach(listener => listener());
		this._activeAlarmTimeOut = setTimeout(() => {
			this._activeAlarm?.disableAlarm();
			this._activeAlarm = null;
			this._activeAlarmChangeListener.forEach(listener => listener());
			if (this._activeAlarmTimeOut) {
				clearTimeout(this._activeAlarmTimeOut);
				this._activeAlarmTimeOut = null;
			}
		}, 1000 * 60);
	}

	private clearCurrentAlarm() {
		this._activeAlarm = null;
		if (this._activeAlarmTimeOut) {
			clearTimeout(this._activeAlarmTimeOut);
			this._activeAlarmTimeOut = null;
		}
		this._activeAlarmChangeListener.forEach(listener => listener());
	}

	get list() {
		return this._list;
	}

	getActiveAlarm() {
		return this._activeAlarm;
	}

	deleteAlarm(index: number) {
		const alarm = this._list[index];
		alarm?.job?.cancel();
		this._list.splice(index, 1);
	}

	setAlarm(time: string) {
		if (this._list.find(alarm => alarm.time === time)) {
			return;
		}
		const [hour, minute, weekday] = getTimeAndWeekday(time);
		const job = scheduler.scheduleJob(
			`* ${minute} ${hour} * * ${weekday || '*'}`,
			() => {
				const activeAlarm =
					this._list.find(alarm => alarm.time === time) || null;
				activeAlarm && this.setCurrentAlarm(activeAlarm);
			},
		);
		this._list.push(new Alarm(time, job));
	}

	snoozeAlarm() {
		const alarm = this._activeAlarm;
		if (alarm) {
			alarm?.snooze();
			this.clearCurrentAlarm();
		}
	}

	clearAllAlarms() {
		this._list = [];
	}

	addAlarmListener(listener: () => void) {
		this._activeAlarmChangeListener.push(listener);
	}

	removeAlarmListener(listener: () => void) {
		const index = this._activeAlarmChangeListener.indexOf(listener);
		if (index !== -1) {
			this._activeAlarmChangeListener.splice(index, 1);
		}
	}
}

export {SNOOZE_COUNT};
export default Alarms.getInstance();
