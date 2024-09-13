// npm 패키지 매니저
// 패키지를 설치, 업데이트, 삭제 등 관리하는데 도움을 주는 프로그램

// pm2
// Node.js로 만든 프로세스를 관리하는 프로그램
// 프로그램을 감시하고 있다가 의도하지 않게 꺼지거나 소스가 변경될 때 자동으로 재 시동

// 설치 
// npm install pm2 -g

// 동작 오류
// windows powershell -> 관리자 모드로 실행
// Get-ExcutionPolicy -> restricted 확인
// set-executionpolicy remotesigned -> y 입력

// 실행
// pm2 start 파일명

// 중지
// pm2 stop 파일명

// 프로세스 감시
// pm2 monit 파일명

// 실행 (변경사항 있을 시 재시동 자동화)
// pm2 start 파일명 -watch

// 실행 로그 확인 (오류발생 등)
// pm2 log

