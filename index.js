import net from 'net'

const server = net.createServer()

server.on('connection', socket => {
  const remoteAddress = `${socket.remoteAddress} : ${socket.remotePort}`
  console.log('New Client connected on ', remoteAddress)

  socket.on('data', data => {
    console.log(data + 'received from client')
    socket.write(`Server Reply : ${data}`)
  })

  socket.on('end', () => {
    console.log('Connection closed')
  })
  socket.once('close', () => {
    console.log(`Connection from ${remoteAddress} closed`)
  })

  socket.on('error', err => {
    console.log(`Some error occured: ${err.message}`)
  })
})

server.listen(8080, () => {
  console.log('server is running on port 8080')
})
