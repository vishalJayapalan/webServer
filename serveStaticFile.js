import fs from 'fs'

const mimeType = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/js',
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png'
}

const createResponse = requestObject => {
  let res = ''
  if (requestObject.method === 'GET') {
    if (requestObject.requestUri === '/') {
      try {
        res +=
          'HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nContent-type: text/html\r\n'
        const body = fs.readFileSync('./index.html', {
          encoding: 'utf-8'
        })
        res += `Content-Length: ${body.length}\r\n\r\n`
        res += body
      } catch (err) {
        res +=
          'HTTP/1.1 404 NOT FOUND\r\nAccess-Control-Allow-Origin: *\r\nContent-type: text/plain\r\n'
        res += 'Content-Length: 9\r\n\r\n'
        res += 'Not Found'
      }
    } else {
      try {
        res += `HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nContent-type: ${
          mimeType[
            requestObject.requestUri.slice(
              requestObject.requestUri.lastIndexOf('.')
            )
          ]
        }\r\n`
        const body = fs.readFileSync(`./${requestObject.requestUri}`, {
          encoding: 'utf-8'
        })
        res += `Content-Length: ${body.length}\r\n\r\n`
        res += body
      } catch (err) {
        if (requestObject.requestUri.endsWith('.html'))
          res +=
            'HTTP/1.1 404 NOT FOUND\r\nAccess-Control-Allow-Origin: *\r\nContent-type: text/plain\r\n'
        res += 'Content-Length: 9\r\n\r\n'
        res += 'Not Found'
      }
    }
  } else {
    res +=
      'HTTP/1.1 405 METHOD NOT ALLOWED\r\nAccess-Control-Allow-Origin: *\r\nContent-type: text/html\r\n'
    const body = fs.readFileSync('./error.html')
    res += `Content-Length: ${body.length}\r\n\r\n`
    res += body
  }
  return res
}

export default createResponse
