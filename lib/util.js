module.exports = {
    // 사용자의 로그인 상태와 정보를 확인하는 함수
    authIsOwner: (req, res)=>{
        var name    = 'Guest';  // 기본 이름
        var login   = false;    // 기본 로그인 상태
        var cls     = 'NON';    // 기본 사용자 클래스

        // 로그인된 경우 세션에서 사용자 정보 가져오기
        if(req.session.is_logined){ 
            name = req.session.name;
            login = true;
            cls = req.session.cls ;
        }

        // 사용자 정보 객체로 변환
        return {name, login, cls};
    },

    // 사용자 클래스에 따라 메뉴 HTML을 반환하는 함수
    getMenuByClass: (cls) => {
        var menu = ''; // 기본 메뉴

        // 사용자 클래스가 고객(Customer)인 경우
        if (cls === 'CST') {
            // Purchase List와 Cart 메뉴
            menu = 
            `
            <li>
               <a href="#">
                  <i class='bx bx-purchase-tag-alt' ></i>
                  <span class="link_name">Purchase List</span>
               </a>
               <ul class="sub-menu blank" >
                  <li><a class="link_name" href="#">Purchase List</a></li>
               </ul>
            </li>

            <li>
               <a href="#">
                  <i class='bx bx-cart'></i>
                  <span class="link_name">Cart</span>
               </a>
               <ul class="sub-menu blank" >
                  <li><a class="link_name" href="#">Cart</a></li>
               </ul>
            </li>
            `;
        } else if (cls === 'MNG') { // 사용자 클래스가 관리자(Manager)인 경우
            // DB Admin 메뉴
            menu = 
            `
            <li>
               <div class="icon-link">
                  <a href="#">
                     <i class='bx bx-data'></i>
                     <span class="link_name">DB Admin</span>
                  </a>
                  <i class='bx bxs-chevron-down arrow' ></i>
               </div>
               <ul class="sub-menu">
                  <li><a class = "link_name" href="#" >DB Admin</a></li>
                  <li><a href="#">Table Create</a></li>
                  <li><a href="#"> code CRUD </a></li>
                  <li><a href="#" >product CRUD</a></li>
               </ul>
            </li>
            `;
        } else if (cls === 'CEO') { // 사용자 클래스가 경영진(CEO)인 경우
            // Analytic 메뉴
            menu = 
            `
            <li>
               <a href="#">
                  <i class='bx bx-pie-chart-alt-2'></i>
                  <span class="link_name">Analytic</span>
               </a>
               <ul class="sub-menu blank">
                  <li><a class = "link_name" href="#" >Analytic</a></li>
               </ul>
            </li>
            `;
        } else { // 사용자 클래스가 없는 경우 (메뉴 x)
            menu = 
            ``;
        }

        return menu;
    },

    //
    dateOfEightDigit: ()=>{
        var today = new Date();
        var year = String(today.getFullYear());
        var month ;
        var day ;
        var hour;
        var minute;
        var second;
        if (today.getMonth() < 9)
            month = "0" + String(today.getMonth()+1);
        else
            month = String(today.getMonth()+1);

        if (today.getDate() < 10)
            day = "0" + String(today.getDate());
        else
            day = String(today.getDate());

        hour = String(today.getHours());
        minute = String(today.getMinutes());
        second = String(today.getSeconds());


        return year +"." + month + "." + day + " : " + hour + "시 " + minute + "분 " + second + "초";
}
}
