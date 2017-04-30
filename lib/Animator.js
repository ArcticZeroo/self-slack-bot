function Animator(frames, frameCallback, timeInterval = 10000) {
    // Private variables
    let interval = null;

    // Public variables
    this.position = 0;
    this.frames = frames;

    this.next = async ()=>{
        await frameCallback(this.frames[this.position]);

        this.position++;

        if(this.position >= this.frames.length){
            this.position = 0;
        }
    };

    this.start = function () {
        this.position = 0;

        if(interval){
            clearInterval(interval);
        }

        interval = setInterval(()=>{ this.next().catch(()=>{}) }, timeInterval);
    };

    this.stop = function () {
        clearInterval(interval);

        interval = null;
    };
}

module.exports = Animator;