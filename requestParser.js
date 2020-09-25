const requestParser = data => {
  const requestObject = {}
  const request = data.toString().split(/\r\n/)
  // console.log(request)
  const requestLine = request[0]

  const [method, requestUri, version] = requestLine.split(' ')
  requestObject.method = method
  requestObject.requestUri = requestUri.split('?')[0]
  const queryString = requestUri.split('?')[1]
  if (queryString) {
    const queryParamsArray = queryString.split('&')
    const queryParams = {}
    for (const query of queryParamsArray) {
      const [key, value] = query.split('=')
      queryParams[key] = value
    }
    requestObject.queryParams = queryParams
  }

  requestObject.version = version

  const headers = {}
  for (let i = 1; i < request.length - 2; i++) {
    const [headerType, headerValue] = request[i].split(': ')
    headers[headerType] = headerValue
  }
  // console.log('Headers', headers)
  requestObject.headers = headers
  request.body = request[request.length - 1]
  return requestObject
}

export default requestParser
