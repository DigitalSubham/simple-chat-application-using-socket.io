# simple chat app

## break down the code of simple chat app

### index.js

```
const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
```

- Importing modules: Importing the required Node.js modules (http, express, path, and socket.io).

- Express setup: Creating an Express application (app).

- Server creation: Creating an HTTP server using the Express app.

- Socket.IO setup: Creating a Socket.IO server (io) and attaching it to the HTTP server.

```
app.use(express.static(path.resolve("./public")));
```

- Static file serving: Configuring Express to serve static files from the "public" directory.

```
io.on("connection", (socket) => {
socket.on("user-message", (message) => {
io.emit("message", message);
});
});
```

- Socket.IO event handling: Handling the "connection" event when a user connects. When a user sends a "user-message" event, the server broadcasts it to all connected clients with the "message" event.

```
app.get("/", (req, res) => {
return res.sendFile("./public/index.html");
});
```

- Express route: Handling a GET request to the root URL and sending the "index.html" file.

```
server.listen(3000, () => {
console.log("server started at port 3000");
});
```

- Server start: Making the server listen on port 3000 and logging a message when it starts.

### index.html

```

<script src="/socket.io/socket.io.js"></script>:

```

- This line includes the Socket.IO client library, allowing the client to communicate with the Socket.IO server.

```
const socket = io();
```

- Creates a Socket.IO client instance and establishes a connection to the server. This instance (socket) will be used to send and receive messages.

```
const sendBtn = document.getElementById("sendBtn"):
```

- Retrieves the HTML element with the id "sendBtn," which is assumed to be a button that users click to send messages.

```
const messageInput = document.getElementById("message"):
```

- Retrieves the HTML element with the id "message," assumed to be an input field where users can type their messages.

```
const allMessages = document.getElementById("messages"):
```

- Retrieves the HTML element with the id "messages," which is assumed to be a container where all the chat messages will be displayed.

```
socket.on("message", (message) => { ... }):
```

- Listens for the "message" event from the server. When a message is received, the provided callback function is executed.

- Inside the callback function:

- Creates a new list item (<li>) element.
- Sets the text content of the list item to the received message.
- Appends the list item to the container (allMessages) where all chat messages are displayed.
- Scrolls the window to the bottom to always show the latest message.

```
sendBtn.addEventListener('click', () => { ... }):
```

- Adds a click event listener to the "sendBtn" button.
- When the button is clicked, the provided callback function is executed.
- Inside the callback function:
- Retrieves the value of the message input field (messageInput).
- Emits a "user-message" event to the server with the user's message using socket.emit("user-message", message).
