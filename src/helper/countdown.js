//Handler for countdown
const countdown = (el, start, finish, cb, interval) => {
   // el => element to print result
   // to => UNIX time target
   // cb => callback if countdown finish
   // interval => setInterval block
   const now = new Date().getTime()
   const distance = finish - now
   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   const seconds = Math.floor((distance % (1000 * 60)) / 1000);
   //Print
   //console.log(start, finish)
   if ( now >= start && now < finish ) el.value = `${hours}j ${minutes}m ${seconds}s`
   if ( days === 0 && hours === 0 && minutes === 0 && seconds === 0 ) {
      clearInterval(interval)
      cb()
   }
}  

export default countdown
