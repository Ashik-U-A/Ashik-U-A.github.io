/**
 * Functions that affect the Pre-Loader phase of the page.
 */

function update_progress(progress) {
    document.querySelector("#progress-bar").style.width = progress + "%";
}

function change_preloader_text(text) {
    let para = document.querySelector(".pre-loader p");
    para.style.opacity = 0;
    setTimeout(()=>{
        para.innerHTML = text;
        para.style.opacity = 1;
    }, 400);
}

function close_preloader() {
    let pre_loader = document.querySelector(".pre-loader");
    pre_loader.style.opacity = 0;
    setTimeout(()=>{
        pre_loader.style.display = "none";
    }, 800);
}

/**
 * Functions that are the Core of the Page.
 */
function bootstrap_libraries() {
    fetch_lib("three.min.js", event => {
        update_progress((event.loaded / event.total) * 100);
    }).then(()=>{
        change_preloader_text("Pre-loader and Libraries tested. This site is under development");
        setTimeout(()=>{
            close_preloader();
        }, 800);
    });
}

function fetch_lib(library_name, progress_event_handler) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "libs/" + library_name);
        request.onreadystatechange = () => {
            if(request.readyState === 4) {
                if(request.status === 200) {
                    document.body.appendChild((()=>{
                        let library_script_tag = document.createElement("script");
                        library_script_tag.innerHTML = request.responseText;
                        return library_script_tag;
                    })());
                    resolve();
                }
                else {
                    reject();
                }
            }
        };
        request.onprogress = progress_event_handler;
        request.send();
    });
}