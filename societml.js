/* jslint asi:true, browser:true */

var SocietML = {
    parse: undefined
};

SocietML.parse = function(e) {

    //  Making sure things are what we expect  //
    if (!e) e = document.documentElement;
    else if (e instanceof Document) e = e.documentElement;
    else if (!(e instanceof Element)) e = document.documentElement;
    if (!e.dataset) return;

    //  Variable setup  //
    var i;
    var elements = e.querySelectorAll("*[data-societml-type]");
    var this_element;
    var frame;
    var content;
    var data;

    //  Runs over every SocietML element  //
    for (i = 0; i < elements.length; i++) {

        //  Sets up the containing iframe  //
        this_element = elements.item(i);
        frame = document.createElement("iframe");
        if (i < 10) frame.id = frame.id = "societml-frame_0" + i;
        else frame.id = "societml-frame_" + i;
        frame.setAttribute("style", "display:none;margin:auto;border:none;border-radius:3px;padding:0;width:100%;max-width:768px;min-width:320px;max-height:568px;height:1px;");
        this_element.parentElement.insertBefore(frame, this_element);
        content = frame.contentWindow.document;
        content.open();
        content.write('<!DOCTYPE html><html><head><meta charset="utf-8"><base target="_blank"></head><body></body></html>');
        content.close();

        //  Runs code based on iframe type  //
        switch (this_element.dataset.societmlType.toLowerCase()) {

            case "fb":

                //  Sets up post data  //
                data = {i: 0, container: content.createElement("blockquote"), element: undefined, subelement: undefined, content: undefined, preview: undefined, regex: undefined, result: undefined};
                data.container.className = "societml-fb"

                //  Photo  //
                data.element = content.createElement("a");
                data.element.className= "societml-fb_img_anchor";
                if (this_element.dataset.societmlNamesrc) data.element.href = this_element.dataset.societmlNamesrc;
                data.subelement = content.createElement("div");
                data.subelement.className = "societml-fb_img";
                if (this_element.dataset.societmlImg) data.subelement.style.backgroundImage = 'url("' + this_element.dataset.societmlImg.trim() + '")';
                data.container.appendChild(data.element).appendChild(data.subelement);

                //  Heading  //
                data.element = content.createElement("p");
                data.element.className = "societml-fb_heading";
                data.subelement = content.createElement("a");
                data.subelement.className = "societml-fb_name";
                if (this_element.dataset.societmlNamesrc) data.subelement.href = this_element.childNodes.item(data.i).dataset.societmlNamesrc;
                if (this_element.dataset.societmlName) data.subelement.textContent = this_element.dataset.societmlName;
                else data.subelement.textContent = "A Friend";
                data.element.appendChild(data.subelement);
                if (this_element.dataset.societmlVia) {
                    data.element.appendChild(content.createTextNode(" via "));
                    data.subelement = content.createElement("a");
                    data.subelement.className = "societml-fb_name";
                    if (this_element.dataset.societmlViasrc) data.subelement.href = this_element.dataset.societmlViasrc;
                    data.subelement.textContent = this_element.dataset.societmlVia;
                    data.element.appendChild(data.subelement);
                }
                data.container.appendChild(data.element);

                //  Datetime  //

                if (this_element.dataset.societmlDatetime) {
                    data.element = content.createElement("time");
                    data.element.className = "societml-fb_datetime";
                    data.element.dateTime = this_element.dataset.societmlDatetime;
                    data.element.title = this_element.dataset.societmlDatetime;
                    data.element.textContent = this_element.dataset.societmlDatetime;
                    data.container.appendChild(data.element);
                }

                //  Setting up content  //
                data.content = content.createElement("div");
                data.content.className = "societml-fb_content";
                data.element = content.createElement("p");
                data.element.className = "societml-fb_paragraph";

                //  Loops over each node  //
                for (data.i = 0; data.i < this_element.childNodes.length; data.i++) {

                    //  Only `#text` or `<a>` descendants are allowed  //
                    if (this_element.childNodes.item(data.i).nodeName !== "#text" && this_element.childNodes.item(data.i).nodeName.toLowerCase() !== "a" && this_element.childNodes.item(data.i).nodeName.toLowerCase() !== "img") continue;

                    //  Text  //
                    if (this_element.childNodes.item(data.i).nodeName === "#text") {
                        data.regex = /\s*(?:\r?\n?[^\r\n]*\S[^\r\n]*)+\s*/g;
                        while ((data.result = data.regex.exec(this_element.childNodes.item(data.i).textContent))) {
                            if (data.result.index !== 0) {
                                data.content.appendChild(data.element);
                                data.element = content.createElement("p");
                                data.element.className = "societml-fb_paragraph";
                            }
                            data.element.appendChild(content.createTextNode(data.result[0].replace(/^\s+/g, " ").replace(/\s+$/g, " ")));
                        }
                    }

                    //  Preview  //
                    else if (!data.preview && this_element.childNodes.item(data.i).nodeName.toLowerCase() === "a" && this_element.childNodes.item(data.i).dataset && (this_element.childNodes.item(data.i).dataset.societmlImg || this_element.childNodes.item(data.i).dataset.societmlTitle)) {

                        //  Setting up  //
                        if (data.element.childNodes.length) data.content.appendChild(data.element);
                        data.preview = content.createElement("a");
                        data.preview.className = "societml-fb_preview";
                        data.preview.href = this_element.childNodes.item(data.i).href;

                        //  Image  //
                        if (this_element.childNodes.item(data.i).dataset.societmlImg) {
                            data.element = content.createElement("div");
                            data.element.className = "societml-fb_preview_img";
                            data.element.style.backgroundImage = 'url("' + this_element.childNodes.item(data.i).dataset.societmlImg.trim() + '")';
                            data.preview.appendChild(data.element);
                        }

                        //  Content  //
                        if (this_element.childNodes.item(data.i).dataset.societmlTitle) {

                            //  Setup  //
                            data.element = content.createElement("div");
                            data.element.className = "societml-fb_preview_content";

                            //  Title  //
                            data.subelement = content.createElement("h1");
                            data.subelement.className = "societml-fb_preview_title";
                            data.subelement.textContent = this_element.childNodes.item(data.i).dataset.societmlTitle;
                            data.element.appendChild(data.subelement);

                            //  Text  //
                            if (this_element.childNodes.item(data.i).textContent.trim()) {
                                data.subelement = content.createElement("p");
                                data.subelement.className = "societml-fb_preview_text";
                                data.subelement.textContent = this_element.childNodes.item(data.i).textContent.trim();
                                data.element.appendChild(data.subelement);
                            }

                            //  Info  //
                            data.subelement = content.createElement("span");
                            data.subelement.className = "societml-fb_preview_info";
                            data.subelement.textContent = data.preview.hostname;
                            if (this_element.childNodes.item(data.i).dataset.societmlAuthor) data.subelement.appendChild(content.createTextNode("\u00a0\u00a0|\u00a0\u00a0by " + this_element.childNodes.item(data.i).dataset.societmlAuthor.trim()));
                            data.element.appendChild(data.subelement);

                            //  Adding content  //
                            data.preview.appendChild(data.element);

                        }

                        //  Resetting data.subelement  //
                        data.element = content.createElement("p");
                        data.element.className = "societml-fb_paragraph";
                    }

                    else data.element.appendChild(content.importNode(this_element.childNodes.item(data.i), true));

                }

                //  Adding everything to the container  //
                if (data.element.childNodes.length) data.content.appendChild(data.element);
                data.container.appendChild(data.content);
                if (data.preview) data.container.appendChild(data.preview);

                //  Adds the container and styling info to the frame  //
                content.head.appendChild(content.createElement("style")).innerHTML = 'html{margin:0px;padding:10px;}body{margin:0 auto 0 0;padding:0;max-width:512px;background:#E9EAED;}.societml-fb{margin:0;border-width:1px;border-style:solid;border-color:#E5E6E9 #DFE0E4 #D0D1D5;border-radius:3px;padding:12px;min-height:40px;color:#141823;background:#FFFFFF;font-family:Helvetica,Arial,sans-serif;line-height:1.34;font-size:12px;word-wrap:break-word;}.societml-fb_img_anchor{display:block;float:left;margin:0 8px 0 0;}.societml-fb_img{margin:0;padding:0;width:40px;height:40px;background-position:center;background-size:cover;background-repeat:no-repeat;}.societml-fb_heading{margin:1.175px 0 0;padding:0;font-size:14px;margin-bottom:2px;padding-right:22px;color:#9197A3;}.societml-fb_name{font-weight:bold;}a{color:#3B5998;text-decoration:none;cursor:pointer;}a:hover{text-decoration:underline;}.societml-fb_datetime{color:#9197A3;}.societml-fb_content{clear:both;margin:11px 0 0;border:none;padding:none;}.societml-fb_paragraph{margin:6px 0;padding:0;font-size:14px;white-space:pre-line;}.societml-fb_paragraph:first-child{margin-top:0px;}.societml-fb_paragraph:last-child{margin-bottom:0px;}.societml-fb_preview{display:block;margin:10px 0 0;color:inherit;background:#FFFFFF;box-shadow:0px 0px 0px 1px rgba(0,0,0,0.15) inset,0px 1px 4px rgba(0,0,0,0.1);}.societml-fb_preview:hover{box-shadow:0px 0px 0px 1px rgba(0,0,0,0.15) inset,0px 1px 6px rgba(0,0,0,0.15);text-decoration:none;}.societml-fb_preview_content{display:block;margin:0;padding:10px 12px;max-height:100px;}.societml-fb_preview_title{margin:0 0 5px;padding:0;font-family:Georgia,Lucida Grande,Tahoma,Verdana,Arial,sans-serif;font-size: 18px;font-weight:500;line-height:22px;}.societml-fb_preview_text{margin:0;padding:0;font-size:12px;line-height:16px;}.societml-fb_preview_info{display:block;margin:0;padding:9px 0 0;color:#9197A3;font-size:11px;line-height:11px;text-transform:uppercase;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.societml-fb_preview_img{display:block;margin:-.5px;padding:0;width:487px;height:244px;background-position:center;background-size:cover;background-repeat:no-repeat;}';
                content.body.appendChild(data.container);

                break;

            case "msg":

                //  Creates arrows  //

                content.body.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="currentColor" stroke="none"><defs><path id="societml-msg_left_arrow" d="M 1 0 L 0 1 L 1 2 Z"/><path id="societml-msg_right_arrow" d="M 0 0 L 1 1 L 0 2 Z"/></defs></svg>';

                //  Sets up message data  //
                data = {n: 0, i: 0, j: 0, names: [], text: [], bg: [], align: true, current: undefined, previous: undefined, container: content.createElement("blockquote"), msg: undefined};

                //  Loops over each message  //
                for (data.i = 0; data.i < this_element.children.length; data.i++) {

                    //  Only <p> elements are supported in msg frames  //
                    if (this_element.children.item(data.i).tagName.toLowerCase() !== "p" || !this_element.children.item(data.i).dataset) continue;

                    //  Sets data.n and populates names, text, bg if necessary  //
                    if (this_element.children.item(data.i).dataset.societmlName) data.n = data.names.indexOf(this_element.children.item(data.i).dataset.societmlName);
                    else data.n = data.names.indexOf(data.previous);
                    if (data.n === -1) {
                        data.n = data.names.length;
                        data.names.push(this_element.children.item(data.i).dataset.societmlName);
                        data.text.push(this_element.children.item(data.i).dataset.societmlText);
                        data.bg.push(this_element.children.item(data.i).dataset.societmlBg);
                    }

                    //  Keeps track of the current and previous names; switch alignment  //
                    if (data.names[data.n] !== data.current) {
                        if (data.container.children.length) {
                            if (data.align) data.container.lastElementChild.innerHTML += '<svg class="societml-msg_arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="' + data.bg[data.names.indexOf(data.container.lastElementChild.dataset.societmlName)] + '" stroke="none"><use xlink:href="#societml-msg_right_arrow"></svg>';
                            else data.container.lastElementChild.innerHTML += '<svg class="societml-msg_arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="' + data.bg[data.names.indexOf(data.container.lastElementChild.dataset.societmlName)] + '" stroke="none"><use xlink:href="#societml-msg_left_arrow"></svg>';
                            data.msg = content.createElement("hr");
                            if (data.names[data.n] === data.previous) data.msg.className = "societml-msg_break_small";
                            else data.msg.className = "societml-msg_break";
                            data.container.appendChild(data.msg);
                        }
                        data.previous = data.current;
                        data.current = data.names[data.n];
                        data.align = !data.align;
                    }

                    //  Creates the message  //
                    data.msg = content.createElement("p");
                    data.msg.className = "societml-msg";
                    data.msg.title = data.names[data.n];
                    if (this_element.children.item(data.i).dataset.societmlDatetime) data.msg.title += " @ " + this_element.children.item(data.i).dataset.societmlDatetime;
                    data.msg.style.color = data.text[data.n];
                    data.msg.style.background = data.bg[data.n];
                    data.msg.dataset.societmlName = data.names[data.n];
                    if (data.align) data.msg.classList.add("societml-align_right");
                    else data.msg.classList.add("societml-align_left");

                    //  Fills the message with content  //
                    for (data.j = 0; data.j < this_element.children.item(data.i).childNodes.length; data.j++) {
                        data.msg.appendChild(content.importNode(this_element.children.item(data.i).childNodes.item(data.j), true));
                    }

                    //  Appends the message to the container  //
                    data.container.appendChild(data.msg);

                }

                //  Adds the arrow to the last message  //
                if (data.container.children.length) {
                    if (data.align) data.container.lastElementChild.innerHTML += '<svg class="societml-msg_arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="' + data.bg[data.names.indexOf(data.container.lastElementChild.dataset.societmlName)] + '" stroke="none"><use xlink:href="#societml-msg_right_arrow"></svg>';
                    else data.container.lastElementChild.innerHTML += '<svg class="societml-msg_arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="' + data.bg[data.names.indexOf(data.container.lastElementChild.dataset.societmlName)] + '" stroke="none"><use xlink:href="#societml-msg_left_arrow"></svg>';
                    data.container.appendChild(data.msg);
                }

                //  Adds the container and styling info to the frame  //
                content.head.appendChild(content.createElement("style")).innerHTML = 'html,body{margin:0;padding:0;font-size:15px;line-height:18px;font-family:Helvetica Neue,Helvetica,sans-serif;font-weight:300;letter-spacing:.03125em;}body>svg{display:none;}.societml-msg{position:relative;margin:3px 0;padding:6px;border-radius:3px;max-width:475px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;}.societml-msg.societml-align_left{margin:3px auto 3px 6px;}.societml-msg.societml-align_right{margin:3px 6px 3px auto;}.societml-msg_arrow{position:absolute;top:0;width:6px;height:100%;}.societml-msg.societml-align_left .societml-msg_arrow{left:-6px;}.societml-msg.societml-align_right .societml-msg_arrow{right:-6px;}.societml-msg_break,.societml-msg_break_small{margin:0;border:none;padding:0;height:0;background:transparent;}.societml-msg_break+.societml-msg,.societml-msg_break_small+.societml-msg,.societml-msg:first-child{margin-top:18px;}.societml-msg_break+.societml-msg::before,.societml-msg:first-child::before{position:absolute;top:-12px;left:6px;right:6px;color:#636363;font-size:9px;font-weight:bold;letter-spacing:.125em;line-height:12px;content:attr(data-societml-name);}.societml-msg_break+.societml-msg.societml-align_left::before,.societml-msg.societml-align_left:first-child::before{text-align:left;}.societml-msg_break+.societml-msg.societml-align_right::before,.societml-msg.societml-align_right:first-child::before{text-align:right;}';
                content.body.appendChild(data.container);

                break;

            default:
                continue;

        }

        //  Replaces the markup with the rendering  //
        this_element.parentElement.removeChild(this_element);
        frame.style.display = "block";
        frame.style.height = content.documentElement.scrollHeight + "px";

    }

    //  Returns the processed element  //
    return e;

}
