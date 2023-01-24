const express = require('express')

const app = express()

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });
  const toObject = (map = new Map) => {
    if (!(map instanceof Map)) return map
    return Object.fromEntries(Array.from(map.entries(), ([k, v]) => {
      if (v instanceof Array) {
        return [k, v.map(toObject)]
      } else if (v instanceof Map) {
        return [k, toObject(v)]
      } else {
        return [k, v]
      }
    }))
  }
const server = require('http').Server(app)
const socket = require('socket.io')

const io = socket(server)

app.use(express.json());

const rooms = new Map()
let url = process.env.PORT || 5000

app.get('/rooms', function(req, res){
  console.log('hello')
})

/*app.post('/rooms', function(req, res) {
 if(!rooms.has(req.body.id)){
  rooms.set(
    req.body.id,
    new Map([
      ['users', new Map()],
      ['messages', []]
    ]))
 }
 res.send()
});*/
/*console.log(io.sockets.adapter.rooms)*/
io.on('connection', socket =>{
  socket.on('Validation', (data)=>{
    if(data.user.type === 'host' && rooms.has(data.roomId)){
      socket.emit('Auth', {auth: false, msg: 'Room already exists!'})
    }
    else if(data.user.type === 'guest' && rooms.get(data.roomId).get('users').size >= rooms.get(data.roomId).get('opts').count){
      socket.emit('Auth', {auth: false, msg: 'Room is full!'})
    }
    else if(!data.user.name){
      socket.emit('Auth', {auth: false, msg: 'Name cannot be empty!'})
    }
    else{
      socket.emit('Auth', {auth: true, room: data.roomId})
    }
  })
  socket.on('Room:create', (data)=>{
      rooms.set(
        data.roomId,
        new Map([
          ['users', new Map()],
          ['messages', []],
          ['opts', {
            size: data.opts.size,
            count: data.opts.count,
            type: data.opts.type
          }]
        ]))
      io.emit('Send', toObject(rooms))
  })

  socket.on('Room:delete', (data)=>{
    rooms.delete(data)
    io.emit('Send', toObject(rooms))
  });
  socket.on('Room:join', (data)=>{
    socket.join(data.roomId)
    rooms.get(data.roomId).get('users').set(data.user.id, data.user)
    socket.to(data.roomId).emit('Room:Joined', `client ${data.user.name} connect to chat`);
    io.emit('Send', toObject(rooms))
    })
  socket.on('Get:rooms', ()=>{
  console.log(toObject(rooms))
    io.emit('Send', toObject(rooms))
  })
})
server.listen(url, ()=>{
  console.log(`connected to: ${url}`)
})
