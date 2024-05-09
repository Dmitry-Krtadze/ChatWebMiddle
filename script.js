const socket = io({
    auth:{
        cookie: document.cookie
    }
})



const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const chatBody = document.getElementById('chat_body');

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value)
    {
        socket.emit('new_message', input.value);
        input.value = '';
    }
});

socket.on('all_messages', function(msgArray){
    msgArray.forEach(msg => {
        let item = document.createElement('div');
        item.classList.add('chat_body_item');
        item.textContent = msg.login + ': ' + msg.content;
        messages.appendChild(item);
    });
    chatBody.scrollTo(0, chatBody.scrollHeight);
});

socket.on('message', function(msg){
    let item = document.createElement('div');
    item.classList.add('chat_body_item');
    item.textContent = msg;
    messages.appendChild(item);
    chatBody.scrollTo(0, chatBody.scrollHeight);
});
function changeNickname(){
    let nickname = prompt('Choose your nickname');
    if(nickname){
        socket.emit('set_nickname', nickname);
    }
}
changeNickname();