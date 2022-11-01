const ROOM_TYPE = {
    'small': 30,
    'medium': 50,
    'big': 80
};

const BUSINESS_HOURS = {
    '0':{
        'opens': 15,
        'closes': 22
    },
    '1':{
        'opens': 10,
        'closes': 00
    },
    '2':{
        'opens': 12,
        'closes': 00
    },
    '3':{
        'opens': 17,
        'closes': 00
    },
    '4':{
        'opens': 10,
        'closes': 22
    },
    '5':{
        'opens': 10,
        'closes': 02
    },
    '6':{
        'opens': 13,
        'closes': 01
    }
};

const SESSIONS_HOURS = [':20', ':50'];

class Room {
    seats = [];

    constructor(hour, tam) {
        this.hour = hour;
        this.createSeats(tam);
        this.fillSeats(tam);
    }

    createSeats(tam) {
        for(let i=0; i<tam; i++)
            this.seats.push('⠀');
    }

    fillSeats(tam) {
        for(let i=0; i<tam; i++) {
            if(Math.random() > 0.5)
                this.seats[i] = 'x';
        }
    }
}

function createSessions(weekday) {
    let rating = document.querySelector('.anime-rating').innerHTML;
    let sessions = [];
    let room_sessions = [];
    let max_sessions = 4;

    if(rating > 65)
        max_sessions = 6;

    console.log(weekday);
    
    for(let i=0; i<max_sessions; i++)
        sessions.push(getRandomInt(BUSINESS_HOURS[weekday]['opens'], BUSINESS_HOURS[weekday]['closes']));
    sessions = sessions.sort();

    for(let h=0; h<max_sessions; h++) {
        room_sessions.push(new Room(sessions[h]+SESSIONS_HOURS[h%2], ROOM_TYPE.medium));
    }

    console.log(room_sessions);
    return room_sessions;
}

function createTicketContent() {
    let content = document.querySelector('.ticket-content');
    menu = createElementHTML('div', 'days-menu');
    menu.classList.add('bd-btn-group');
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();

    let day_0 = createElementHTML('a', 'bd-btn', day + '/' + (month + 1));
    day_0.classList.add('bd-btn-outline');
    day_0.setAttribute('href', '#day0');
    menu.appendChild(day_0);
    for(let i=1; i<7; i++) {
        day++;
        if(day>DAYS_MONTH[month]) {
            day = 1;
            month++;
            if(month>11)
                month=0;
        }
        let next_day = createElementHTML('a', 'bd-btn', day + '/' + (month + 1));
        next_day.classList.add('bd-btn-outline');
        next_day.setAttribute('href', `#day${i}`);
        menu.appendChild(next_day);
    }
    content.appendChild(menu);

    let hours = [];
    for(let d=0; d<7; d++) {
        let sessions = createSessions(date.getDay());
        hours.push(sessions);
        let day = createElementHTML('div', 'sessions');
        day.setAttribute('id', `day${d}`);
        for(let s in sessions) {
            let session = createElementHTML('a', 'bd-btn', sessions[s].hour)
            session.classList.add('bd-btn-standard');
            session.setAttribute('href', `#room${d}-${s}`);
            day.appendChild(session)
        }
        content.appendChild(day);
    }

    for(let d=0; d<7; d++) {
        let sessions = hours[d];
        for(let session in sessions) {
            let seats = sessions[session]['seats'];
            let room = createElementHTML('button', 'rooms');
            room.setAttribute('id', `room${d}-${session}`);
            for(let s in seats) {
                let seat = createElementHTML('button', 'bd-btn', seats[s]);
                seat.classList.add('bd-btn-outline');
                room.appendChild(seat);
            }
            content.appendChild(room);
        }
    }
}