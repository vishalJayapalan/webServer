import net from 'net'

import requestParser from './requestParser.js'
import response from './response.js'

const server = net.createServer()

server.on('connection', socket => {
  const remoteAddress = `${socket.remoteAddress} : ${socket.remotePort}`
  console.log('New Client connected on ', remoteAddress)

  socket.on('data', data => {
    const requestObject = requestParser(data)

    const res = response(requestObject)
    console.log(res)
    socket.write(res)
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
