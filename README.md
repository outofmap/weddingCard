# weddingCard
Node.js, Express, Mysql, Ejs를 활용한 모바일 청첩장 (1인 프로젝트)  
[모바일 청첩장 보기](dearhere.com)     
##### Project duration : 1개월     
##### Language : JavaScript, HTML, CSS    
##### Database : Mysql    
##### Framework and Library : Express, jQuery, bcryptjs, ResponsiveSlides.js(UI), Materialize(UI)

#### Description
PC와 모바일에 대응한 반응형 UI의 청첩장. 커플의 주요 이벤트를 타임라인/스탬프 형식으로 표현, 축하 방명록, 사진을 사용자가 업로드 할 수 있음, 다음지도 API 활용 결혼식 장소 표현.  

#### 프로젝트에서 맡은 일
Nodejs와 Express를 활용한 백엔드 API, 방명록, 다음지도 API활용 장소안내, 반응형 UI테마에서 불필요한 기능 제거/Customizing, 이미지 슬라이드 기능 구현, Linux Ubuntu 서버세팅, 서비스 배포 및 도메인 연결.

#### 사용자 요구사항
* 모바일 대응
* Single Page Application
* 타임라인 기능 
* 축하 방명록 작성
* 결혼식 장소 지도로 표시 

#### Lessons 
##### 배우고 성장한 점
* 첫 1인 프로젝트에 도전해 실제 배포까지 성공!       
혼자하더라도 일정과 task관리를 하기 위해서 Github 이슈기능과 마일스톤 기능 활용.    
구현 중 트러블 슈팅, 프로젝트 기한 내 구현과 실제 배포를 혼자 책임지면서 책임감과 독립심이 증가.  

* Java,Spring과 대조되는 Nodejs만의 장점을 느낌     
Java와 Spring프레임워크로만 웹서버를 구현하다가, Nodejs와 Express를 활용해 구현해보니 생산성 측면에서 확실한 장점을 갖고 있다고 느낌.   
작성해야할 백엔드 소스코드가 100여 줄인 것은 java와 확연히 비교되는 양이었음.    
프론트엔드를 구현하는데만 JavaScript를 사용하다가, JavaScript로 서버를 만들면서 오히려 JavaScript언어에 대한 애정도가 상승. 

* Nodejs의 장점이기도 한 npm 활용     
npm(Node Packaged Modules)인 bcriptjs와 forever를 사용해 비밀번호 암호화, 서버 배포를 해결.         
npm으로 패키지를 활용하는데 친숙해졌고, 적절한 패키지를 활용하여 서비스를 더 쉽고 빠르게 만들 수 있다는 것을 배움.          
passport와 bcryptjs를 비교하면서 로그인이 필요하지 않으므로 비밀번호 암호화만 제공하는 bcryptjs를 채택하는 결정을 하면서 상황에 맞는 라이브러리를 찾는 경험을 함.    

* 지도 api 활용       
다음지도 api를 적용하면서, 처음으로 개발자로서 기존의 api를 활용한 경험을 통해 외부 api사용이 어려울 것이라고 생각했던  심리적 장벽을 극복함.       
다음지도의 경우 api 가이드 문서가 잘 되어있어서, 수월하게 적용할 수 있었음.    

##### 아쉬운 점
* UI테마를 처음 사용하다보니 개발기간 예측실패     
UI테마의 마크업이 완성된 상태로 시작하기 때문에, 서버측 코드를 작성하는데 대부분의 시간을 보낼 것으로 예상.    
그러나,완성된 UI에서 사용하지 않는 부분을 제거하고 요구사항에 맞게 변경하는 작업의 양이 많았고 예상했던 것보다 프론트엔드 작업에 쓰는 시간이 늘어났음. 따라서 개발기간이 처음 예측했던 것보다는 일주일정도 더 필요했음.     

* responsive UI 테마의 side effect     
일생에서 중요한 이벤트인 결혼식인 만큼 디자인 퀄리티를 높이고 싶어서 잘 만들어진 반응형UI테마를 선정해 사용.       
과도하게 많은 기능을 없애고,새롭게 추가하는 부분이 생길 때마다 CSS나 JS에서 side effect가 발생하는데 문제를 해결하기 위해서 타인이 작성한 코드를 읽고 이해하는데 많은 시간이 필요했음.                
완성된 UI 테마를 사용한다고해서, 프론트엔드의 모든 문제가 해결되지 않으며 코드 수정이 필연적이라는 것을 느꼈음.            
향후 부트스트랩을 비롯한 UI 라이브러리를 사용한다면 이에 따른 단점과 customize 작업시간도 고려할 것임.        

* 한 커플만을 위한 청첩장         
이 프로젝트는 한 커플에게 선물해주기 위한 용도로 제작되어 재사용 혹은 확장성을 고려하지 않았음. 그래서 view에 담긴 내용은 축하메시지를 제외하고 DB에서 가져오지 않았음.          
그런데 완성된 후 청첩장을 받은 사람들의 반응이 좋아서 여러 번 사용하는 것을 고려하게 되었고, 처음에 일회성으로 사용할 것이라고 생각했던 것이 아쉬웠음.      
