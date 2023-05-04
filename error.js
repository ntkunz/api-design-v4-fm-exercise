setTimeout(() => {
   throw new Error('Error from setTimeout')
}, 1000)

//process to catch errors in node outside of express... 
//"if something breaks outside of express, we can catch it here"
//this is a global error handler
//put at top of index file or server file

process.on('uncaughtException', (err) => {
   console.log('Error from uncaughtException')
   console.log(err)
})

process.on('unhandledRejection', (err) => {
   console.log('Error from unhandledRejection')
   console.log(err)
})