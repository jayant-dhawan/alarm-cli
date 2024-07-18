import schedule, {Job} from 'node-schedule';

class Scheduler {
	private static _instance: Scheduler;
	constructor() {}

	public static getInstance(): Scheduler {
		if (!Scheduler._instance) {
			Scheduler._instance = new Scheduler();
		}
		return Scheduler._instance;
	}

	scheduleJob(time: string, callback: () => void) {
		return schedule.scheduleJob(time, callback);
	}

	rescheduleJob(job: Job, time: string) {
		return schedule.rescheduleJob(job, time);
	}

  getAllJobs() {  
    return schedule.scheduledJobs;
  }

	cancelJob(job: Job) {
		return schedule.cancelJob(job);
	}

	async cancelAllJobs() {
		return schedule.gracefulShutdown();
	}
}

export default Scheduler.getInstance();
