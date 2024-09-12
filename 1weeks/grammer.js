// 블록 스코프
if (true) { // block
    var x = 3;  // 함수 scope
}
console.log(x);

if(true) {  // const, let : block scope
    const y = 3;    // 상수 -> 변수의 값 변경 불가
}
console.log(y);

// 화살표 함수
function add1(x, y) {
    return x + y;
}

const add2 = (x, y) => {
    return x + y;
}

const add3 = (x, y) => x + y;

const add4 = (x, y) => (x + y);

function not1(x) {
    return !x;
}

const not1 = x => !x;

// 일반적인 코드
var candyMachine = {  // 객체 생성
    // 객체 속의 객체
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function() {
        this.status.count--;
        return this.status.count;
    },
};

var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;

console.log(count)
t = getCandy()
console.log(count)
console.log(t)

// 구조 분해 할당
var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function() {
        this.status.count--;
        return this.status.count;
    },
};

const {getCandy, status : {count}} = candyMachine;
console.log(count)
t = getCandy()
console.log(count)
console.log(t)

// this 오류 해결 -> bind 사용
var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function() {
        this.status.count--;
        return this.status.count;
    },
};

const {getCandy, status : {count}} = candyMachine;
getCandy1 = getCandy.bind(candyMachine)
console.log(count)
t = getCandy()
console.log(count)
console.log(t)