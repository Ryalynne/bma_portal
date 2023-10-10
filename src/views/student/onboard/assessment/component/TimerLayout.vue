<template>
    <div>
        <span class="fw-bolder text-muted h4">EXAM TIMER: </span>
        <span class="fw-bolder text-info h4">{{ remainingTime }}</span>
    </div>
</template>
<script>
export default {
    name: 'TimerComponent',
    props: {
        startingTime: String,
        finishFunction: Function
    },
    data() {
        const duration = 60 * 60 * 1000
        const startTime = new Date(this.startingTime)
        const baseStartTime = startTime.getTime()
        const baseEndTime = new Date(baseStartTime + duration)
        return {
            // eslint-disable-next-line vue/no-computed-properties-in-data
            currentExamTime: this.startingTime ? new Date(this.startingTime).getTime() : this.currentTime(),
            endTime: baseEndTime,
            remainingTime: this.formattedTime(baseEndTime)
        }
    },
    mounted() {
        this.updateTime(this.endTime)
    },
    beforeUnmount() {
        clearInterval(this.timerInterval) // Clear the interval when the component is destroyed
    },
    methods: {
        updateRemainingTime() {
            this.currentExamTime = this.startingTime ? new Date(this.startingTime).getTime() : this.currentTime()
        },
        updateTime(endTime) {
            setInterval(() => {
                this.remainingTime = this.formattedTime(endTime)
            }, 1000) // Update every second
        },
        formattedTime(endTime) {
            const now = new Date().getTime() // Get the Current Time
            const distance = endTime.getTime() - now
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            let seconds = Math.floor((distance % (1000 * 60)) / 1000)
            if (hours < '10') {
                hours = '0' + hours
            }
            if (minutes < '10') {
                minutes = '0' + minutes
            }
            if (seconds < '10') {
                seconds = '0' + seconds
            }
            if (distance < 0) {
                this.finishFunction()
            }
            return hours + ':' + minutes + ':' + seconds
            /* document.getElementsByClassName("count-down").innerHTML = hours + "h " +
                minutes + "m " + seconds + "s "; */

            /*  // If the count down is finished, write some text
             if (distance < 0) {
                 clearInterval(interVal);
                 $('.count-down').text('EXPIRED')
                 //document.getElementsByClassName("count-down").innerHTML = "EXPIRED";
                 SubmitFunction()
             } */
        }
    }
}
</script>