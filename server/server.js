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
const server = require('http').createServer(app)
const socket = require('socket.io');

const io = socket(server)

app.use(express.json());
app.use(express.urlencoded({extended: true}))
const rooms = new Map()
let url = process.env.PORT || 5000

app.get('/rooms/:id', function(req, res){
  const roomId = req.params.id
  const obj = rooms.has(roomId) ? {
    users: [...rooms.get(roomId).get('users').values()],
    messages: [...rooms.get(roomId).get('messages').values()] } : {users: [], messages: []}
  res.json(obj)
})


/*axios.get(`http://localhost:5000/rooms/${data.roomId}`).then(function (res) {
              changer(SetUsers(res.data.users))
            })

app.post('/rooms', function(req, res) {
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

  socket.on('Room:Leave', (data)=>{
    if(rooms.get(data).get('users').get(socket.id).type === 'host'){
      if(rooms.delete(data)){
        io.to(data).emit('Leaving', true)
        io.emit('Send', toObject(rooms))
        io.socketsLeave(data);
      }
    }
    else{
    if(rooms.get(data).get('users').delete(socket.id)){
    socket.leave(data);
    const users = [...rooms.get(data).get('users').values()]
    socket.to(data).emit('Set:Users', users)
    socket.emit('Leaving', true)
    io.emit('Send', toObject(rooms))
  }}
}
  )
 
  socket.on('Room:New_Message', async ({userName, roomId, text, time})=>{
    const obj = {
      userName,
      text,
      time
    }
    rooms.get(roomId).get('messages').push(obj)
    socket.to(roomId).emit('Room:Set_Message', obj)
    io.emit('Send', toObject(rooms))
    })
  socket.on('Room:join', (data)=>{
    socket.join(data.roomId)
    rooms.get(data.roomId).get('users').set(data.user.id, data.user)
    const users = [...rooms.get(data.roomId).get('users').values()]
    let room = toObject(rooms.get(data.roomId))
    room.roomId = data.roomId
    socket.emit('Set:Room', room)
    socket.to(data.roomId).emit('Set:Users', users)
    io.emit('Send', toObject(rooms))
    })
    socket.on('disconnect', ()=>{
      rooms.forEach((value, roomId)=>{
        if(value.get('users').delete(socket.id)){
          const users = [...value.get('users').values()]
          socket.to(roomId).emit('Set:Users', users)
        }
      })
    })
  socket.on('Get:rooms', ()=>{
    io.emit('Send', toObject(rooms))
  })
})
server.listen(url, ()=>{
  console.log(`connected to: ${url}`)
})
