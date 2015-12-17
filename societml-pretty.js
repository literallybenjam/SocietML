/* jshint browser:true */
/* SocietML by @literallybenjam */
(function(){
    "use strict";
    var a=document.documentElement,
        C,
        c,
        d,
        i,
        F=function(){
            /* jshint validthis:true */
            var C = this,
                c,
                E,
                e,
                I,
                i,
                n,
                p,
                R,
                r;
            if(!C)return;
            C.M=new MutationObserver(function(){
                /* jshint validthis:true */
                if(M instanceof Array&&this)M.forEach(function(m){
                },this);
            });
            C.m=new MutationObserver(function(){
                /* jshint validthis:true */
                if(M instanceof Array&&this)M.forEach(function(m){
                },this);
            });
            C.M.I=C.m.I=C.I=I={};
            C.D.body.textContent="";
            if(C.r.hasAttribute("data-societml-img")){
                E=C.D.createElement("a");
                E.className="societml-fb_img_anchor";
                if(C.r.hasAttribute("data-societml-namesrc"))E.href=C.r.getAttribute("data-societml-namesrc");
                e=C.D.createElement("div");
                e.className="societml-fb_img";
                e.style.backgroundImage='url("'+C.r.getAttribute("data-societml-img").trim()+'")';
                C.D.body.appendChild(E).appendChild(e);
            }
            E=C.D.createElement("p");
            E.className="societml-fb_heading";
            e=C.D.createElement("a");
            e.className="societml-fb_name";
            if(C.r.hasAttribute("data-societml-namesrc"))e.href=C.r.getAttribute("data-societml-namesrc");
            if(C.r.hasAttribute("data-societml-name"))e.textContent=C.r.getAttribute("data-societml-name");
            else e.textContent="A Friend";
            E.appendChild(e);
            if(C.r.hasAttribute("data-societml-via")){
                E.appendChild(C.D.createTextNode(" via "));
                e=C.D.createElement("a");
                e.className="societml-fb_name";
                if(C.r.hasAttribute("data-societml-viasrc"))e.href=C.r.getAttribute("data-societml-viasrc");
                e.textContent=C.r.getAttribute("data-societml-via");
                E.appendChild(e);
            }
            C.D.body.appendChild(E);
            if(C.r.hasAttribute("data-societml-datetime")){
                E=C.D.createElement("time");
                E.className = "societml-fb_datetime";
                E.dateTime = C.r.getAttribute("data-societml-datetime");
                E.title = C.r.getAttribute("data-societml-datetime");
                E.textContent = C.r.getAttribute("data-societml-datetime");
                C.D.body.appendChild(E);
            }
            c=C.D.createElement("div");
            c.className="societml-fb_content";
            E=C.D.createElement("p");
            E.className="societml-fb_paragraph";
            for(i=0;i<C.r.childNodes.length;i++){
                n=C.r.childNodes.item(i);
                if(n.nodeName!=="#text"&&n.nodeName.toLowerCase()!=="a"&&n.nodeName.toLowerCase()!=="img")continue;
                if(n.nodeName==="#text"){
                    R=/\s*(?:\r?\n?[^\r\n]*\S[^\r\n]*)+\s*/g;
                    while((r=R.exec(n.textContent))){
                        if(r.index){
                            c.appendChild(E);
                            E=C.D.createElement("p");
                            E.className="societml-fb_paragraph";
                        }
                        E.appendChild(C.D.createTextNode(r[0].replace(/^\s+/g," ").replace(/\s+$/g," ")));
                    }
                }
                else if(!p&&n.nodeName.toLowerCase()==="a"&&(n.hasAttribute("data-societml-img")||n.hasAttribute("data-societml-title"))){
                    if(E.childNodes.length)c.appendChild(E);
                    p=C.D.createElement("a");
                    p.className="societml-fb_preview";
                    p.href=n.href;
                    if(n.hasAttribute("data-societml-img")){
                        E=C.D.createElement("div");
                        E.className="societml-fb_preview_img";
                        E.style.backgroundImage='url("'+n.getAttribute("data-societml-img").trim()+'")';
                        p.appendChild(E);
                    }
                    if(n.hasAttribute("data-societml-title")){
                        E=C.D.createElement("div");
                        E.className="societml-fb_preview_content";
                        e=C.D.createElement("h1");
                        e.className="societml-fb_preview_title";
                        e.textContent=n.getAttribute("data-societml-title");
                        E.appendChild(e);
                        if(n.textContent.trim()){
                            e=C.D.createElement("p");
                            e.className="societml-fb_preview_text";
                            e.textContent=n.textContent.trim();
                            E.appendChild(e);
                        }
                        e=C.D.createElement("span");
                        e.className="societml-fb_preview_info";
                        e.textContent=p.hostname;
                        if(n.getAttribute("data-societml-author").trim())e.appendChild(C.D.createTextNode("\u00a0\u00a0|\u00a0\u00a0by "+n.getAttribute("data-societml-author").trim()));
                        E.appendChild(e);
                        p.appendChild(E);
                    }
                    E=C.D.createElement("p");
                    E.className="societml-fb_paragraph";
                }
                else E.appendChild(C.D.importNode(n,true));
            }
            if(E.childNodes.length)c.appendChild(E);
            C.D.body.appendChild(c);
            if(p)C.D.body.appendChild(p);
            C.D.head.appendChild(C.D.createElement("style")).innerHTML='html{margin:0 auto;padding:10px;max-width:512px;background:#E9EAED;}body{margin:0;border-width:1px;border-style:solid;border-color:#E5E6E9 #DFE0E4 #D0D1D5;border-radius:3px;padding:12px;min-height:40px;color:#141823;background:#FFFFFF;font-family:Helvetica,Arial,sans-serif;line-height:1.34;font-size:12px;word-wrap:break-word;}.societml-fb_img_anchor{display:block;float:left;margin:0 8px 0 0;}.societml-fb_img{margin:0;padding:0;width:40px;height:40px;background-position:center;background-size:cover;background-repeat:no-repeat;}.societml-fb_heading{margin:1.175px 0 0;padding:0;font-size:14px;margin-bottom:2px;padding-right:22px;color:#9197A3;}.societml-fb_name{font-weight:bold;}a{color:#3B5998;text-decoration:none;cursor:pointer;}a:hover{text-decoration:underline;}.societml-fb_datetime{color:#9197A3;}.societml-fb_content{clear:both;margin:11px 0 0;border:none;padding:none;}.societml-fb_paragraph{margin:6px 0;padding:0;font-size:14px;white-space:pre-line;}.societml-fb_paragraph:first-child{margin-top:0px;}.societml-fb_paragraph:last-child{margin-bottom:0px;}.societml-fb_preview{display:block;margin:10px 0 0;color:inherit;background:#FFFFFF;box-shadow:0px 0px 0px 1px rgba(0,0,0,0.15) inset,0px 1px 4px rgba(0,0,0,0.1);}.societml-fb_preview:hover{box-shadow:0px 0px 0px 1px rgba(0,0,0,0.15) inset,0px 1px 6px rgba(0,0,0,0.15);text-decoration:none;}.societml-fb_preview_content{display:block;margin:0;padding:10px 12px;max-height:100px;}.societml-fb_preview_title{margin:0 0 5px;padding:0;font-family:Georgia,Lucida Grande,Tahoma,Verdana,Arial,sans-serif;font-size: 18px;font-weight:500;line-height:22px;}.societml-fb_preview_text{margin:0;padding:0;font-size:12px;line-height:16px;}.societml-fb_preview_info{display:block;margin:0;padding:9px 0 0;color:#9197A3;font-size:11px;line-height:11px;text-transform:uppercase;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.societml-fb_preview_img{display:block;margin:-.5px;padding:0;width:487px;height:244px;background-position:center;background-size:cover;background-repeat:no-repeat;}';
            C.r.setAttribute("hidden","");
            C.c.style.display="block";
            C.c.style.height=C.d.scrollHeight+"px";
        },
        M=function(){
            /* jshint validthis:true */
            var C=this,
                a=true,
                E,
                I,
                i,
                j,
                m,
                n,
                P,
                p;
            if(!C)return;
            C.M=new MutationObserver(function(){
                /* jshint validthis:true */
                if(M instanceof Array&&this)M.forEach(function(m){
                },this);
            });
            C.m=new MutationObserver(function(){
                /* jshint validthis:true */
                if(M instanceof Array&&this)M.forEach(function(m){
                },this);
            });
            C.M.I=C.m.I=C.I=I={n:[],t:[],b:[]};
            C.D.body.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="currentColor" stroke="none"><defs><path id="societml-msg_left_arrow" d="M 1 0 L 0 1 L 1 2 Z"/><path id="societml-msg_right_arrow" d="M 0 0 L 1 1 L 0 2 Z"/></defs></svg>';
            for(i=0;i<C.r.children.length;i++){
                n=C.r.children.item(i);
                if(n.tagName.toLowerCase()!=="p")continue;
                C.D.body.appendChild(E=C.D.createElement("p"));
                p=E;
                while(p&&(p=p.previousElementSibling)){
                    if(p.tagName.toLowerCase()==="p")break;
                }
                j=n.hasAttribute("data-societml-name")?I.n.indexOf(n.getAttribute("data-societml-name")):I.n.indexOf(p?p.getAttribute("data-societml-name"):undefined);
                if(j===-1){
                    j=I.n.length;
                    I.n.push(n.getAttribute("data-societml-name"));
                    I.t.push(n.getAttribute("data-societml-text"));
                    I.b.push(n.getAttribute("data-societml-bg"));
                }
                E.setAttribute("data-societml-name",I.n[j]);
                m=n.textContent.trim().substr(0,4)==="/me "?true:false;
                if(!p||I.n[j]!==p.getAttribute("data-societml-name")||m){
                    if(p&&p.classList.contains("societml-msg"))p.innerHTML+=a?'<svg class="societml-arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="'+I.b[I.n.indexOf(p.getAttribute("data-societml-name"))]+'" stroke="none"><use xlink:href="#societml-msg_right_arrow"></svg>':'<svg class="societml-arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="'+I.b[I.n.indexOf(p.getAttribute("data-societml-name"))]+'" stroke="none"><use xlink:href="#societml-msg_left_arrow"></svg>';
                    if(p&&I.n[j]!==p.getAttribute("data-societml-name"))a=!a;
                    if(!m){
                        E.className="societml-intro";
                        E.setAttribute("data-societml-name",I.n[j]);
                        if(I.n[j]!==P)E.textContent=I.n[j];
                        if(a)E.classList.add("societml-rt");
                        else E.classList.add("societml-lf");
                        C.D.body.appendChild(E=C.D.createElement("p"));
                    }
                    if(p&&I.n[j]!==p.getAttribute("data-societml-name"))P=p.getAttribute("data-societml-name");
                }
                if(m){
                    E.className="societml-me";
                    E.title=I.n[j];
                    if(n.hasAttribute("data-societml-datetime"))E.title+=" @ "+n.getAttribute("data-societml-datetime");
                    E.appendChild(C.D.createElement("b")).textContent=I.n[j];
                    E.appendChild(C.D.createTextNode(n.textContent.trim().substr(3)));
                }
                else{
                    E.className="societml-msg";
                    E.title=I.n[j];
                    if(n.hasAttribute("data-societml-datetime"))E.title+=" @ "+n.getAttribute("data-societml-datetime");
                    E.style.color=I.t[j];
                    E.style.background=I.b[j];
                    E.setAttribute("data-societml-name",I.n[j]);
                    if(a)E.classList.add("societml-rt");
                    else E.classList.add("societml-lf");
                    E.textContent=n.textContent;
                }
            }
            if(C.D.body.lastElementChild&&C.D.body.lastElementChild.classList.contains("societml-msg"))C.D.body.lastElementChild.innerHTML+=a?'<svg class="societml-arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="'+I.b[I.n.indexOf(C.D.body.lastElementChild.getAttribute("data-societml-name"))]+'" stroke="none"><use xlink:href="#societml-msg_right_arrow"></svg>':'<svg class="societml-arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="'+I.b[I.n.indexOf(C.D.body.lastElementChild.getAttribute("data-societml-name"))]+'" stroke="none"><use xlink:href="#societml-msg_left_arrow"></svg>';
            C.D.head.appendChild(C.D.createElement("style")).innerHTML='html{margin:0;padding:0;background:white;font-size:15px;line-height:18px;font-family:Helvetica Neue,Helvetica,sans-serif;font-weight:300;letter-spacing:.03125em;}body{margin:0;padding:15px;}body>svg{display:none;}.societml-me{position:relative;margin:6px auto;padding:0;max-width:475px;font-style:italic;color:#636363;text-align:center;}.societml-msg{position:relative;margin:3px 0;padding:6px;border-radius:3px;max-width:463px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;}.societml-msg.societml-lf{margin:3px auto 3px 6px;}.societml-msg.societml-rt{margin:3px 6px 3px auto;}.societml-arrow{position:absolute;top:0;width:6px;height:100%;}.societml-msg.societml-lf .societml-arrow{left:-6px;}.societml-msg.societml-rt .societml-arrow{right:-6px;}.societml-intro{margin:6px 6px 0;padding:0 6px;max-width:463px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;color:#636363;font-size:9px;font-weight:bold;letter-spacing:.125em;line-height:12px;}.societml-intro.societml-lf{margin:6px auto 0 6px;text-align:left;}.societml-intro.societml-rt{margin:6px 6px 0 auto;text-align:right;}';
            C.r.setAttribute("hidden","");
            C.c.style.display="block";
            C.c.style.height=C.d.scrollHeight+"px";
        },
        R=a.querySelectorAll("*[data-societml-type]"),
        r;
    for(i=0;i<R.length;i++){
        r=R.item(i);
        c=document.createElement("iframe");
        c.id=i<10?"societml-frame_0"+i:"societml-frame_"+i;
        c.setAttribute("style","display:none;border:none;border-radius:3px;padding:0;width:100%;max-width:768px;min-width:320px;max-height:568px;height:1px;");
        r.parentElement.insertBefore(c,r);
        C=c.contentWindow;
        C.c=c;
        C.r=r;
        C.document.open();
        C.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><base target="_blank"></head><body></body></html>');
        C.document.close();
        C.D=C.document;
        C.d=C.D.documentElement;
        C.i={fb:F,msg:M}[r.getAttribute("data-societml-type").toLowerCase()];
        if(C.i)C.i();
    }
})();
