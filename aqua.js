       var firebaseConfig = {
             apiKey: "AIzaSyC_Wl1RgIWazRk3OhodD5QQTykOcIyZMNs",
    authDomain: "aquacheckin-e0b0b.firebaseapp.com",
    projectId: "aquacheckin-e0b0b",
    storageBucket: "aquacheckin-e0b0b.appspot.com",
    messagingSenderId: "606092531450",
    appId: "1:606092531450:web:0cb5aa1499296eae14db43",
    measurementId: "G-T2LP2MT4DG"
      };

      firebase.initializeApp(firebaseConfig);
      var mobile = '';
      var ipad = '';
      document.getElementById('reset').style.visibility = 'hidden';
      var viewport_meta = document.getElementById('viewport-meta');
      var get_qr_code = function(){
        var fname = document.getElementById("fname");
        console.log(fname.value.trim());
        var lname = document.getElementById("lname");
         console.log(lname.value.trim());
        var email = document.getElementById("email");
         console.log(email.value.trim());
         var cname = document.getElementById("cname");
         console.log(cname.value.trim());
          var message = document.getElementById("message");
         console.log(message.value.trim());
          var date = document.getElementById("date");
         var data = {
          "key": fname.value + lname.value + date.value + '&fname=' + fname.value.trim() + '&lname=' + lname.value.trim() + '&email=' + email.value.trim() + '&company=' +  cname.value.trim() + '&message=' + message.value.trim() + '&date=' + date.value + '&checkin=walkin',
          "fname": fname.value,
          "lname": lname.value,
           "mobile": mobile,
           "ipad": ipad
         }
        if (fname.value != null &&  fname.value != '' && lname.value != null &&  lname.value != '' && date.value != null &&  date.value != '' && cname.value != null &&  cname.value != '' && message.value != null &&  message.value != '' && email.value != null &&  email.value != '') {
     createqrcode(data);
} else {
    alert("All fields required!")
}
        }
  function download(){
    document.getElementById("downloader").download = "download.png";
    document.getElementById("downloader").href = document.getElementById("qrcode").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}
      
      const currentDateTime = () => {
  var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOString = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);

  // convert to YYYY-MM-DDTHH:MM
  const datetimeInputString = localISOString.substring(
    0,
    ((localISOString.indexOf("T") | 0) + 6) | 0
  );
  console.log(datetimeInputString);
  return datetimeInputString;
};
     
     var createqrcode = function(data){
       console.log("mobile:" + mobile);
       console.log("ipad:" + ipad);
        var key = data["key"];
         if (ipad === 'Yes'){
         document.getElementById('note').innerHTML= "Thank you, " + data["fname"] + " " + data["lname"] + "<br><br><b>Mobile Phone Users:</b><br>Scan below QR Code to iPad app to check-in";
        //document.getElementById('createrecord').innerHTML= "<a href='" + "https://aquavisitorsystem.github.io/?key=" + key + "'>Click Here To Complete Check-In</a>";
       }else{
                document.getElementById('note').innerHTML= "Thank you, " + data["fname"] + " " + data["lname"] + "<br>Upon arrival at Aqua-Aerobic Systems, Inc.<br>Please Scan Below QR Code<br>via the iPad stand in our lobby<br><br><b>take screenshot to speed up check-in process!</b>";
       }
       
         var qrcode = new QRious({
  element: document.getElementById("qrcode"),
  background: '#ffffff',
  backgroundAlpha: 1,
  foreground: '#5868bf',
  foregroundAlpha: 1,
  level: 'L',
  padding: 0,
  size: 300,
  value: key
});

       document.getElementById("myViewport").setAttribute("content", "initial-scale=1.0, width=device-width, user-scalable=yes, minimum-scale=1.0, maximum-scale=1.0");
        document.getElementById('qr').style.display = 'contents';
        document.getElementById('qr').setAttribute("align", "center");
       document.getElementById('container').style.visibility = 'hidden';
        //document.getElementById('header').style.display = 'none';
         document.getElementById('container').style.display = 'none';
       document.getElementById('lname').style.visibility = 'hidden';
       document.getElementById('date').style.visibility = 'hidden';
         document.getElementById('reset').style.visibility = 'hidden';
         //document.getElementById('header').style.visibility = 'hidden';
       document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
      }
     
          var createqrcodeipad = function(data){
        var db = firebase.firestore();
       varFName = "";
       varLName = "";
       console.log("mobile:" + mobile);
       console.log("ipad:" + ipad);
        varweb =  data["key"] + "&checkin=Now";
        varkey = data["key"];
       console.log(varkey);
        db.collection("messages").where("key", "==",varkey)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
           // console.log(doc.id, " => ", doc.data());
            varFName = doc.data().firstname;
            varLName = doc.data().lastname;
           console.log(varFName);
           console.log(varLName);
     
                document.getElementById('note').innerHTML= "Thank you, " + varFName + " " + varLName + "<br>Upon arrival at Aqua-Aerobic Systems, Inc.<br>Please Scan Below QR Code<br>via the iPad stand in our lobby<br><br><b>take screenshot to speed up check-in process!</b>";
   
    }); 

    })
    .catch((error) => {
       console.log("Error getting documents: ", error);
           alert("Error getting documents: ", error);
    });
         
       
         var qrcode = new QRious({
  element: document.getElementById("qrcode"),
  background: '#ffffff',
  backgroundAlpha: 1,
  foreground: '#5868bf',
  foregroundAlpha: 1,
  level: 'L',
  padding: 00,
  size: 300,
  value: varweb
});

       document.getElementById("myViewport").setAttribute("content", "initial-scale=1.0, width=device-width, user-scalable=yes, minimum-scale=1.0, maximum-scale=1.0");
        document.getElementById('qr').style.display = 'contents';
        document.getElementById('qr').setAttribute("align", "center");
       document.getElementById('container').style.visibility = 'hidden';
       // document.getElementById('header').style.display = 'none';
         document.getElementById('container').style.display = 'none';
       document.getElementById('lname').style.visibility = 'hidden';
       document.getElementById('date').style.visibility = 'hidden';
         document.getElementById('reset').style.visibility = 'hidden';
         //document.getElementById('header').style.visibility = 'hidden';
       document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
      }
     
      var loadweb = function(){
      window.location.href = window.location.pathname;
       }
      document.getElementById("get_qr_code").addEventListener("click", get_qr_code);
   document.getElementById("reset").addEventListener("click", loadweb);
      document.getElementById('date').value = currentDateTime();

      
        var queryString = window.location.search;
      console.log(queryString);
      var urlParams = new URLSearchParams(queryString);
      
      var keyid = urlParams.get('key')
      console.log(keyid);
      
      var gmobile = urlParams.get('mobile')
      console.log(mobile);
      
      var gipad = urlParams.get('ipad')
      console.log(ipad);
      
      var gnew='Yes';
// mobile string
if (gmobile != null && gmobile != '') {
   gnew='';
  console.log('string is NOT empty');
        mobile="Yes";
        window.location = "https://aquameeting.github.io/";
} else {
  console.log('string IS empty');
}
      
// keyid string
if (gipad != null && gipad != '') {
  gnew='';
  console.log('string is NOT empty');
   ipad="Yes";
} else {
  console.log('string IS empty');
}
     
// keyid string
if (keyid != null && keyid != '') {
   gnew='';
  console.log('string is NOT empty');
  var data = {
          "key": keyid 
        }
        key_id="";
        createqrcodeipad(data);
} else {
  console.log('string IS empty');
}
