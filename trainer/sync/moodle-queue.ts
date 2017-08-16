const locks = require('locks');
class QueueJob{
    action:String;
    args;
    done;

    constructor(action, args, done?){
        this.action = action;
        this.args = args;
        this.done = done || function(){};

    }
}

export class MoodleQueue {
    ajax: Function;
    jobs: QueueJob[];
    running;

    constructor(ajax){
        this.ajax = ajax;
        this.running = locks.createMutex();
        this.jobs = [];
    }

    addJob(action, args, done?){
        const job = new QueueJob(action, args, done || null);
        this.jobs.push(job);
        this.run();
    }


    run(){
        const queue = this;
        queue.running.lock(function(){
            if(queue.jobs.length>0){
                const job = queue.jobs.pop();
                const promise = queue.ajax.call([{
                    methodname: job.action,
                    args:job.args
                }]);

                promise[0].always(function(){
                    queue.running.unlock();
                }).done(function(r){
                    job.done(r);
                });
            }
            else{
                queue.running.unlock();
            }

        });
    }

}